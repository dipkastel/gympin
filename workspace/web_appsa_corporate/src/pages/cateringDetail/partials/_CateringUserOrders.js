import React, {useContext, useEffect, useState} from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {toPriceWithComma} from "../../../helper/utils";
import {Add, DeleteOutline, PeopleAlt, Remove} from "@mui/icons-material";
import {PersonnelFood_query} from "../../../network/api/PersonnelFood.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {parse} from "date-fns";

const _CateringUserOrders = ({corporate,selectedDate,setOpenSideMenu}) => {

    const error = useContext(ErrorContext);
    const [openDrawer,setOpenDrawer] = useState(false);
    const [userOrders,setUserOrders] = useState(null);


    useEffect(() => {
        getUserOrders()
    }, [selectedDate]);


    function getUserOrders() {
        setUserOrders(null);

        var date = new Date(selectedDate);
        PersonnelFood_query({
            queryType: "FILTER",
            CorporateId:corporate.Id,
            Date:date,
            paging: {Page: 0, Size: 20, orderBy: "id", Desc: false}
        }).then(result => {
            console.log(result.data.Data);
            setUserOrders(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function sendToOrders(e) {
        setOpenDrawer(false);
        setOpenSideMenu(true);
    }

    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea onClick={(e)=>setOpenDrawer(true)} sx={{p: 2, textAlign: "center"}}>
                    <CardContent>
                        <Badge badgeContent={userOrders?.numberOfElements} variant={"standard"} color={"success"}
                               anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
                            <PeopleAlt sx={{fontSize: "3rem", mb: 1}}/>
                        </Badge>
                        <Typography variant={"h5"}>سفارشات کاربران</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {userOrders&&<Drawer open={openDrawer} anchor={'left'} onClose={(e)=>setOpenDrawer(false)}>
                <Box sx={{width: 520, mt: 8}}>

                    <Card sx={{m: 1, textAlign: "center"}}>
                        <Grid sx={{p: 2}} container justifyContent={"center"}>
                            <Grid size={12}>
                                <Typography variant={"h5"}>سفارشات کاربران</Typography>
                                {selectedDate &&
                                <Typography variant={"body2"}>{new Date(selectedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</Typography>}
                            </Grid>
                        </Grid>
                    </Card>
                    <Card sx={{m: 1, textAlign: "center"}}>
                        <CardContent>
                            <ButtonGroup variant={"outlined"} fullWidth>
                                <Button >افزودن سفارش </Button>
                                <Button >دریافت لیست </Button>
                            </ButtonGroup>
                        </CardContent>
                    </Card>
                    <Card sx={{m: 1, textAlign: "center"}}>
                        <Table aria-label="userLists"  size={"small"} >
                            <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                                <TableRow>
                                    <TableCell>نام کارمند</TableCell>
                                    <TableCell>آیتم</TableCell>
                                    <TableCell  align={"center"}>تعداد</TableCell>
                                </TableRow>
                            </TableHead>

                            {!userOrders?.content && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}

                            <TableBody >
                                {userOrders?.content?.map((item,number)=>(

                                    <TableRow
                                        key={"personnelFood"+number}
                                        hover
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}

                                    >
                                        <TableCell>{item?.FullName}</TableCell>
                                        <TableCell>
                                            <ListItemText
                                                primary={item?.FoodMenu?.Food?.Name}
                                                secondary={toPriceWithComma(item?.Price)}
                                            />
                                            </TableCell>
                                        <TableCell align={"right"}>
                                            <ButtonGroup size={"small"} >
                                                <Button size={"small"} variant={"outlined"}><Add /></Button>
                                                <Button disabled={true} variant={"contained"}>{item?.Count}</Button>
                                                <Button size={"small"} variant={"outlined"}>{item?.Count>1?<Remove />:<DeleteOutline />}</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                    <Card sx={{m: 1, textAlign: "center"}}>
                        <CardContent>
                            <Button variant={"contained"} color={"warning"} fullWidth onClick={(e)=>sendToOrders(e)}>اضافه به صورت حساب </Button>

                            <Typography sx={{textAlign:"right",color:"gray",mt:1}} variant={"overline"}>در صورتی که در صورت‌حساب شما غذایی وجود داشته باشد این غذاها به آن‌ها اضافه خواهد شد.</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Drawer>}
        </>
    );
};

export default _CateringUserOrders;
