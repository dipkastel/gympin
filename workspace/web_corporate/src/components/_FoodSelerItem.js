import React from 'react';
import {Box, Button, Card, CardActionArea, CardContent, Paper, Typography} from "@mui/material";
import {toPriceWithComma} from "../helper/utils";
import Grid from "@mui/material/Grid2";

const _FoodSelerItem = ({icon,title,minOrder,averagePrice,orderFrom}) => {
    return (
        <>
            <Box sx={{ zIndex:900,ml:4}}>{icon}</Box>
            <Card sx={{mt:-8,mb:2,mx:2}} elevation={10}>
                <CardActionArea sx={{px:4,pt:4,pb:2,textAlign:"center",alignContent:"center",justifyItems:"center",borderRadius:0}}>
                <Typography sx={{mb:4}} variant={"h4"}>
                    {title}
                </Typography>

                <Grid sx={{width:"100%"}} container justifyContent={"space-between"}>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                            حداقل سفارش :
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                             {minOrder} عدد
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{width:"100%"}} container justifyContent={"space-between"}>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                            میانگین قیمت :
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                            {toPriceWithComma(averagePrice)}  تومان
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{width:"100%"}} container justifyContent={"space-between"}>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                            سفارش از
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>
                            {orderFrom} روز آینده
                        </Typography>
                    </Grid>
                </Grid>
                </CardActionArea>
                <Paper sx={{width:"100%",textAlign:"center",borderRadius:"0",p:1}} >
                    سفارش به زودی
                </Paper>
            </Card>
        </>
    );
};

export default _FoodSelerItem;
