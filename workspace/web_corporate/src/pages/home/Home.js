import React, {useContext, useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {HomePage_getHome} from "../../network/api/homePage.api";
import {useSelector} from "react-redux";
import {getHomeId} from "../../helper/serverSettingsHelper";
import {ErrorContext} from "../../components/GympinPagesProvider";

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
                    case "USER_LIST":return   <HomeUserList key={index} item={item}/>
                    case "BANNER":return   <HomeBanner key={index} item={item}/>
                    default: return ( item.Type +"\n\r\n\r\t" )
                }
            })
            }
        </>
    );
}
