import { API_URLS } from "./constants";

export const API_URL =
  process.env.NODE_ENV === "production" ? API_URLS.production : API_URLS.lanDev;
