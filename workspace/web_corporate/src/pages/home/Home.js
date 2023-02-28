import React, {useContext, useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {HomePage_getHome} from "../../network/api/homePage.api";
import {useSelector} from "react-redux";
import {getHomeId} from "../../helper/serverSettingsHelper";
import {ErrorContext} from "../../components/GympinPagesProvider";
import HomeClickableTitle from "./components/HomeClickableTitle";
import HomeSingleUser from "./components/HomeSingleUser";
import HomeClickableBanner from "./components/HomeClickableBanner";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeSingleDiscount from "./components/HomeSingleDiscount";
import HomeContentList from "./components/HomeContentList";
import HomeSingleContent from "./components/HomeSingleContent";

export default function Home() {
    const error = useContext(ErrorContext);
    const [homeList, setHomeList] = useState(null);
    const settings = useSelector(state=>state.settings)
    useEffect(() => {
        HomePage_getHome({id:getHomeId(settings)})
            .then(result => {
                setHomeList(result.data.Data)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, [])
    return (
        <>
            {homeList&&homeList.Items.map((item, index) => {
                switch (item.Type){
                    case "SLIDER":return   <HomeSlider key={index} item={item}/>
                    case "TITLE":return   <HomeTitle key={index} item={item}/>
                    case "CLICKABLE_TITLE":return   <HomeClickableTitle key={item.Id} item={item}/>
                    case "SINGLE_USER":return   <HomeSingleUser key={item.Id} item={item}/>
                    case "CLICKABLE_BANNER":return   <HomeClickableBanner key={item.Id} item={item}/>
                    case "DISCOUNT_LIST":return   <HomeDiscountList key={item.Id} item={item}/>
                    case "SINGLE_DISCOUNT":return   <HomeSingleDiscount key={item.Id} item={item}/>
                    case "CONTENT_LIST":return   <HomeContentList key={item.Id} item={item}/>
                    case "SINGLE_CONTENT":return   <HomeSingleContent key={item.Id} item={item}/>
                    case "USER_LIST":return   <HomeUserList key={index} item={item}/>
                    case "BANNER":return   <HomeBanner key={index} item={item}/>
                    default: return ( item.Type +"\n\r\n\r\t" )
                }
            })
            }
        </>
    );
}
