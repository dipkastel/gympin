import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {ticket_exitRequest} from "../../../network/api/tickets.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _EnterList = ({ticket,getTicket,setUserCanEnter}) => {
    const error = useContext(ErrorContext);
    const [entryList,setEntryList] = useState([]);
    useEffect(() => {
        if(ticket.EntryList)
            setEntryList(ticket.EntryList)
    }, [ticket]);

    useEffect(() => {
        console.log(entryList);
        setUserCanEnter(!entryList.some(entry=>entry.ExitDate==null))
    }, [entryList]);

    function submitExit(item) {
        ticket_exitRequest({id:item.Id}).then(result=>{
            getTicket();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }

    return (
    <>
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
                        {item.TicketEntryStatus=="ACCEPTED"&&<Typography  variant={"body1"}>
                            {(item.ExitDate)?( "خروج : "+new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })):<><Button onClick={(event)=>submitExit(item)} variant={"contained"} color={"primary"}>خروج</Button> </>}
                        </Typography>}

                        {item.TicketEntryStatus=="REQUESTED"&&<Typography sx={{width:"100%"}} variant={"subtitle1"}>
                            درخواست ورود به مجموعه ارسال شده است.
                        </Typography>}
                    </Grid>
                </CardContent>
            </Card>
        ))}
    </>
    );
};

export default _EnterList;
