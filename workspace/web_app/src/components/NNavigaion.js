import React from "react";
import {Container, Navbar} from "react-bootstrap";
import {FormControlLabel, Grid, IconButton, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';


export default function NNavigaion() {
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

                    <FormControlLabel
                        control={
                            <Typography variant="subtitle1" component="a" href={"/wallet"}
                                        sx={{textDecoration: "none", color: "#000"}}>2,800,000</Typography>
                        }

                        label={
                            <IconButton sx={{color: "#000000"}} aria-label="" href={"/wallet"} name="wallet">
                                <AccountBalanceWalletOutlinedIcon/>
                            </IconButton>
                        }
                    />
                </Grid>
            </Container>
        </Navbar>
    );
}
