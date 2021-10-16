import React from "react";
// eslint-disable-next-line no-restricted-imports
import { createTheme as createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme(
  {
    typography: {
      fontFamily: ["Poppins"].join(",")
    },

    palette: {
      contrastThreshold: 3,
      primary: {
        main: "#5d78ff"
      },
      secondary: {
        main: "#0abb87",
        contrastText: "#ffffff"
      },
      error: {
        main: "#fd397a"
      }
    },

    props: {
      MuiButtonBase: {
        disableRipple: true
      },
      MuiPopover: {
        elevation: 1
      }
    }
  }
);

export default function ThemeProvider(props) {
  const { children } = props;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
