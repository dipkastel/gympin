import {createTheme} from "@mui/material/styles";

const FONT_FAMILY = "IRANSans-web";

export const GympinTheme = createTheme({
    direction: "rtl",

    palette: {
        primary: {
            light: "#f14651",
            main: "#e7333e",
            dark: "#b22831",
            contrastText: "#ffffff",
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            },
        },
    },
    typography: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,

        h1: {
            fontFamily: FONT_FAMILY,
            fontSize: "2rem",
        },

        h2: {
            fontFamily: FONT_FAMILY,
            fontSize: "1.8rem",
        },

        h3: {
            fontFamily: FONT_FAMILY,
            fontSize: "1.55rem",
        },

        h4: {
            fontFamily: FONT_FAMILY,
            fontSize: "1.4rem",
        },

        h5: {
            fontFamily: FONT_FAMILY,
            fontSize: "1.2rem",
        },

        h6: {
            fontFamily: FONT_FAMILY,
            fontSize: "1.1rem",
        },

        subtitle1: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.95rem",
        },

        subtitle2: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.9rem",
        },

        body1: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.85rem",
        },

        body2: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.8rem",
        },

        caption: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.75rem",
        },

        overline: {
            fontFamily: FONT_FAMILY,
            fontSize: "0.6rem",
        },
    },
});
