import React from "react";
import {Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Button, FormControlLabel, IconButton, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {Label} from "@mui/icons-material";


export default function NNavigaion(){
    return (
        <Navbar className="" bg="light" variant="dark"  expand="lg">
            <IconButton sx={{color:"#000000"}} aria-label="add to shopping cart" href={"/notifs"}>
                <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Container  className="justify-content-end">

                <FormControlLabel
                    control={
                        <Typography variant="subtitle1" component="a" href={"/wallet"} sx={{textDecoration:"none",color:"#000"}}>340,000</Typography>
                    }

                    label={
                        <IconButton sx={{color:"#000000"}} aria-label="" href={"/wallet"} name="wallet">
                            <AccountBalanceWalletOutlinedIcon />
                        </IconButton>
                    }
                />
            </Container>
        </Navbar>
    );
}
