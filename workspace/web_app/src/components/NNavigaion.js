import React, {useEffect} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Badge, FormControlLabel, Grid, IconButton, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {connect, useSelector} from "react-redux";
import {toPriceWithComma} from "../helper/utils";
import {sagaActions} from "../helper/redux/actions/SagaActions";
import {ShoppingBagOutlined} from "@mui/icons-material";

const NNavigaion = (props) => {

    const currentUser = useSelector(state => state.auth.user);
    const userBasket = useSelector(state => state.invoice.userBasket);

    useEffect(() => {
        if(currentUser){
            props.RequestUser();
        }
    }, []);

    useEffect(() => {
        if(currentUser?.Id&&window?.location?.pathname!=="/basket")
            props.RequestUserInvoices(currentUser);
    }, [currentUser]);



    return (
        <>
            <Navbar className="" bg="light" variant="dark" expand="lg">
                <Container className={"w-100"} fluid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            {userBasket &&
                            <IconButton sx={{color: "black"}} aria-label="" href={"/basket"} name="basket">
                                <Badge badgeContent={userBasket?.InvoiceBuyables?.length} color="primary">
                                    <ShoppingBagOutlined/>
                                </Badge>
                            </IconButton>
                            }
                            <IconButton sx={{color: "#000000"}} aria-label="add to shopping cart" href={"/notifs"}>

                                {/*<Badge badgeContent={1} color="primary">*/}
                                <NotificationsNoneOutlinedIcon/>
                                {/*</Badge>*/}
                            </IconButton>
                        </Grid>

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
