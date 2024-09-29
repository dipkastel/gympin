import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem, ListItemText, Tab, Tabs,
    Typography
} from "@mui/material";
import {getUserFixedName, toPriceWithComma} from "../../../helper/utils";
import {AssignmentReturned} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {CreditStatusEnum} from "../../../helper/enums/CreditStatusEnum";
import _UserCreditListItem from "./_UserCreditListItem";

const _UserCredits = ({corporatePersonnel,updatePage}) => {


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"تاریخچه اعتبارهای کاربر"}
                />
                <CardContent>
                    <List>
                        {corporatePersonnel.CreditList && corporatePersonnel.CreditList.map(item => (
                            <div key={item.Id}>
                                <_UserCreditListItem userCredit={item} updatePage={updatePage} />
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </>
    );
};

export default _UserCredits;
