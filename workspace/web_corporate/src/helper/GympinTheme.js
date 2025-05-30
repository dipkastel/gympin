import {createTheme} from "@mui/material/styles"


export const GympinTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 650,
            md: 1200,
            lg: 1500,
            xl: 1600,
        },
    },
    direction: "rtl",
    // palette: {
    //     primary: {
    //         light: '#f14651',
    //         main: '#e7333e',
    //         dark:'#b22828',
    //         darker: '#79141a',
    //         contrastText: '#ffffff',
    //     },
    // },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#bb2e2e',
                    contrastText: '#eadfdf',
                    boxBg: '#eed6d6',
                    otherText: '#2f0404',
                },
                secondary: {
                    light: '#46f1c3',
                    main: '#24b78f',
                    dark: '#1f9a83',
                    darker: '#147952',
                    contrastText: '#e5efec',
                    boxBg: '#b0dccb',
                    otherText: '#246e55',
                },
                tertiary: {
                    light: '#4487de',
                    main: '#2c67b2',
                    dark: '#21589b',
                    darker: '#194681',
                    contrastText: '#e0e4e8',
                    boxBg: '#a0bce0',
                    otherText: '#15355e',
                },
                quaternary: {
                    light: '#c46625',
                    main: '#854112',
                    dark: '#72360d',
                    darker: '#5e2e0a',
                    contrastText: '#eae6e3',
                    boxBg: '#d9c0b1',
                    otherText: '#b28d73',
                },
                quinary: {
                    light: '#8546f1',
                    main: '#8533e7',
                    dark: '#6628b2',
                    darker: '#451479',
                    contrastText: '#e0dbe7',
                    boxBg: '#e8d9ff',
                    otherText: '#1c0534',
                },
                info: {
                    light: "#2a2a2a",
                    main: '#484848',
                    dark: '#3b7834',
                    darker: '#4e8945',
                    contrastText:'#5f9a56',
                    lightChannel:"#876543",
                    mainChannel:"#654321",
                    darkChannel:"#543210",
                    contrastTextChannel:"#987654",
                }
            },
        },
        dark: {
            palette: {
                primary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#ffffff',
                    boxBg: '#575757',
                    otherText: '#b08585',
                },
                secondary: {
                    light: '#208c3a',
                    main: '#126927',
                    dark: '#074112',
                    darker: '#04280d',
                    contrastText: '#68bdb3',
                    boxBg: '#04280d',
                    otherText: '#6fb6af',
                },
                tertiary: {
                    light: '#2c67b2',
                    main: '#1b4981',
                    dark: '#143f75',
                    darker: '#0e2f57',
                    contrastText: '#b3c4d9',
                    boxBg: '#0a2444',
                    otherText: '#68819f',
                },

                quaternary: {
                    light: '#a8561d',
                    main: '#854112',
                    dark: '#652f0d',
                    darker: '#4b2109',
                    contrastText: '#d9ad92',
                    boxBg: '#421e05',
                    otherText: '#8c6767',
                },
                quinary: {
                    light: '#51269d',
                    main: '#451c8d',
                    dark: '#330f72',
                    darker: '#1d0842',
                    contrastText: '#c9b6ea',
                    boxBg: '#1d0842',
                    otherText: '#907daf',
                },
                info: {
                    light: "#555555",
                    main: '#bbbbbb',
                    dark: '#333333',
                    darker: '#222222',
                    contrastText:'#cccccc',
                    lightChannel:"#666666",
                    mainChannel:"#444444",
                    darkChannel:"#333333",
                    contrastTextChannel:"#111111",
                }
            },
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            }
        },
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:12,
                }
            }
        },
        MuiAlert:{
            styleOverrides:{
                root:{
                    borderRadius:12,
                }
            }
        },
        MuiOutlinedInput:{
            styleOverrides:{
                root:{
                    borderRadius:12
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
