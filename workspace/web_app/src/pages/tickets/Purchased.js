import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Collapse,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";
import {purchased_query} from "../../network/api/purchased.api";
import {BuyableType} from "../../helper/enums/BuyableType";

const Purchased = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const  user  = useSelector( ({auth:{user}})=>  user );
    const  [loading,setLoading]  = useState( true);
    const  [subscribes,setSubscribes]  = useState( null);
    useEffect(() => {
        getUserSubscribes()
    }, []);

    function getUserSubscribes(){
        setLoading(true);
        purchased_query({
            queryType: "FILTER",
            UserId:user.Id,
            paging:{Page:0,Size:50}
        }).then(result=>{
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

    function GetBgByType(type) {
        switch (type) {
            case "SUBSCRIBE":return "#195064";
            case "COURSE":return "#193164";
            case "PRODUCT":return "#43294f";
            case "FOOD":return "#341c1c";
            case "SERVICE":return "#1c341c";
            case "DIET":return "#3d362f";
            case "WORKOUT":return "#4d2b33";
        }
    }

    function goToDetail(item) {
        console.log(item);
        switch (item.PurchasedType){
            case "SUBSCRIBE":
                navigate("/tickets/singleSubscribe/"+item.Id, {replace: false});
                break;
            case "COURSE":
                navigate("/tickets/singleCourse/"+item.Id, {replace: false});
                break;
        }
    }

    return (
        <>
            {!subscribes?(<>
                    <Grid
                        container
                        sx={{width:"100%",height:"80vh"}}
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <CircularProgress />
                    </Grid>
                </>):
                (subscribes.length>0)?subscribes.sort((a,b)=>b.Id-a.Id).map(item=>(
                <div key={item.Id}>
                    <Card elevation={3} sx={{margin:1}} onClick={(e)=>goToDetail(item)} >
                        <CardHeader  sx={{pb:1,pt:1,color:"white",bgcolor:GetBgByType(item?.PurchasedType)}}
                                     title={"مجموعه ورزشی "+item?.Place?.Name}
                                     action={<Typography  variant={"caption"}>{BuyableType[item?.PurchasedType]}</Typography>}
                        />
                        <CardContent sx={{py:"8px !important"}}>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Grid item>
                                    <Typography sx={{paddingY:1}} variant={"subtitle1"}>{item.Name}</Typography>
                                </Grid>
                                <Chip label={getStatus(item.PurchasedStatus).Name} sx={{mb:1}} size={"small"} variant={"filled"} color={getStatus(item.PurchasedStatus).Color} />
                            </Grid>

                        </CardContent>

                    </Card>
                </div>
            )):(<>
                <Grid
                    container
                    sx={{width:"100%",height:"80vh"}}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Image src={"https://api.gympin.ir/resource/image?Id=100"}  width={"40%"}/>
                    <Typography variant={"body"} sx={{m:2}} >
                        شما هنوز بلیط ندارید
                    </Typography>

                </Grid>
            </>)}
        </>
    );
};

export default Purchased;
