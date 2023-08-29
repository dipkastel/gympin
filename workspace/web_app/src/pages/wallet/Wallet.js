import React, {useContext, useEffect, useState} from 'react';
import _IncreaseCredit from "./_IncreaseCredit";
import {Card, Divider, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserCredit_getByUser} from "../../network/api/userCredit.api";
import {toPriceWithComma} from "../../helper/utils";
import {creditTypes} from "../../helper/enums/creditTypes";
import {ErrorContext} from "../../components/GympinPagesProvider";
import _UserTransactions from "./_UserTransactions";

const Wallet = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [userCredit, setUserCredit] = useState([])
    useEffect(() => {
        getUserCredit();
    }, [currentUser]);

    function getUserCredit(){
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

    return (
        <>
            <Card elevation={3} sx={{margin: 1,backgroundColor:"#469391"}} >

                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>

                    <Typography
                        sx={{display: "inline", m: 3}}
                        variant={"h3"}
                        color={"white"}

                    >
                        {"اعتبار : " + toPriceWithComma(userCredit.TotalCredit) + " تومان"}
                    </Typography>
                </Grid>
            </Card>
            <_IncreaseCredit/>
            <Card elevation={3} sx={{margin: 1}}>
                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Image
                        src={"https://api.gympin.ir/resource/image?Id=12"}
                        width={"200px"}/>

                    {userCredit.CreditDetails&&userCredit.CreditDetails.map((item, number) => (
                        <Grid sx={{mb:1}} key={number}><Typography
                            sx={{display: "inline"}}
                            component="p"
                            variant="subtitle2"
                            color="text.primary"
                        >
                            {item.CreditType=="SPONSOR"&&creditTypes[item.CreditType]+" ("+item.Corporate.Name+") "}
                            {item.CreditType=="PERSONAL"&&creditTypes[item.CreditType]}
                            {toPriceWithComma(item.CreditAmount)+" تومان"}

                        </Typography><Typography
                            sx={{display: "inline"}}
                            component="p"
                            variant="body2"

                            color={"green"}
                        >
                            {" قابل پرداخت : "+toPriceWithComma(item.CreditPayableAmount)}

                        </Typography>
                            <Divider variant="inset" sx={{ margin: 0, padding: 0}} component="div"/></Grid>
                    ))}

                </Grid>

            </Card>

           <_UserTransactions user={currentUser}/>
        </>
    );
};

export default Wallet;
