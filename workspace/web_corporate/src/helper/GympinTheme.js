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
                    darker: '#79141a',
                    contrastText: '#e7dfdf',
                    boxBg: '#cecece'
                },
                secondary: {
                    light: '#8546f1',
                    main: '#8533e7',
                    dark: '#6628b2',
                    darker: '#451479',
                    contrastText: '#dbd8e3',
                    boxBg: '#e8d9ff'
                },
                tertiary: {
                    light: '#46f1c3',
                    main: '#24b78f',
                    dark: '#1f9a83',
                    darker: '#147952',
                    contrastText: '#c0d5c4',
                    boxBg: '#d9fff2'
                },
                quaternary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#decdd8',
                    boxBg: '#ffecd9'
                },
                quinary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#d3c9d1',
                    boxBg: '#daefd5'
                },
                info: {
                    light: "#255612",
                    main: '#2c6723',
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
                    boxBg: '#575757'
                },
                secondary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#2f0303',
                    boxBg: '#190634'
                },
                tertiary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#04163a',
                    boxBg: '#04112c'
                },
                quaternary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#341604',
                    boxBg: '#421e05'
                },
                quinary: {
                    light: '#f14651',
                    main: '#e7333e',
                    dark: '#b22828',
                    darker: '#79141a',
                    contrastText: '#02310b',
                    boxBg: '#031a03'
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
