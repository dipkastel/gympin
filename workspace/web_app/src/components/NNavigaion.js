import React, {useContext, useEffect, useState} from "react";
import {Container, Navbar} from "react-bootstrap";
import {FormControlLabel, Grid, IconButton, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {UserCredit_getByUser} from "../network/api/userCredit.api";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../helper/utils";
import {ErrorContext} from "./GympinPagesProvider";


export default function NNavigaion() {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [userCredit, setUserCredit] = useState(null)

    useEffect(() => {
        getUserCredit();
    }, [currentUser]);



    function getUserCredit(){
        if(currentUser.Id){
            UserCredit_getByUser({Id: currentUser.Id}).then(result => {
                setUserCredit(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
    }
    return (
        <Navbar className="" bg="light" variant="dark" expand="lg">


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

                    {userCredit&&<FormControlLabel
                        control={
                            <Typography variant="subtitle1" component="a" href={"/wallet"}
                                        sx={{textDecoration: "none", color: "#000"}}>{toPriceWithComma(userCredit.TotalCredit)}</Typography>
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
    );
}
