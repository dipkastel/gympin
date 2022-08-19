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
            fontSize: "1.4rem",
        },
        h2: {
            fontFamily: "IRANSans-web",
            fontSize: "1.3rem",
        },
        h3: {
            fontFamily: "IRANSans-web",
            fontSize: "1.2rem",
        },
        h4: {
            fontFamily: "IRANSans-web",
            fontSize: "1.1rem",
        },
        h5: {
            fontFamily: "IRANSans-web",
            fontSize: "1rem",
        },
        h6: {
            fontFamily: "IRANSans-web",
            fontSize: "0.9rem",
        },
        subtitle1: {
            fontFamily: "IRANSans-web",
            fontSize: "0.8rem",
        },
        subtitle2: {
            fontFamily: "IRANSans-web",
            fontSize: "0.6rem",
        },
        body1: {
            fontFamily: "IRANSans-web",
            fontSize: "0.6rem",
        },
        body2: {
            fontFamily: "IRANSans-web",
            fontSize: "0.5rem",
        },
        caption: {
            fontFamily: "IRANSans-web",
            fontSize: "0.4rem",
        },
        overline: {
            fontFamily: "IRANSans-web",
            fontSize: "0.3rem",
        },
    }
})
