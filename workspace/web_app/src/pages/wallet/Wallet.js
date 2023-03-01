import React, {useEffect, useState} from 'react';
import _IncreaseCredit from "./_IncreaseCredit";
import {Card, Divider, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserCredit_getByUser} from "../../network/api/userCredit.api";
import {toPriceWithComma} from "../../helper/utils";
import {creditTypes} from "../../helper/enums/creditTypes";

const Wallet = () => {
    const navigation = useNavigate();
    const currentUser = useSelector(state => state.auth.user);
    const [userCredit, setUserCredit] = useState([])
    useEffect(() => {
        getUserCredit();
    }, [currentUser]);

    function getUserCredit(){
        UserCredit_getByUser({Id: currentUser.Id}).then(result => {
            setUserCredit(result.data.Data);
            console.log(result.data.Data)
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>

                    <Typography
                        sx={{display: "inline", marginTop: 5}}
                        component="p"
                        variant="h2"
                        color="text.primary"
                    >
                        {"اعتبار : " + toPriceWithComma(userCredit.TotalCredit) + " تومان"}
                    </Typography>
                    <Image
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8QTGSZL4Oq6rXd0eXYM_QqhOmCbqFhTWKw&usqp=CAU"}
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

           <_IncreaseCredit/>
        </>
    );
};

export default Wallet;
