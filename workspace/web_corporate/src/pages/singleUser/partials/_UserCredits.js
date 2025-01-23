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
            {corporatePersonnel?.CreditList?.length>0&&
            <Card elevation={3} sx={{margin: 1}}>

                <Typography variant={"h6"} sx={{px:1,pt:2}}>تاریخچه اعتبارهای کاربر</Typography>
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

            }
            {!corporatePersonnel?.CreditList?.length>0&&
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Typography variant={"body2"} >اعتباری برای این کاربر یافت نشد</Typography>
                </CardContent>
            </Card>

            }
        </>
    );
};

export default _UserCredits;
