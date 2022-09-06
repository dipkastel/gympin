import React, {useEffect, useState} from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import {sendSms} from "../../network/api/account.api";
import {getMainPage} from "../../network/api/mainPage.api";

export let jsonData = [
    {
        "Id": 1,
        "IsDeleted": false,
        "Type": "SLIDER",
        "Priority": 0,
        "Items": [
            {
                "Id": 1,
                "IsDeleted": false,
                "ImageUrl": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sports-and-tech-banner-design-template-b60eb30e679bdd78cde37d835c83f5c1_screen.jpg",
                "Title": "title1",
                "Description": "",
                "Destination": "SPORTS",
                "Data": "All",
                "Priority": 2
            },
            {
                "Id": 2,
                "IsDeleted": false,
                "ImageUrl": "https://i.pinimg.com/originals/4b/78/37/4b783786a354609d0c8b1d2a6e7b4b78.jpg",
                "Title": "title2",
                "Description": "",
                "Destination": "OUTERBROWSER",
                "Data": "https://kalamiss.ir",
                "Priority": 1
            },
            {
                "Id": 3,
                "IsDeleted": false,
                "ImageUrl": "https://secureprintportal.s3.us-west-1.amazonaws.com/production/assets/5966561450122033bd4456f8/imageLocker/blog-description/5f11c366a53d4d3a831471de/blog/sports_banners.png",
                "Title": "title3",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@me",
                "Priority": 3
            }
        ]
    },
    {
        "Id": 2,
        "IsDeleted": false,
        "Type": "TITLE",
        "Priority": 1,
        "Items": [
            {
                "Id": 4,
                "IsDeleted": false,
                "ImageUrl": "",
                "Title": "برترین ورزشکاران مرکز",
                "Description": "",
                "Destination": "USERLIST",
                "Data": "TopAll",
                "Priority": 0
            }
        ]
    },
    {
        "Id": 4,
        "IsDeleted": false,
        "Type": "USER_LIST",
        "Priority": 2,
        "Items": [
            {
                "Id": 5,
                "IsDeleted": false,
                "ImageUrl": "https://pod.inside-agile.de/common/images/numbers/12830_1.jpg",
                "Title": "ربیعه سلمک قرچلو",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@mohamadAlipour",
                "Priority": 0
            },
            {
                "Id": 6,
                "IsDeleted": false,
                "ImageUrl": "https://www.uxmatters.com/authors/Kuldeep-Kulshreshtha.jpg",
                "Title": "مسلم گرکانی",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@karim21",
                "Priority": 1
            },
            {
                "Id": 7,
                "IsDeleted": false,
                "ImageUrl": "https://www.micromata.de/wp-content/uploads/2021/03/avatar_user_7_1491310778-150x150.jpg",
                "Title": "حبیب نسیم آبادی",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@alif84",
                "Priority": 2
            },
            {
                "Id": 8,
                "IsDeleted": false,
                "ImageUrl": "https://images-na.ssl-images-amazon.com/images/I/41NnhFZA8aL._SY600_.jpg",
                "Title": "احسان ابراهیمی",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@alif84",
                "Priority": 3
            },
            {
                "Id": 9,
                "IsDeleted": false,
                "ImageUrl": "https://blog-gestion-de-projet.com/wp-content/uploads/2020/03/Capture-d%E2%80%99e%CC%81cran-2019-12-20-a%CC%80-00.43.05-300x300.png",
                "Title": "سحر اسدی",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@alif84",
                "Priority": 4
            },
            {
                "Id": 10,
                "IsDeleted": false,
                "ImageUrl": "https://certification.scrumalliance.org/system/members/photos/000/006/637/200x200/hohmann-small.jpg?1543438680",
                "Title": "علیرضا خانی",
                "Description": "",
                "Destination": "PROFILE",
                "Data": "@alif84",
                "Priority": 5
            }
        ]
    },
    {
        "Id": 5,
        "IsDeleted": false,
        "Type": "BANNER",
        "Priority": 3,
        "Items": [
            {
                "Id": 11,
                "IsDeleted": false,
                "ImageUrl": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a93f1056368213.59ac0e6672bf2.jpg",
                "Title": "",
                "Description": "",
                "Destination": "INNERBROWSER",
                "Data": "http://...",
                "Priority": 0
            }
        ]
    }
]


export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getMainPage()
            .then((data) => {
                setData(jsonData);
            }).catch((err)=>{
                alert("خطا در برقراری ارتباط با سرور و یا شما اجازه دسترسی به این بخش را ندارید"+err.message)
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
                        default: return ( item.Type +"\n\r\n\r\t" )
                    }
                })
            }
        </>
    );
}
