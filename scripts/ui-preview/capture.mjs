import { mkdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { apiBase, fixtureKey, startServer } from "./server.mjs";
import { outside, unchanged } from "./scenario.mjs";

export async function bounded(task, milliseconds, label) {
  let timer;
  try {
    return await Promise.race([
      task(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () =>
            reject(
              new Error(`${label} exceeded ${milliseconds / 1000} seconds.`),
            ),
          milliseconds,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export async function capture(info, input, options, roots) {
  const { chromium } = await import("playwright");
  const requested = path.resolve(options.output);
  const output = outside(
    path.join(
      await realpath(path.dirname(requested)),
      path.basename(requested),
    ),
    roots,
  );
  await mkdir(output); // Never overwrite an earlier run's evidence.
  const report = {
    label: "Fixture-backed visual rendering only; NOT live API compatibility",
    ...info,
    command: process.argv,
    scenarioFile: input.file,
    scenarioSha256: input.sha256,
    locale: "en-GB",
    timezone: "Asia/Singapore",
    results: [],
    status: "failed",
    observations:
      "Open representative images and record visual observations before attaching; generation alone is not visual acceptance.",
  };
  let browser, server, page;
  let interrupted = false;
  const shutdown = async () => {
    interrupted = true;
    try {
      if (browser) {
        await browser.close();
      }
    } catch (error) {
      report.cleanupError = error.message;
    }
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
  const deadline = setTimeout(shutdown, 300000);
  try {
    browser = await chromium.launch({
      ...(options.channel ? { channel: options.channel } : {}),
      timeout: 30000,
    });
    report.browser = browser.version();
    for (const scenario of input.scenarios) {
      await unchanged(input);
      server = await startServer(
        path.join(info.worktree, "out"),
        scenario.fixtures,
      );
      const variants = [
        { width: 1366, height: 900, theme: "light" },
        { width: 375, height: 812, theme: "light" },
      ];
      if (options.dark) {
        variants.push({ width: 640, height: 900, theme: "dark" });
      }
      for (const variant of variants) {
        if (interrupted) {
          throw new Error(
            "Capture interrupted or exceeded the five-minute deadline.",
          );
        }
        const result = {
          name: scenario.name,
          route: scenario.route,
          ...variant,
          blockedExternal: [],
          errors: [],
          requests: [],
          status: "failed",
        };
        report.results.push(result);
        const context = await browser.newContext({
          viewport: { width: variant.width, height: variant.height },
          colorScheme: variant.theme,
          locale: report.locale,
          timezoneId: report.timezone,
          reducedMotion: "reduce",
          serviceWorkers: "block",
        });
        await context.addInitScript(
          (theme) => localStorage.setItem("theme", theme),
          variant.theme,
        );
        await context.route("**/*", async (route) => {
          const request = route.request();
          const url = new URL(request.url());
          if (url.origin !== server.origin) {
            if (result.blockedExternal.length < 100) {
              result.blockedExternal.push(url.origin + url.pathname);
            }
            await route.abort();
          } else if (!["GET", "HEAD"].includes(request.method())) {
            result.errors.push(
              `Blocked mutation: ${request.method()} ${url.pathname}`,
            );
            await route.abort();
          } else {
            await route.continue();
          }
        });
        page = await context.newPage();
        page.setDefaultTimeout(15000);
        page.setDefaultNavigationTimeout(30000);
        page.on("pageerror", (error) => {
          if (result.errors.length < 100) {
            result.errors.push(error.message);
          }
        });
        result.consoleErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error" && result.consoleErrors.length < 100) {
            result.consoleErrors.push(message.text());
          }
        });
        const logStart = server.log.length;
        const responses = [];
        result.cancelledRequests = [];
        page.on("response", (response) => {
          const url = new URL(response.url());
          if (url.origin === server.origin && responses.length < 1000) {
            responses.push({
              path: url.pathname,
              query: url.search,
              status: response.status(),
            });
          }
        });
        page.on("requestfailed", (request) => {
          if (
            request.url().startsWith(`${server.origin}/`) &&
            result.errors.length < 100
          ) {
            const error = request.failure()?.errorText;
            // Navigating cancels in-flight prefetches (RSC and JS chunks).
            // Record browser cancellations, but still require rendered content,
            // loaded images/fonts and consumed fixtures for a successful capture.
            if (error === "net::ERR_ABORTED") {
              if (result.cancelledRequests.length < 100) {
                result.cancelledRequests.push(request.url());
              }
            } else {
              result.errors.push(
                `Local request failed: ${request.url()} ${error}`,
              );
            }
          }
        });
        await page.goto(`${server.origin}/sg-alerts${scenario.route}`, {
          waitUntil: "domcontentloaded",
        });
        await bounded(
          async () => {
            await scenario.ready(page);
            await page.waitForFunction(
              () =>
                document.fonts.status === "loaded" &&
                [...document.images].every(
                  (image) =>
                    image.complete &&
                    (image.naturalWidth > 0 || !image.getAttribute("src")),
                ),
            );
            for (const fixture of scenario.fixtures) {
              const response = responses.find(
                (item) =>
                  item.path.startsWith(`${apiBase}/`) &&
                  fixtureKey(item.path.slice(apiBase.length) + item.query) ===
                    fixtureKey(fixture.url) &&
                  item.status === fixture.status,
              );
              if (!response) {
                throw new Error(
                  `Required fixture was not consumed with status ${fixture.status}: ${fixture.url}`,
                );
              }
            }
          },
          15000,
          `${scenario.name} content readiness`,
        );
        await unchanged(input);
        const name = `fixture-${scenario.name}-${variant.width}-${variant.theme}`;
        await page.screenshot({
          path: path.join(output, `${name}.png`),
          fullPage: true,
          animations: "disabled",
          timeout: 15000,
        });
        result.screenshots = [`${name}.png`];
        if (scenario.focus) {
          const focus = page.locator(scenario.focus);
          await focus.evaluate((element) =>
            element.scrollIntoView({ block: "start" }),
          );
          await focus.screenshot({
            path: path.join(output, `${name}-focus.png`),
            animations: "disabled",
            timeout: 15000,
          });
          result.screenshots.push(`${name}-focus.png`);
        }
        if (scenario.navigate) {
          await bounded(
            () => scenario.navigate(page),
            30000,
            `${scenario.name} navigation`,
          );
        }
        result.requests = server.log.slice(logStart);
        for (const response of responses) {
          if (response.status < 400) {
            continue;
          }
          const expected = scenario.fixtures.some(
            (fixture) =>
              response.path.startsWith(`${apiBase}/`) &&
              fixtureKey(fixture.url) ===
                fixtureKey(
                  response.path.slice(apiBase.length) + response.query,
                ) &&
              fixture.status === response.status,
          );
          if (!expected) {
            result.errors.push(
              `Unexpected local response ${response.status}: ${response.path}${response.query}`,
            );
          }
        }
        if (result.errors.length) {
          throw new Error(result.errors.join("\n"));
        }
        await unchanged(input);
        result.status = "passed";
        await context.close();
        page = undefined;
      }
      await server.close();
      server = undefined;
    }
    await unchanged(input);
    if (interrupted) {
      throw new Error(
        "Capture interrupted or exceeded the five-minute deadline.",
      );
    }
    report.status = "passed";
  } catch (error) {
    report.error = error.message;
    if (server) {
      report.failureRequests = server.log;
    }
    if (page) {
      try {
        await page.screenshot({
          path: path.join(output, "fixture-failure.png"),
          fullPage: true,
          timeout: 5000,
        });
        await writeFile(
          path.join(output, "failure.html"),
          await bounded(() => page.content(), 5000, "diagnostic HTML"),
        );
      } catch (diagnosticError) {
        report.diagnosticError = diagnosticError.message;
      }
    }
    throw new Error(
      `${error.message}\nDiagnostics: ${output}. Missing browser? Run yarn playwright install chromium or select --channel chrome.`,
    );
  } finally {
    clearTimeout(deadline);
    process.removeListener("SIGINT", shutdown);
    process.removeListener("SIGTERM", shutdown);
    try {
      if (browser) {
        await browser.close();
      }
    } finally {
      try {
        if (server) {
          await server.close();
        }
      } finally {
        await writeFile(
          path.join(output, "fixture-report.json"),
          JSON.stringify(report, null, 2),
        );
      }
    }
  }
  process.stdout.write(
    `FIXTURE_CAPTURE_PASSED ${output}\nOpen representative PNGs and record visual observations.\n`,
  );
}
