const URL_PADRAO = "https://helppc.vercel.app";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || URL_PADRAO).replace(
  /\/$/,
  "",
);
