import React, {useEffect, useState} from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip, Collapse, Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid,
    IconButton, InputLabel, MenuItem, Select, Slider,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {useSelector} from "react-redux";
import {ticket_delete, ticket_getByUser} from "../../network/api/tickets.api";
import GetStringPrice, {toPriceWithComma} from "../../helper/utils";
import { useNavigate} from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import _PlanTimingReserve from "../places/place/_PlanTimingReserve";
const Tickets = () => {
    const navigate = useNavigate();
    const  user  = useSelector( ({auth:{user}})=>  user );
    const  [tickets,setTickets]  = useState( []);
    const  [ticketToDelete,setTicketToDelete]  = useState( null);
    const  [openDescription,SetOpenDescription]  = useState({});
    useEffect(() => {
        getUserTickets()
    }, []);
    function getUserTickets(){
        ticket_getByUser({id:user.Id}).then(result=>{
            setTickets(result.data.Data);
        }).catch(e=>console.log(e));
    }

    function getStatus(Status) {
        switch (Status){
            case "PAYMENT_WAIT":return {Name:"در انتظار پرداخت",Color:"warning"};
            case "READY_TO_ACTIVE":return {Name:"آمده فعال سازی",Color:"info"};
            case "PROCESSING":return {Name:"در حال بررسی",Color:"primary"};
            case "ACTIVE":return {Name:"فعال",Color:"success"};
            case "EXPIRE":return {Name:"منقضی",Color:"secondary"};
            case "COMPLETE":return {Name:"تکمیل جلسات",Color:"success"};
            case "CANCEL":return {Name:"لغو شده",Color:"warning"};
            default:return {Name:"نامشخص",Color:"default"};
        }
    }
    function renderModalDelete(){
        function deleteTicket(){
            ticket_delete({id:ticketToDelete.Id}).then(result=>{
                setTicketToDelete(null);
                getUserTickets();
            }).catch(e=>console.log(e))
        }
        console.log(ticketToDelete)
        return(<>
            <Dialog
                className={"w-100"}
                open={ticketToDelete!==null} onClose={() => setTicketToDelete(null)}>
                <DialogTitle>{"ایا از حذف "+ticketToDelete.PlanName+" اطمینان دارید؟"}</DialogTitle>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={()=>deleteTicket()}>بله</Button>
                    <Button variant={"contained"} color={"inherit"} onClick={()=>setTicketToDelete(null)}>خیر</Button>
                </DialogActions>
            </Dialog>
        </>)
    }

    return (
        <>
            {tickets.sort((a,b)=>b.Id-a.Id).map(item=>(
                <div key={item.Id}>
                    <Card elevation={3} sx={{margin:1}}>
                        <CardHeader title={item.PlanName} sx={{pb:0}}
                            action={<IconButton aria-label="openDescription" color="info" onClick={()=>SetOpenDescription({...openDescription,[item.Id]:!openDescription[item.Id]})}>
                                <HelpOutlineIcon/>
                            </IconButton>}
                        />
                        <CardContent sx={{pt:1}}>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Grid item  xs={10}>
                                    <Typography variant={"h5"}></Typography>
                                    {/*<Typography variant={"body2"}>{item.Description}</Typography>*/}
                                </Grid>
                                <Grid item xs={1} hidden={(item.Status!="PAYMENT_WAIT")}>
                                    <IconButton color={"primary"}  aria-label="delete" size="small" onClick={()=>setTicketToDelete(item)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Grid>
                                    <Typography sx={{paddingY:1}} variant={"subtitle1"}>{"مجموعه ورزشی "+item.Plan.Place.Name}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant={"body1"}>{toPriceWithComma(item.Price)+" تومان برای "+item.EntryTotalCount+" ورود"}</Typography>
                                </Grid>
                            </Grid>
                            {console.log(openDescription[item.Id])}

                            <Collapse in={openDescription[item.Id]} timeout={10} sx={{my:1}} unmountOnExit>
                                <Alert severity="info">
                                    {item.Description}
                                </Alert>
                            </Collapse>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                                    {"اعتبار بلیط تا "+new Date(item.ExpireDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </Typography>

                                {/*<Grid item xs={1}>*/}
                                {/*    <IconButton  hidden={(!["EXPIRE","COMPLETE","CANCEL"].includes(item.Status))}  color="primary" aria-label="add an alarm">*/}
                                {/*        <AutorenewIcon />*/}
                                {/*    </IconButton>*/}
                                {/*</Grid>*/}
                            </Grid>
                            <Chip label={getStatus(item.Status).Name} sx={{mb:1}} size={"small"} variant={"filled"} color={getStatus(item.Status).Color} />
                            <Grid item  xs={10} >
                                <Button onClick={()=>navigate("/invoice/"+item.Id)} hidden={(item.Status!="PAYMENT_WAIT")} fullWidth color={"success"} variant={"contained"}>{"مشاهده نحوه پرداخت"}</Button>
                                <Button href={"/tickets/singleTicket/"+item.Id} hidden={(item.Status!="READY_TO_ACTIVE")} fullWidth color={"primary"} variant={"contained"}>{"دریافت بلیت"}</Button>
                                <Button href={"/tickets/singleTicket/"+item.Id} hidden={(item.Status!="ACTIVE")} fullWidth color={"primary"} variant={"contained"}>{"مشاهده جزئیات و ورود بعدی"}</Button>
                            </Grid>
                        </CardContent>

                    </Card>
                </div>
            ))}
            {ticketToDelete&&renderModalDelete()}
        </>
    );
};

export default Tickets;
