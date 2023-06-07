import React, {useContext, useEffect, useState} from "react";
import HomeTitle from "./components/HomeTitle";
import {getHomePage} from "../../network/api/mainPage.api";
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
        if(currentUser){
            props.RequestServerSettings(currentUser);
        }
        getHomePage({id:homePageId}).then(result=>{
            setData(result.data.Data);
            console.log(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }, [])
    return (
        <>
            {data?data.Items&&data.Items.sort((a, b) => a.Priority - b.Priority).map((item, index) => {
                    switch (item.Type){
                        case "SLIDER":return   <HomeSlider key={item.Id} item={item}/>
                        case "TITLE":return   <HomeTitle key={item.Id} item={item}/>
                        case "CLICKABLE_TITLE":return   <HomeClickableTitle key={item.Id} item={item}/>
                        case "USER_LIST":return   <HomeUserList key={item.Id} item={item}/>
                        case "SINGLE_USER":return   <HomeSingleUser key={item.Id} item={item}/>
                        case "BANNER":return   <HomeBanner key={item.Id} item={item}/>
                        case "CLICKABLE_BANNER":return   <HomeClickableBanner key={item.Id} item={item}/>
                        case "DISCOUNT_LIST":return   <HomeDiscountList key={item.Id} item={item}/>
                        case "SINGLE_DISCOUNT":return   <HomeSingleDiscount key={item.Id} item={item}/>
                        case "CONTENT_LIST":return   <HomeContentList key={item.Id} item={item}/>
                        case "SINGLE_CONTENT":return   <HomeSingleContent key={item.Id} item={item}/>
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
        </>
    );
}

export default connect(null, sagaActions)(Home)
