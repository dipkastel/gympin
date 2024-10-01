import {createTheme} from "@mui/material/styles"


export const GympinTheme = createTheme({
    palette: {
        primary: {
            light: '#f14651',
            main: '#e7333e',
            dark:'#b22831',
            contrastText: '#ffffff',
        }
    },
    direction:"rtl",
    typography: {
        fontFamily: "IRANSans-web",
        fontSize: 12,
        h1: {
            fontFamily: "IRANSans-web",
            fontSize: "2rem",
        },
        h2: {
            fontFamily: "IRANSans-web",
            fontSize: "1.8rem",
        },
        h3: {
            fontFamily: "IRANSans-web",
            fontSize: "1.55rem",
        },
        h4: {
            fontFamily: "IRANSans-web",
            fontSize: "1.4rem",
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
            fontSize: "0.95rem",
        },
        subtitle2: {
            fontFamily: "IRANSans-web",
            fontSize: "0.90rem",
        },
        body1: {
            fontFamily: "IRANSans-web",
            fontSize: "0.85rem",
        },
        body2: {
            fontFamily: "IRANSans-web",
            fontSize: "0.80rem",
        },
        caption: {
            fontFamily: "IRANSans-web",
            fontSize: "0.75rem",
        },
        overline: {
            fontFamily: "IRANSans-web",
            fontSize: "0.6rem",
        },
    }
})
