import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {IncreaseUserDeposit_query} from "../../../network/api/increaseUserDeposit.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../../helper/utils";
import {TransactionTypes} from "../../../helper/enums/TransactionTypes";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const UserRequests = () => {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [userRequests, setUserRequests] = useState(null)

    useEffect(() => {
        getUserIncreaseRequests();
    }, []);

    function getUserIncreaseRequests() {
        IncreaseUserDeposit_query({
            queryType: "FILTER",
            UserId: currentUser.Id,
            paging: {Page: 0, Size: 100, Desc: true}
        }).then((data) => {
            setUserRequests(data.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function itsEmpty() {
        return (<Card elevation={3} sx={{margin: 1}}>
            <CardContent>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"body1"}>
                        لیست خالی است
                    </Typography>
                </Grid>
            </CardContent>
        </Card>);
    }

    if (userRequests?.length < 1)
        return itsEmpty();

    if (!userRequests)
        return (<>
            <Grid
                sx={{height: "80VH"}}
                container
                direction={"column"}
                justifyContent="center"
                alignItems="center">
                <CircularProgress/>
            </Grid>
        </>);

    return (
        <div>
            <div className={"section-title mt-3 me-3"}>
                <Typography variant={"body2"}>تاریخچه درخواست‌ها</Typography>
            </div>

            {userRequests?.map(row=>(
                <Card  key={"transaction-" + row?.Id} elevation={3} sx={{margin: 2,borderRadius:4 }}>
                    <CardContent sx={{p:"8px !important"}}>
                        <ListItem disablePadding sx={{direction: "rtl", textAlign: "right"}}>
                            <ListItemText>
                                <ListItemText primary={toPriceWithComma(row?.Amount) + " تومان"}
                                              secondary={TransactionTypes[row?.TransactionType]}/>
                                {row?.DepositStatus == "CONFIRMED" &&
                                <Alert severity="success" sx={{px: 1}}><Typography variant={"caption"} sx={{px: 1}}>{row?.SerialDescription}</Typography></Alert>}
                                {row?.DepositStatus == "REJECTED" &&
                                <Alert severity={"error"} sx={{px: 1}}><Typography variant={"caption"} sx={{px: 1}}>{row?.SerialDescription}</Typography></Alert>}
                                <ListItemText
                                    secondary={"تاریخ : " + new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}/>
                                <ListItemText secondary={"سریال : " + row?.Serial?.Serial?.split('-')[0]}/>
                            </ListItemText>
                            <ListItemIcon sx={{minWidth: "auto"}}>
                                {row?.DepositStatus == "REQUESTED" && <HourglassEmptyIcon color={"error"}/>}
                            </ListItemIcon>
                        </ListItem>
                    </CardContent>
                </Card>
            ))}


        </div>
    );
};

export default UserRequests;
