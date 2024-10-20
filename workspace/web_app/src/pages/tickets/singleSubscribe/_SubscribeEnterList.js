import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
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
        setUserCanEnter(!entryList.some(entry=>entry.ExitDate==null))
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

    return (
    <>

        {subscribe &&
        <div>
            <div className={"section-title mt-3 me-3"}>
                <Typography variant={"body2"}>ورود ها</Typography>
            </div>
        </div>}
        {entryList.map((item,number)=>(

            <Card key={"entry"+number} elevation={3} sx={{margin:1}}>
                <CardContent>
                    <Grid
                        container
                        sx={{width:"100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant={"body1"}>
                            {item.EnterDate&&("ورود : "+new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            }))}
                        </Typography>
                        {item.SubscribeEntryStatus=="ACCEPTED"&&<Typography  variant={"body1"}>
                            {(item.ExitDate)?( "خروج : "+new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })):<><Button onClick={(event)=>submitExit(item)} variant={"contained"} color={"primary"}>خروج</Button> </>}
                        </Typography>}

                        {item.SubscribeEntryStatus=="REQUESTED"&&<Typography sx={{width:"100%"}} variant={"subtitle1"}>
                            درخواست ورود به مجموعه ارسال شده است.
                        </Typography>}
                    </Grid>
                </CardContent>
            </Card>
        ))}
    </>
    );
};

export default _SubscribeEnterList;
