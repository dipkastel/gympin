import React from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Badge, Card, CardActionArea, CardContent, CardHeader, Divider, ListItemText, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Assessment, DinnerDining, Receipt} from "@mui/icons-material";
import {toPriceWithComma} from "../../../helper/utils";
import _ProInvoiceItemCount from "./_ProInvoiceItemCount";
import _ProinvoiceBill from "./_ProinvoiceBill";
import _SideMenuHeader from "./_SideMenuHeader";

const SideMenu = ({CurrentBasket, removeOrder, setOrderCount, catering,confirmOrder,refresh,openSideMenu,setOpenSideMenu}) => {


    function getItemCount() {
        return CurrentBasket?.InvoiceFoods?.reduce(function (a, b) {
            return (b.IsCount)? a+b.Count:a;
        }, 0);
    }

    return (
        <>
            {CurrentBasket &&
            <>

                <Card sx={{m: 2}}>
                    <CardActionArea sx={{p: 2, textAlign: "center"}} onClick={(e) => setOpenSideMenu(true)}>
                        <CardContent>
                            <Badge badgeContent={CurrentBasket?.InvoiceBuyables?.length} color="error">
                                <Receipt sx={{fontSize: "3rem", mb: 1}}/>
                            </Badge>
                            <Typography variant={"h5"}>صورت حساب</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Drawer open={openSideMenu} anchor={'right'} onClose={(e)=>setOpenSideMenu(false)}>
                    <Box sx={{width: 520, mt: 8}}>
                        <_SideMenuHeader CurrentBasket={CurrentBasket} catering={catering} refresh={refresh} />
                        {!!CurrentBasket?.InvoiceBuyables?.length > 0 ? <Card sx={{m: 1}}>
                            <CardHeader title={"سفارشات از "+CurrentBasket?.InvoiceBuyables[0]?.Place?.Name}/>

                            <CardContent>
                                <Grid container direction={"row"}>
                                    {CurrentBasket?.InvoiceBuyables?.map(item => (
                                        <Grid container key={item.Id} size={12} sx={{width: "100%"}} justifyContent={"space-between"}>
                                            <Grid><ListItemText primary={item.Name}
                                                                secondary={toPriceWithComma(item.UnitPrice) + " تومان"}/></Grid>
                                            <Grid>
                                                <_ProInvoiceItemCount item={item} setOrderCount={setOrderCount} removeOrder={removeOrder}/>
                                            </Grid>
                                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                                     component="div"/>
                                        </Grid>
                                    ))}
                                    <Typography sx={{mt: 2}} variant={"h6"} fullWidth>{"مجموع " + getItemCount() + " غذا"}</Typography>
                                </Grid>
                            </CardContent>
                        </Card> : <Card sx={{m: 1, p: 2, textAlign: "center"}}>

                            <Typography variant={"body2"}>آیتمی انتخاب نشده</Typography>
                        </Card>}
                        <_ProinvoiceBill catering={catering} CurrentBasket={CurrentBasket} getItemCount={()=>getItemCount()} confirmOrder={confirmOrder}/>
                    </Box>
                </Drawer>
            </>
            }
        </>
    );
};

export default SideMenu;
