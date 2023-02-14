import React, {useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {getHomePage} from "../../network/api/mainPage.api";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeContentList from "./components/HomeContentList";
import "./Home.css"
import {useSelector} from "react-redux";
import {getHomeId} from "../../helper/serverSettingsHelper";

export default function Home() {
    const [data, setData] = useState(null);
    const [serverSettings] = useState(useSelector(({settings:{serverSettings}})=>serverSettings))
    console.log(getHomeId(serverSettings))
    const homePageId = getHomeId(serverSettings);
    useEffect(() => {
        getHomePage({id:homePageId}).then(result=>{
            setData(result.data.Data);
        }).catch(ex=>{
            console.log(ex)

        })

    }, [])
    return (
        <>
            {data&&data.Items.map((item, index) => {
                    switch (item.Type){
                        case "SLIDER":return   <HomeSlider key={index} item={item}/>
                        case "TITLE":return   <HomeTitle key={index} item={item}/>
                        case "USER_LIST":return   <HomeUserList key={index} item={item}/>
                        case "BANNER":return   <HomeBanner key={index} item={item}/>
                        case "DISCOUNT_LIST":return   <HomeDiscountList key={index} item={item}/>
                        case "CONTENT_LIST":return   <HomeContentList key={index} item={item}/>
                        default: return ( item.Type +"\n\r\n\r\t" )
                    }
                })}
        </>
    );
}
