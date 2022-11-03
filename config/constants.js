import { extendTheme } from "native-base";

export const APP_NAME = {
  NEXT_BARCODE: "Next Barcode",
  NEXT_BARCODE_PRO: "Next Barcode Pro",
  KABASI_BARCODE: "Kabasi Barcode",
};

export const APP_VERSION = { FREE: "free", PRO: "pro" };

export const USER_ROLE = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

export const BARE_URL = "https://next-barcode.nextyfine.com";

export const API_URLS = {
  development: `${BARE_URL}/api/v1`,
  production: `${BARE_URL}/api/v1`,
  lanDev: `${BARE_URL}/api/v1`,
  textSite: `${BARE_URL}/api/v1`,
};

export const THEME_COLORS = {
  MAIN_COLOR: "#0091E7",
  PRIMARY_COLOR: "#31B4F2",
  PRIMARY_COLOR_DEEP: "#27a6e3",
  SECONDARY_COLOR: "#51B9CD",
  MAIN_DARK_COLOR: "#025492",
  DARK_COLOR: "#323E42",
};

export const THEME = extendTheme({
  fonts: ["ibmPs"],
});

export const VALIDATION_TYPE = {
  required: "required",
  optional: "optional",
};

// export default {
//   ...THEME_COLORS,
// };
