import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { startServer } from "./server.mjs";
import {
  apiBase,
  scenarios,
  klookRoute,
  milesRoute,
  detailRoute,
  dealTitle,
  incomeNote,
} from "./fixtures/scenarios.mjs";

async function visible(locator) {
  await locator.waitFor({ state: "visible", timeout: 15000 });
}
function requireCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
async function contentReady(page, scenario, route) {
  const config = scenarios[scenario];
  if (config.failure) {
    await visible(page.getByRole("heading", { level: 1 }));
    await page
      .locator(".animate-pulse")
      .first()
      .waitFor({ state: "hidden", timeout: 15000 });
    requireCheck(
      (await page.locator("table").count()) === 0,
      "Failure scenario still displays a data table.",
    );
    requireCheck(
      (await page
        .getByText("Minimum Annual Income", { exact: true })
        .count()) === 0,
      "Failure scenario unexpectedly displays income.",
    );
    return;
  }
  if (config.group === "klook") {
    await visible(
      page.getByRole("heading", { name: "Klook Travel Deals", exact: true }),
    );
    if (scenario === "klook-results") {
      await visible(page.getByRole("link", { name: dealTitle, exact: true }));
      await visible(page.getByText(/^Last updated on /));
    } else if (scenario === "klook-empty") {
      await visible(
        page.getByText("No travel deals currently available.", { exact: true }),
      );
    } else {
      await visible(page.getByText(/^Last travel deal was spotted on /));
    }
    await visible(
      page.getByRole("link", { name: "Subscribe Now", exact: true }),
    );
  } else if (route === milesRoute) {
    const row = page.getByRole("row").filter({
      has: page.getByRole("link", {
        name: "DBS Altitude Visa Signature Card",
        exact: true,
      }),
    });
    await visible(row);
    const summary = row.getByText(/^Min\. income \(SG\/PR\):/);
    if (config.income?.locals !== undefined) {
      await visible(
        row.getByText(
          `Min. income (SG/PR): S$${config.income.locals.toLocaleString("en-US")}/year`,
          { exact: true },
        ),
      );
    } else {
      requireCheck(
        (await summary.count()) === 0,
        "Unexpected local income summary for missing amount.",
      );
    }
    const missingRow = page.getByRole("row").filter({
      hasText: "Citi PremierMiles Card — synthetic long-name wrapping example",
    });
    await visible(missingRow);
    requireCheck(
      (await missingRow.getByText(/^Min\. income/).count()) === 0,
      "Missing-income row has a summary.",
    );
    const headers = page.getByRole("columnheader", { includeHidden: true });
    requireCheck(
      (await headers.count()) === 4,
      "Comparison no longer has its four existing columns.",
    );
  } else {
    const heading = page.getByRole("heading", {
      name: "Minimum Annual Income",
      exact: true,
    });
    await visible(heading);
    const section = heading.locator("..");
    for (const [label, amount] of [
      ["Singapore Citizens / PRs", config.income?.locals],
      ["Foreigners", config.income?.foreigners],
    ]) {
      const tile = section.getByText(label, { exact: true }).locator("..");
      const expected =
        typeof amount === "number"
          ? `S$${amount.toLocaleString("en-US")} / year`
          : "Not available";
      await visible(tile.getByText(expected, { exact: true }));
    }
    if (config.income?.notes) {
      await visible(section.getByText(incomeNote, { exact: true }));
    }
  }
}

