
export const style = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: "fit-content",
        "align-self": "center",
    },
    table: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button_danger: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#aa2222",
        "&:hover": {
            backgroundColor: "#770d0d",
        },
        color: "#fff"
    },
    button_edit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#227aaa",
        "&:hover": {
            backgroundColor: "#124a88",
        },
        color: "#fff"
    },
    button_second: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#2252aa",
        "&:hover": {
            backgroundColor: "#123788",
        },
        color: "#fff"
    },
    button_success: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#22aa66",
        "&:hover": {
            backgroundColor: "#128865",
        },
        color: "#fff"
    },
    container: {
        display: "inline-grid"
    },
    dropdown: {
        width: "180px"
    },
    map: {
        width: "600px",
        height: "300px"
    },
    hidden_input: {
        display: "none"
    }
})
