import React, {useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {getMainPage} from "../../network/api/mainPage.api";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeContentList from "./components/HomeContentList";
import "./Home.css"

export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getMainPage().then(data=>{
            console.log("data",data.data.Data.LayoutItemParams)
            setData(data.data.Data.LayoutItemParams);
        }).catch(ex=>{
            console.log(ex)

        })

    }, [])
    return (
        <>
            {
                data.map((item, index) => {
                    switch (item.Type){
                        case "SLIDER":return   <HomeSlider key={index} item={item}/>
                        case "TITLE":return   <HomeTitle key={index} item={item}/>
                        case "USER_LIST":return   <HomeUserList key={index} item={item}/>
                        case "BANNER":return   <HomeBanner key={index} item={item}/>
                        case "DISCOUNT_LIST":return   <HomeDiscountList key={index} item={item}/>
                        case "CONTENT_LIST":return   <HomeContentList key={index} item={item}/>
                        default: return ( item.Type +"\n\r\n\r\t" )
                    }
                })
            }
        </>
    );
}
