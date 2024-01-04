import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ticketTypes from "../../helper/data/ticketTypes";


const TicketsManagement = () => {

    const navigate = useNavigate();
    return (
        <Grid container alignContent={"space-around"} justifyContent={"space-around"} direction={"row"}>
            {ticketTypes.map(item=>(

                <Grid key={item.Id} item xs={4}>
                    <Card onClick={(e)=>item.Status=="Active"?navigate(item.Destination, {replace: true}):{}}  sx={{m:1}} elevation={3}>
                        <CardContent className={"row"}>
                            <div className={"col-sm-12 col-md-6"}>
                                {item.Icon}
                            </div>
                            <div className={"col-sm-12 col-md-6"}>
                                <Typography variant={"subtitle2"} textAlign={"center"}>
                                    {item.Name}
                                </Typography>
                                <Typography variant={"caption"} component={"h6"} textAlign={"center"}>
                                    {item.Status=="Active"?"مدیریت":"به زودی"}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default TicketsManagement;
