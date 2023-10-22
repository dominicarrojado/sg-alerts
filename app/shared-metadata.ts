import {
  MAIN_DESCRIPTION,
  MAIN_TITLE,
  MAIN_URL,
  SITE_NAME,
} from "@/lib/constants";

export const META_OPEN_GRAPH = {
  type: "website",
  locale: "en_US",
  url: MAIN_URL,
  title: {
    default: MAIN_TITLE,
    template: `%s - ${MAIN_TITLE}`,
  },
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
};

export const META_TWITTER = {
  card: "summary_large_image",
  title: {
    default: MAIN_TITLE,
    template: `%s - ${MAIN_TITLE}`,
  },
  description: MAIN_DESCRIPTION,
  images: [`${MAIN_URL}og-image.png`],
};
