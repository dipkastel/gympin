import React, {useContext, useEffect, useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {ticket_getUserPlaceTicket} from "../../network/api/ticket.api";
import {TicketStatusEnum} from "../../helper/enums/TicketStatusEnum";

const _userTickets = ({user}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userPlaceTickets,setUserPlaceTicket] = useState([]);

    useEffect(() => {
        getUserPlaceTicket();
    }, []);


    function getUserPlaceTicket() {

        ticket_getUserPlaceTicket({UserId:user.Id,PlaceId:place.Id}).then(result=>{
            setUserPlaceTicket(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"خرید های کاربر از این مرکز"}
            />
            <CardContent>

                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {userPlaceTickets.map((item,num)=>(
                        <div key={"userTickets-"+num}>
                            <Link href={"/users/SingleTicket?id="+item.Id} sx={{textDecoration: "none", color: "#666666"}}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>

                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                        >
                                        <Typography variant={"subtitle1"} > {item.Plan.Name}</Typography>
                                        {/*<Typography variant={"subtitle1"} color={(item.Status=="ACTIVE")?"primary":"green"}>{item.Status}</Typography>*/}
                                        </Grid>
                                        <Typography variant={"caption"} color={"gray"}>سریال : {item.Serial}</Typography>
                                    </Grid>

                                    <Grid item justifyContent={"center"} alignContent={"center"}>

                                          <Typography variant={"body2"}>{"انقضا : "}{new Date(item.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            })}</Typography>
                                            <Typography variant={"body2"} color={(item.Status!="ACTIVE")?"primary":"green"} >{TicketStatusEnum[item.Status]}</Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </div>
                    ))}

                </List>
            </CardContent>
        </Card>
    );
};

export default _userTickets;
