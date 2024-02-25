import React, {useContext, useEffect, useState} from "react";
import HomeTitle from "./components/HomeTitle";
import {HomePage_getHome} from "../../network/api/homePage.api";
import "./Home.css"
import {connect, useSelector} from "react-redux";
import {getHomeId} from "../../helper/serverSettingsHelper";
import HomeSlider from "./components/HomeSlider";
import HomeClickableTitle from "./components/HomeClickableTitle";
import HomeUserList from "./components/HomeUserList";
import HomeSingleUser from "./components/HomeSingleUser";
import HomeBanner from "./components/HomeBanner";
import HomeClickableBanner from "./components/HomeClickableBanner";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeSingleDiscount from "./components/HomeSingleDiscount";
import HomeContentList from "./components/HomeContentList";
import HomeSingleContent from "./components/HomeSingleContent";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {CircularProgress, Grid} from "@mui/material";

function Home(props) {
    const error = useContext(ErrorContext);
    const [data, setData] = useState(null);
    const [serverSettings] = useState(useSelector(settings=>settings));
    const currentUser = useSelector(state => state.auth.user);
    const homePageId = getHomeId(serverSettings);
    useEffect(() => {
        document.title = 'خانه';
        if(currentUser){
            props.RequestServerSettings(currentUser);
        }
        HomePage_getHome({id:homePageId}).then(result=>{
            setData(result.data.Data);
            console.log("home",result)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }, [])
    var classe = "col-sm-12 col-md-10 col-lg-7 col-xl-5 col-xxl-4";
    return (
        <div className={"home-center"}>
            {data?data.Items&&data.Items.sort((a, b) => a.Priority - b.Priority).map((item, index) => {
                    switch (item.Type){
                        case "SLIDER":return   <div key={item.Id} className={classe}><HomeSlider item={item}/></div>
                        case "TITLE":return   <div key={item.Id} className={classe}><HomeTitle item={item}/></div>
                        case "CLICKABLE_TITLE":return   <div key={item.Id} className={classe}><HomeClickableTitle item={item}/></div>
                        case "USER_LIST":return   <div key={item.Id} className={classe}><HomeUserList item={item}/></div>
                        case "SINGLE_USER":return   <div key={item.Id} className={classe}><HomeSingleUser item={item}/></div>
                        case "BANNER":return   <div key={item.Id} className={classe}><HomeBanner item={item}/></div>
                        case "CLICKABLE_BANNER":return   <div key={item.Id} className={classe}><HomeClickableBanner item={item}/></div>
                        case "DISCOUNT_LIST":return   <div key={item.Id} className={classe}><HomeDiscountList item={item}/></div>
                        case "SINGLE_DISCOUNT":return   <div key={item.Id} className={classe}><HomeSingleDiscount item={item}/></div>
                        case "CONTENT_LIST":return   <div key={item.Id} className={classe}><HomeContentList  item={item}/></div>
                        case "SINGLE_CONTENT":return   <div key={item.Id} className={classe}><HomeSingleContent  item={item}/></div>
                        default: return ( item.Type +"\n\r\n\r\t" )
                    }
                }):(
                (<>
                    <Grid
                        container
                        sx={{width:"100%",height:"80vh"}}
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <CircularProgress />
                    </Grid>
                </>)
            )}
        </div>
    );
}

export default connect(null, sagaActions)(Home)
