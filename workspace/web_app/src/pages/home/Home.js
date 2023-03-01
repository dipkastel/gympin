import React, {useEffect, useState} from "react";
import HomeTitle from "./components/HomeTitle";
import {getHomePage} from "../../network/api/mainPage.api";
import "./Home.css"
import {useSelector} from "react-redux";
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

export default function Home() {
    const [data, setData] = useState(null);
    const [serverSettings] = useState(useSelector(({settings:{serverSettings}})=>serverSettings))
    console.log(getHomeId(serverSettings))
    const homePageId = getHomeId(serverSettings);
    useEffect(() => {
        getHomePage({id:homePageId}).then(result=>{
            console.log(result.data.Data);
            setData(result.data.Data);
        }).catch(ex=>{
            console.log(ex)

        })

    }, [])
    return (
        <>
            {data&&data.Items.sort((a, b) => a.Priority - b.Priority).map((item, index) => {
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
                })}
        </>
    );
}
