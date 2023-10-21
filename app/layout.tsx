import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TagManager from "@/components/tag-manager";
import {
  MAIN_DESCRIPTION,
  MAIN_ORIGIN,
  MAIN_TITLE,
  MAIN_URL,
  OWNER_NAME,
  OWNER_WEBSITE,
  SITE_NAME,
} from "@/lib/constants";
import { NOTIFICATION_SETTINGS } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    ...NOTIFICATION_SETTINGS.map((setting) => setting.title),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: MAIN_URL,
    title: MAIN_TITLE,
    description: MAIN_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${MAIN_URL}og-image.png`,
        width: 1200,
        height: 750,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MAIN_TITLE,
    description: MAIN_DESCRIPTION,
    images: [`${MAIN_URL}og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
