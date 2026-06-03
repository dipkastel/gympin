import React from 'react';
import {Box, Card, CardActionArea, Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {CateringStatus} from "../helper/enums/CateringStatus";

const _FoodSelerItem = ({icon, title, minOrder, orderFrom, onClick, status}) => {
    return (
        <>
            <Box sx={{zIndex: 900, ml: 4}} onClick={status !== 'ACTIVE'?{}:onClick}>{icon}</Box>
            <Card sx={{mt: -8, mb: 2, mx: 2}} elevation={10}>
                <CardActionArea
                    sx={{px: 4, pt: 4, pb: 2, textAlign: "center", alignContent: "center", justifyItems: "center", borderRadius: 0}}
                    onClick={onClick} disabled={status !== 'ACTIVE'}>
                    <Typography sx={{mb: 4}} variant={"h4"}>
                        {title}
                    </Typography>

                    <Grid sx={{width: "100%"}} container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography sx={{mb: 1, width: "100%", textAlign: "start"}} color={"info"} variant={"body2"}>
                                حداقل سفارش :
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{mb: 1, width: "100%", textAlign: "start"}} color={"info"} variant={"body2"}>
                                {minOrder} عدد
                            </Typography>
                        </Grid>
                    </Grid>
                    {/*<Grid sx={{width:"100%"}} container justifyContent={"space-between"}>*/}
                    {/*    <Grid item >*/}
                    {/*        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>*/}
                    {/*            میانگین قیمت :*/}
                    {/*        </Typography>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item >*/}
                    {/*        <Typography sx={{mb:1,width:"100%",textAlign:"start"}} color={"info"} variant={"body2"}>*/}
                    {/*            {toPriceWithComma(averagePrice)}  تومان*/}
                    {/*        </Typography>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    <Grid sx={{width: "100%"}} container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography sx={{mb: 1, width: "100%", textAlign: "start"}} color={"info"} variant={"body2"}>
                                سفارش از
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{mb: 1, width: "100%", textAlign: "start"}} color={"info"} variant={"body2"}>
                                {orderFrom} روز آینده
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <Paper sx={{width: "100%", textAlign: "center", borderRadius: "0", p: 1}}>
                    {CateringStatus[status]}
                </Paper>
            </Card>
        </>
    );
};

export default _FoodSelerItem;
