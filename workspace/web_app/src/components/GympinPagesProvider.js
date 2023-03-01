import React, {createContext} from 'react';
import {Button, Grid, Paper, Snackbar, Typography} from "@mui/material";
import Slide from '@mui/material/Slide';

export const ErrorContext = createContext(null);

const data = {
    show: false,
    clickable: false,
    message: '',
    buttonTitle: '',
    onClick: () => {
    }
};

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

class GympinPagesProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            showError: (e) => this.showError(e),
            hideError: () => this.hideError()
        }
    }

    showError = (error) => {
        this.setState({...this.state, data: {...data, ...error, show: true}})
    }

    hideError = () => {
        this.setState({...this.state, data: data})
    }


    render() {
        return (
            <>
                <ErrorContext.Provider value={this.state}>
                    {this.props.children}
                </ErrorContext.Provider>

                <Snackbar sx={{mb:8,p:0}}
                          open={this.state.data.show}
                          autoHideDuration={3000}
                          TransitionComponent={ SlideTransition}
                          onClose={() => this.hideError()} >
                    <Paper sx={{width:"100%",backgroundColor:"#333",p:1}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Typography variant={"subtitle1"}  textAlign={"center"} color={"white"}>
                                {this.state.data.message}
                            </Typography>

                            {this.state.data.clickable&&<Button variant={"contained"} color={"primary"} onClick={()=>this.clickButton()}>{this.state.data.buttonTitle}</Button>}

                        </Grid>
                    </Paper>
                </Snackbar>
            </>
        )
    }

    clickButton() {
        this.state.data.onClick()
        this.hideError()
    }
}

export default GympinPagesProvider;
