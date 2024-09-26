import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TagManager from "@/components/tag-manager";
import {
  MAIN_DESCRIPTION,
  MAIN_TITLE,
  MAIN_URL,
  OWNER_NAME,
  OWNER_WEBSITE,
} from "@/lib/constants";
import { CATEGORY_ITEMS, NOTIFICATION_SETTINGS } from "@/lib/content";
import { META_OPEN_GRAPH, META_TWITTER } from "./shared-metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(MAIN_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: MAIN_TITLE,
    template: `%s - ${MAIN_TITLE}`,
  },
  description: MAIN_DESCRIPTION,
  keywords: [
    "Alerts",
    "Singapore Alerts",
    "Notification Service",
    "Singapore Notification Service",
    "Email Alerts",
    "Email Notifications",
    "Email Subscription",
    "Telegram Alerts",
    "Telegram Notifications",
    "Telegram Channels",
    ...NOTIFICATION_SETTINGS.map((setting) => {
      // remove emojis
      let { title } = setting;
      title = title.replace(/[\u{2708}-\u{1F9FF}]/gu, "").trim();

      return title;
    }),
    ...CATEGORY_ITEMS.map((category) => `${category.title} in Singapore`),
  ],
  authors: [
    {
      name: OWNER_NAME,
      url: OWNER_WEBSITE,
    },
  ],
  creator: OWNER_NAME,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: META_OPEN_GRAPH,
  twitter: META_TWITTER,
  icons: {
    icon: `${MAIN_URL}favicon.ico`,
    apple: `${MAIN_URL}apple-touch-icon.png`,
    shortcut: `${MAIN_URL}favicon-16x16.png`,
  },
  manifest: `${MAIN_URL}site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <TagManager />
      </body>
    </html>
  );
}
