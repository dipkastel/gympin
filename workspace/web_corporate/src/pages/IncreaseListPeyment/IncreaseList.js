import React, {useEffect, useState} from 'react';
import {Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useSelector} from "react-redux";
import {corporate_getTransactions} from "../../network/api/corporate.api";
import {ControlPoint} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {toPriceWithComma} from "../../helper/utils";

const IncreaseList = () => {
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [transactions, SetTransactions] = useState([])

    useEffect(() => {
        corporate_getTransactions({CorporateId: corporate.Id}).then(result => {
            SetTransactions(result.data.Data);
        }).catch(e => console.log(e));
    }, []);


    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardContent>
               تاریخچه تراکنش ها
                <List disablePadding>
                    {transactions && transactions.reverse().map(item => (
                        <div key={"tr-" + item.Id}>
                            <ListItem disablePadding >
                                <ListItemButton >
                                    <ListItemIcon >
                                        <CheckCircleOutlineIcon  color={"success"}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={toPriceWithComma(item.DepositAmount)+" تومان"}
                                        secondary={new Date(item.CreatedDate).toLocaleDateString('fa-IR', {month: 'numeric', day: 'numeric',year:"numeric"})}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" sx={{marginLeft: 0}} component="li"/>
                        </div>

                    ))}
                </List>

            </CardContent>
        </Card>
    );
};

export default IncreaseList;
