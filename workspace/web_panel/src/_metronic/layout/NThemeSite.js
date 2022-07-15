import { createTheme } from "@mui/material/styles";

export const NThemeSite = createTheme({
  palette: {
    contrastThreshold: 3,
    primary: {
      main: "#5d78ff",
    },
    secondary: {
      main: "#0abb87",
      contrastText: "#ffffff",
    },
    error: {
      main: "#fd397a",
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiPopover: {
      elevation: 1,
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "IRANSans-web",
    fontSize: 12,
    h1: {
      fontFamily: "IRANSans-web",
      fontSize: "4rem",
    },
    h2: {
      fontFamily: "IRANSans-web",
      fontSize: "3.3rem",
    },
    h3: {
      fontFamily: "IRANSans-web",
      fontSize: "2.8rem",
    },
    h4: {
      fontFamily: "IRANSans-web",
      fontSize: "2rem",
    },
    h5: {
      fontFamily: "IRANSans-web",
      fontSize: "1.2rem",
    },
    h6: {
      fontFamily: "IRANSans-web",
      fontSize: "1.1rem",
    },
    subtitle1: {
      fontFamily: "IRANSans-web",
      fontSize: "0.9rem",
    },
    subtitle2: {
      fontFamily: "IRANSans-web",
      fontSize: "0.8rem",
    },
    body1: {
      fontFamily: "IRANSans-web",
      fontSize: "0.9rem",
    },
    body2: {
      fontFamily: "IRANSans-web",
      fontSize: "0.8rem",
    },
    caption: {
      fontFamily: "IRANSans-web",
      fontSize: "0.7rem",
    },
    overline: {
      fontFamily: "IRANSans-web",
      fontSize: "0.65rem",
    },
  },
});
