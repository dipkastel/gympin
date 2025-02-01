import {createTheme} from "@mui/material/styles"


export const GympinTheme = createTheme({

    cssVariables: {
        colorSchemeSelector: '.mode-%s',
    },
    colorSchemes: {
        light: {
            palette: {
                appbar: {
                    light: '#c7c7c7',
                    main: '#ffffff',
                    dark: '#9b9b9b',
                    contrastText: '#4f4f4f',
                },
                gray: {
                    light: '#efefef',
                    main: '#e9e9e9',
                    dark: '#afafaf',
                    darker:"#333333",
                    contrastText: '#4f4f4f',
                },
                primary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22831',
                    contrastText: '#ffffff',
                }
            }
        },
        dark: {
            palette: {
                gray: {
                    main: '#ffffff',
                    contrastText: '#4f4f4f',
                },
                primary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22831',
                    contrastText: '#ffffff',
                }
            }
        }
    },
    direction: "rtl",
    components: {
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 30,
                }
            }
        },
        MuiDialog:{
            styleOverrides:{
                paper:{
                    borderRadius:12,
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12
                }
            }
        }
    },
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
