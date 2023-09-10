import React, {useContext, useEffect, useState} from "react";
import {Container, Navbar} from "react-bootstrap";
import {FormControlLabel, Grid, IconButton, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {UserCredit_getByUser} from "../network/api/userCredit.api";
import {connect, useSelector} from "react-redux";
import {toPriceWithComma} from "../helper/utils";
import {ErrorContext} from "./GympinPagesProvider";
import {sagaActions} from "../helper/redux/actions/SagaActions";

const NNavigaion = (props) => {

    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        props.RequestUser()
    }, []);



    return (
        <><Navbar className="" bg="light" variant="dark" expand="lg">


            <Container className={"w-100"} fluid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <IconButton sx={{color: "#000000"}} aria-label="add to shopping cart" href={"/notifs"}>
                        <NotificationsNoneOutlinedIcon/>
                    </IconButton>

                    {currentUser && <FormControlLabel
                        control={
                            <Typography variant="subtitle1" component="a" href={"/wallet"}
                                        sx={{
                                            textDecoration: "none",
                                            color: "#000"
                                        }}>{toPriceWithComma(currentUser.Balance)}</Typography>
                        }

                        label={
                            <IconButton sx={{color: "#000000"}} aria-label="" href={"/wallet"} name="wallet">
                                <AccountBalanceWalletOutlinedIcon/>
                            </IconButton>
                        }
                    />}
                </Grid>
            </Container>
        </Navbar>
            <div className={"home-header"}/>

        </>
    );
}

export default connect(null, sagaActions)(NNavigaion);
