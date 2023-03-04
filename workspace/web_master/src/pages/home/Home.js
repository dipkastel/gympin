import React, {useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {HomePage_getHome} from "../../network/api/homePage.api";
import {connect, useSelector} from "react-redux";
import {getHomeId} from "../../helper/serverSettingsHelper";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import HomeClickableTitle from "./components/HomeClickableTitle";
import HomeSingleUser from "./components/HomeSingleUser";
import HomeClickableBanner from "./components/HomeClickableBanner";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeSingleDiscount from "./components/HomeSingleDiscount";
import HomeContentList from "./components/HomeContentList";
import HomeSingleContent from "./components/HomeSingleContent";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

function Home(props) {
    const [homeList, setHomeList] = useState(null);
    const [serverSettings] = useState(useSelector(settings=>settings));
    const user = useSelector(state => state.auth.user);
    const homePageId = getHomeId(serverSettings);

    useEffect(() => {

        if(user){
            props.RequestServerSettings(user);
        }
        HomePage_getHome({id:homePageId})
            .then(result => {
                setHomeList(result.data.Data)
            }).catch((err)=>{
                alert("خطا در برقراری ارتباط با سرور و یا شما اجازه دسترسی به این بخش را ندارید"+err.message)
        })
    }, []);

    return (
        <>
            {homeList&&homeList.Items.sort((a, b) => a.Priority - b.Priority).map((item, index) => {
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
                })
            }
        </>
    );
}

export default connect(null, sagaActions)(Home)
