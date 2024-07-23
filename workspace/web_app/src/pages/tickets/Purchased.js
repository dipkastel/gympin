import React, {useContext, useEffect, useState} from 'react';
import {Box, Card, CardContent, CardHeader, Chip, CircularProgress, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";
import {purchased_query} from "../../network/api/purchased.api";
import {BuyableType} from "../../helper/enums/BuyableType";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import __sharePersonelCreadits from "../wallet/__sharePersonelCreadits";
import __personalTransactions from "../wallet/__personalTransactions";

const Purchased = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth: {user}}) => user);
    const [loading, setLoading] = useState(true);
    const [subscribes, setSubscribes] = useState(null);
    const userBasket = useSelector(state => state.invoice.userBasket);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        document.title = 'بلیط ها';
        getUserSubscribes()
    }, []);


    function getUserSubscribes() {
        setLoading(true);
        purchased_query({
            queryType: "FILTER",
            UserId: user.Id,
            paging: {Page: 0, Size: 50}
        }).then(result => {
            console.log(result.data.Data.content);
            setSubscribes(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getStatus(Status) {
        switch (Status) {
            case "PAYMENT_WAIT":
                return {Name: "در انتظار پرداخت", Color: "warning"};
            case "READY_TO_ACTIVE":
                return {Name: "آمده فعال سازی", Color: "info"};
            case "PROCESSING":
                return {Name: "در حال بررسی", Color: "primary"};
            case "ACTIVE":
                return {Name: "فعال", Color: "success"};
            case "EXPIRE":
                return {Name: "منقضی", Color: "secondary"};
            case "COMPLETE":
                return {Name: "تکمیل جلسات", Color: "success"};
            case "CANCEL":
                return {Name: "لغو شده", Color: "warning"};
            default:
                return {Name: "نامشخص", Color: "default"};
        }
    }

    function GetBgByType(type) {
        switch (type) {
            case "SUBSCRIBE":
                return "#195064";
            case "COURSE":
                return "#193164";
            case "PRODUCT":
                return "#43294f";
            case "FOOD":
                return "#341c1c";
            case "SERVICE":
                return "#1c341c";
            case "DIET":
                return "#3d362f";
            case "WORKOUT":
                return "#4d2b33";
        }
    }

    function goToDetail(item) {
        console.log(item);
        switch (item.PurchasedType) {
            case "SUBSCRIBE":
                navigate("/tickets/singleSubscribe/" + item.Id, {replace: false});
                break;
            case "COURSE":
                navigate("/tickets/singleCourse/" + item.Id, {replace: false});
                break;
        }
    }

    function progress() {
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CircularProgress/>
        </Grid>);
    }

    function Empty() {
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
            <Typography variant={"body"} sx={{m: 2}}>
                شما هنوز بلیط ندارید
            </Typography>

        </Grid>);
    }

    function tickets() {
        function getByFilter(p){
            if(tabIndex===0){
                if(p.PurchasedStatus==="READY_TO_ACTIVE"||
                    p.PurchasedStatus==="ACTIVE"||
                    p.PurchasedStatus==="PROCESSING")
                    return true
                else return false;
            }else if(tabIndex==1){
                if(p.PurchasedStatus==="EXPIRE"
                ||p.PurchasedStatus==="COMPLETE"
                ||p.PurchasedStatus==="CANCEL")
                    return true
                else return false;
            }else if(tabIndex===2){
                navigate("/basket", {replace: false});
            }
        }

        return (<>

            <Box sx={{bgcolor: 'background.paper',zIndex:1001,position:"relative"}}>
                <AppBar position="static">
                    <Tabs
                        value={tabIndex}
                        onChange={(e, num) => setTabIndex(num)}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="فعال" id={"user-tab-0"} aria-controls={"user-tabpanel-0"}/>
                        <Tab label="تاریخچه" id={"user-tab-1"} aria-controls={"user-tabpanel-1"}/>
                        {userBasket&&<Tab label="سبد خرید" id={"user-tab-2"} aria-controls={"user-tabpanel-2"}/>}
                    </Tabs>
                </AppBar>
            </Box>
            {subscribes.filter(p=>getByFilter(p)).sort((a, b) => b.Id - a.Id).map(item => singleTicket(item))}
        </>)
    }


    function singleTicket(ticket){
        return  (
            <div key={ticket.Id}>
                <Card elevation={3} sx={{margin: 1}} onClick={(e) => goToDetail(ticket)}>
                    <CardHeader sx={{pb: 1, pt: 1, color: "white", bgcolor: GetBgByType(ticket?.PurchasedType)}}
                                title={"مجموعه " + ticket?.Place?.Name}
                                action={<Typography
                                    variant={"caption"}>{BuyableType[ticket?.PurchasedType]}</Typography>}
                    />
                    <CardContent sx={{py: "8px !important"}}>
                        <Grid
                            container
                            sx={{width: "100%"}}
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Grid item>
                                <Typography sx={{paddingY: 1}} variant={"subtitle1"}>{ticket.Name}</Typography>
                            </Grid>
                            <Chip label={getStatus(ticket.PurchasedStatus).Name} sx={{mb: 1}} size={"small"}
                                  variant={"filled"} color={getStatus(ticket.PurchasedStatus).Color}/>
                        </Grid>

                    </CardContent>

                </Card>
            </div>
        )
    }

    return (
        <>
            {!subscribes ? progress() :(subscribes.length > 0)? tickets() : Empty()}
        </>
    );
};

export default Purchased;
