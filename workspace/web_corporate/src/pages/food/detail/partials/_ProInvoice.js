import React, {useContext, useEffect, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Badge, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, ListItemText, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Add, DeleteOutline, DinnerDining, Remove} from "@mui/icons-material";
import {toPriceWithComma} from "../../../../helper/utils";
import _ProInvoiceItemCount from "./_ProInvoiceItemCount";
import _ProinvoiceBill from "./_ProinvoiceBill";
const _ProInvoice = ({CurrentBasket,addOrder,removeOrder,setOrderCount,refreshList}) => {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (newOpen) => () => {

        setOpen(newOpen);
    };


    function getItemCount(){
       return  CurrentBasket.InvoiceBuyables.reduce( function(a, b){
            return a + b.Count;
        }, 0);
    }

    function getFoodItemCount(){
       return  CurrentBasket.InvoiceBuyables.reduce( function(a, b){
            return a + b.Count;
        }, 0);
    }


    return (
        <>
            {CurrentBasket&&
            <>
                <Card sx={{py: 4}} onClick={toggleDrawer(true)}>
                    <Grid container justifyContent={"center"}>
                        <Badge badgeContent={CurrentBasket.InvoiceBuyables.length} color="error">
                            <DinnerDining sx={{m: 1}} fontSize={"large"}/>
                        </Badge>
                    </Grid>
                </Card>
                <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
                    <Box sx={{width: 520, mt: 8}} >
                        <Card sx={{m: 1, p: 2,textAlign:"center"}}>
                            <Typography variant={"h5"} >صورت حساب</Typography>
                        </Card>
                        {!!CurrentBasket?.InvoiceBuyables?.length>0?<Card sx={{m: 1}}>
                            <CardHeader title={"سفارشات"} />

                            <CardContent>
                                <Grid container direction={"row"}>
                                    {CurrentBasket?.InvoiceBuyables?.map(item => (
                                        <Grid container key={item.Id} size={12} sx={{width:"100%"}} justifyContent={"space-between"} >
                                            <Grid><ListItemText primary={item.Name} secondary={toPriceWithComma(item.UnitPrice)+" تومان"} /></Grid>
                                            <Grid>
                                                <_ProInvoiceItemCount item={item} setOrderCount={setOrderCount} removeOrder={removeOrder} addOrder={addOrder}/>
                                            </Grid>
                                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                                     component="div"/>
                                        </Grid>
                                    ))}
                                    <Typography sx={{mt:2}} variant={"h6"} fullWidth >{"مجموع "+getItemCount()+" آیتم"}</Typography>
                                </Grid>
                            </CardContent>
                        </Card>:<Card sx={{m: 1, p: 2,textAlign:"center"}}>

                            <Typography variant={"body2"} >آیتمی انتخاب نشده</Typography>
                        </Card>}
                        {!!CurrentBasket?.InvoiceBuyables?.length>0&&<Card sx={{m: 1}}>
                            <CardHeader title={"صورت حساب"} />
                            <CardContent>
                                <_ProinvoiceBill CurrentBasket={CurrentBasket} />
                                <Button size={"large"} fullWidth variant={"contained"} disabled={getItemCount()<30} sx={{mt:2}}>
                                    {"ثبت نهایی"}
                                    {(getItemCount()<30)&&" با "+(30 - getItemCount())+" آیتم دیگر"}
                                </Button>
                            </CardContent>
                        </Card>}
                    </Box>
                </Drawer>
            </>
            }
        </>
    );
};

export default _ProInvoice;