async function navigate(page, origin, route, scenario) {
  const endpoint =
    scenarios[scenario].group === "klook"
      ? "/travel-deals-checker/travel-deals-info"
      : "/travel-credit-cards-checker/travel-credit-cards-info";
  const [response] = await Promise.all([
    page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === `${apiBase}${endpoint}`,
      { timeout: 15000 },
    ),
    page.goto(`${origin}/sg-alerts${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    }),
  ]);
  requireCheck(
    response.status() === (scenarios[scenario].failure ? 503 : 200),
    `Unexpected fixture status ${response.status()}`,
  );
  // Response completion alone is insufficient: await the React-rendered fixture content.
  await contentReady(page, scenario, route);
  await page.waitForFunction(
    () =>
      document.fonts.status === "loaded" &&
      [...document.images].every(
        (image) =>
          image.complete &&
          (image.naturalWidth > 0 || !image.getAttribute("src")),
      ),
    undefined,
    { timeout: 15000 },
  );
  requireCheck(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    "Page-level horizontal overflow detected.",
  );
}

async function navigationCheck(page, origin, group) {
  if (group === "klook") {
    await page.goto(`${origin}/sg-alerts/categories/travel/`, {
      waitUntil: "domcontentloaded",
    });
    const card = page
      .locator("div.rounded-lg")
      .filter({
        has: page.getByText("🌏 Travel Deals (Klook)", { exact: true }),
      })
      .last();
    const link = card.getByRole("link", { name: "View Details", exact: true });
    await visible(link);
    requireCheck(
      (await link.getAttribute("href")) === `/sg-alerts${klookRoute}`,
      "Klook category link lost its production prefix.",
    );
    await link.click();
    await visible(page.getByRole("link", { name: dealTitle, exact: true }));
    await page.reload({ waitUntil: "domcontentloaded" });
    await contentReady(page, "klook-results", klookRoute);
    await page.goBack({ waitUntil: "domcontentloaded" });
    await visible(
      page.getByRole("heading", { name: "Travel in Singapore", exact: true }),
    );
  } else {
    await navigate(page, origin, milesRoute, "miles-income");
    await page
      .getByRole("link", {
        name: "DBS Altitude Visa Signature Card",
        exact: true,
      })
      .click();
    await contentReady(page, "miles-income", detailRoute);
    await page.reload({ waitUntil: "domcontentloaded" });
    await contentReady(page, "miles-income", detailRoute);
    await page
      .getByRole("link", {
        name: "Back to All Miles Credit Cards",
        exact: true,
      })
      .click();
    await contentReady(page, "miles-income", milesRoute);
    await page.goBack({ waitUntil: "domcontentloaded" });
    await contentReady(page, "miles-income", detailRoute);
  }
}

export async function capture(info, options) {
  const { chromium } = await import("playwright");
  const selected = Object.keys(scenarios).filter(
    (name) => scenarios[name].group === options.group,
  );
  requireCheck(selected.length > 0, "--group must be klook or miles.");
  const output = path.resolve(options.output);
  // Never replace prior evidence; every invocation owns a fresh directory.
  await mkdir(output, { recursive: false });
  const report = {
    label: "Fixture-backed visual rendering only; NOT live API compatibility",
    ...info,
    command: process.argv,
    results: [],
    observations:
      "Images must be opened and visually inspected; generation alone is not visual acceptance.",
  };
  let browser;
  let activeServer;
  let activePage;
  let current;
  let interrupted;
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
    for (const scenario of selected) {
      activeServer = await startServer(
        path.join(info.worktree, "out"),
        scenario,
      );
      const variants = [
        { width: 1366, height: 900, theme: "light" },
        { width: 375, height: 812, theme: "light" },
      ];
      if (scenario === "miles-income" || scenario === "klook-results") {
        variants.push({ width: 640, height: 900, theme: "dark" });
      }
      for (const variant of variants) {
        requireCheck(
          !interrupted,
          "Capture interrupted or exceeded the five-minute deadline.",
        );
        const context = await browser.newContext({
          viewport: { width: variant.width, height: variant.height },
          colorScheme: variant.theme,
          locale: "en-GB",
          timezoneId: "Asia/Singapore",
          reducedMotion: "reduce",
          serviceWorkers: "block",
        });
        current = {
          scenario,
          ...variant,
          blockedExternal: [],
          errors: [],
          pageErrors: [],
          localFailures: [],
          screenshots: [],
        };
        report.results.push(current);
        await context.addInitScript(
          (theme) => localStorage.setItem("theme", theme),
          variant.theme,
        );
        await context.route("**/*", async (route) => {
          const url = new URL(route.request().url());
          if (url.origin !== activeServer.origin) {
            if (current.blockedExternal.length < 100) {
              current.blockedExternal.push(url.origin + url.pathname);
            }
            await route.abort();
          } else if (!["GET", "HEAD"].includes(route.request().method())) {
            current.errors.push(
              `Blocked mutation: ${route.request().method()} ${url.pathname}`,
            );
            await route.abort();
          } else {
            await route.continue();
          }
        });
        const page = await context.newPage();
        activePage = page;
        page.setDefaultTimeout(15000);
        page.setDefaultNavigationTimeout(30000);
        page.on("pageerror", (error) => {
          if (current.pageErrors.length < 100) {
            current.pageErrors.push(error.message);
          }
        });
        page.on("console", (message) => {
          if (message.type() === "error" && current.errors.length < 100) {
            current.errors.push(message.text());
          }
        });
        page.on("response", (response) => {
          if (
            response.url().startsWith(activeServer.origin) &&
            response.status() >= 400 &&
            current.localFailures.length < 100
          ) {
            current.localFailures.push({
              url: response.url(),
              status: response.status(),
            });
          }
        });
        const routes =
          scenarios[scenario].group === "klook"
            ? [klookRoute]
            : [milesRoute, detailRoute];
        for (const route of routes) {
          requireCheck(
            !interrupted,
            "Capture interrupted or exceeded the five-minute deadline.",
          );
          current.route = route;
          await navigate(page, activeServer.origin, route, scenario);
          const name = `fixture-${scenario}-${route === detailRoute ? "detail" : "results"}-${variant.width}-${variant.theme}`;
          await page.screenshot({
            path: path.join(output, `${name}.png`),
            fullPage: true,
            animations: "disabled",
            timeout: 15000,
          });
          current.screenshots.push(`${name}.png`);
          if (route === detailRoute && !scenarios[scenario].failure) {
            const section = page
              .getByRole("heading", {
                name: "Minimum Annual Income",
                exact: true,
              })
              .locator("..");
            // Put the section above the viewport-bottom sticky subscription button.
            // Do not hide controls or modify the application to obtain evidence.
            await section.evaluate((element) =>
              element.scrollIntoView({ block: "start" }),
            );
            await section.screenshot({
              path: path.join(output, `${name}-income.png`),
              animations: "disabled",
              timeout: 15000,
            });
            current.screenshots.push(`${name}-income.png`);
          }
          if (scenarios[scenario].failure) {
            let rejected = false;
            try {
              await contentReady(
                page,
                scenarios[scenario].group === "klook"
                  ? "klook-results"
                  : "miles-income",
                route,
              );
            } catch {
              rejected = true;
            }
            requireCheck(
              rejected,
              "Results readiness incorrectly accepted failed API content.",
            );
          }
        }
        if (scenario === "klook-results" || scenario === "miles-income") {
          await navigationCheck(page, activeServer.origin, options.group);
        }
        const unexpected = current.localFailures.filter(
          (item) =>
            !(
              scenarios[scenario].failure &&
              item.status === 503 &&
              item.url.includes(apiBase)
            ),
        );
        requireCheck(
          !unexpected.length,
          `Local requests failed: ${JSON.stringify(unexpected)}`,
        );
        requireCheck(
          !current.pageErrors.length,
          `Browser runtime errors: ${JSON.stringify(current.pageErrors)}`,
        );
        current.status = "passed";
        await context.close();
        activePage = undefined;
      }
      report.results.at(-1).requests = activeServer.log;
      await activeServer.close();
      activeServer = undefined;
    }
    requireCheck(
      !interrupted,
      "Capture interrupted or exceeded the five-minute deadline.",
    );
    report.status = "passed";
  } catch (error) {
    report.status = "failed";
    report.error = `${error.message}\nIf the browser executable is missing, run yarn playwright install chromium, or pass --channel chrome for an installed Google Chrome.`;
    if (current) {
      current.status = "failed";
    }
    if (activeServer) {
      report.requests = activeServer.log;
    }
    if (activePage) {
      try {
        await activePage.screenshot({
          path: path.join(output, "fixture-failure.png"),
          fullPage: true,
          timeout: 5000,
        });
        await writeFile(
          path.join(output, "failure.html"),
          await activePage.content(),
        );
      } catch (diagnosticError) {
        report.diagnosticError = diagnosticError.message;
      }
    }
    throw new Error(`${report.error}\nDiagnostics retained in ${output}`);
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
        if (activeServer) {
          await activeServer.close();
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
