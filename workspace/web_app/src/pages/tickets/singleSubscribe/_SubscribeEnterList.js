import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import {purchasedSubscribe_exitRequest} from "../../../network/api/purchasedSubscribe.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _SubscribeEnterList = ({subscribe,getSubscribe,setUserCanEnter}) => {
    const error = useContext(ErrorContext);
    const [entryList,setEntryList] = useState([]);
    useEffect(() => {
        if(subscribe.EntryList)
            setEntryList(subscribe.EntryList)
    }, [subscribe]);

    useEffect(() => {
        if(entryList.some(entry=>entry?.ExitDate==null))
            setUserCanEnter(false);
    }, [entryList]);

    function submitExit(item) {
        purchasedSubscribe_exitRequest({id:item.Id}).then(result=>{
            getSubscribe();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return entryList.length>0&& (
    <Grid>
        <Card elevation={3} sx={{margin:1,mt:2,padding: 1}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt:-5,bgcolor:"#FFFFFF",position:"absolute",px:3}} gutterBottom>
                    ورود ها
                </Typography>
        {entryList.map((item,number)=>(

                    <Grid
                        container
                        key={"entry"+number}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant={"body1"}
                                    sx={{my:1}}>
                            {item.EnterDate&&("ورود : "+new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            }))}
                        </Typography>
                        {item.SubscribeEntryStatus=="ACCEPTED"&&<Typography  variant={"body1"}
                                                                             sx={{my:1}}>
                            {(item.ExitDate)?( "خروج : "+new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })):<><Button onClick={(event)=>submitExit(item)} variant={"contained"} color={"primary"}
                                          sx={{my:1}}>خروج</Button> </>}
                        </Typography>}

                        {item.SubscribeEntryStatus=="REQUESTED"&&<Typography sx={{width:"100%",py:1}} variant={"subtitle1"}>
                            درخواست ورود به مجموعه ارسال شده است.
                        </Typography>}
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
                    </Grid>
        ))}
            </CardContent>
        </Card>
    </Grid>
    );
};

export default _SubscribeEnterList;
