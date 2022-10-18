import React, {useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {getAllPlaces} from "../../network/api/place.api";

const data = {
    "Success": true,
    "MessageType": 0,
    "Message": "",
    "ResultDate": "2021-10-30T20:41:06.962+00:00",
    "LinkParams": null,
    "Error": null,
    "Data": [{
        "id": 1,
        "name": "نوین تن",
        "plan": 2,
        "address": "طرشت ، حبیب الله",
        "workDays": "همه روزه",
        "shiftTime": "8الی 15 -16 الی 24",
        "gender": "both",
        "facilities": [2, 5, 9, 10, 12],
        "sports": ["بدنسازی"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/131/conversions/Uneh10hH7IoGqm8hTBK9-large.jpg"
    }, {
        "id": 2,
        "name": "سید خندان",
        "plan": 2,
        "address": "میدان احمدی روشن",
        "workDays": "شنبه تا پنجشنبه",
        "shiftTime": "7 الی 23",
        "gender": "both",
        "facilities": [2, 6, 9, 10, 12],
        "sports": ["بدنسازی", "EMS", "trx"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/2936/conversions/MTdY8qE7CZ6JLLFu0PUG-large.jpg"
    }, {
        "id": 3,
        "name": "تن آرا وایین",
        "plan": 2,
        "address": "شهریار، شهرک وایین",
        "workDays": "شنبه تا پنج شنبه",
        "shiftTime": "9 الی 22",
        "gender": "both",
        "facilities": [2, 4, 9, 10],
        "sports": ["بدنسازی", "EMS", "trx", "ninja", "airobic"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/1468/conversions/8GF9cxySkCm4oyDVlatF-large.jpg"
    }, {
        "id": 4,
        "name": "کارما",
        "plan": 4,
        "address": "جردن",
        "workDays": "شنبه تا پنجشنبه",
        "shiftTime": "7 الی 23",
        "gender": "both",
        "facilities": [2, 5, 9, 10, 12],
        "sports": ["بدنسازی", "EMS", "trx"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/3155/conversions/1N19rwWGzaZHkVL5V0sm-large.jpg"
    }, {
        "id": 5,
        "name": "اکسیر جوان",
        "plan": 3,
        "address": "فلکه اول صادقیه",
        "workDays": "شنبه تا پنج شنبه",
        "shiftTime": "7 الی 24",
        "gender": "both",
        "facilities": [2, 5, 9, 10, 12],
        "sports": ["بدنسازی", "EMS", "trx"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/1558/conversions/Jkf7CyTuCGrF6XsPL4mI-large.jpg"
    }, {
        "id": 6,
        "name": "فیتنس نامی",
        "plan": 3,
        "address": "یوسف اباد",
        "workDays": "شنبه تا پنج شنبه",
        "shiftTime": "7 الی 24",
        "gender": "men",
        "facilities": [2, 3, 5],
        "sports": ["بدنسازی"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/139/conversions/LxfWEESiqLnq6PgAmVAa-large.jpg"
    }, {
        "id": 7,
        "name": "بهمنی",
        "plan": 3,
        "address": "نارمک",
        "workDays": "همه روزه",
        "shiftTime": "7 الی 23",
        "gender": "both",
        "facilities": [2, 5, 9],
        "sports": ["بدنسازی"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/105/conversions/06-large.jpg"
    }, {
        "id": 8,
        "name": "سلامت سبز",
        "plan": 2,
        "address": "شهرک راه آهن",
        "workDays": "از شنبه تا پنج شنبه",
        "shiftTime": "از 8:00 الى. 23:00",
        "gender": "both",
        "facilities": [2, 5, 9, 10, 12],
        "sports": ["بدنسازی", "EMS", "trx"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/131/conversions/Uneh10hH7IoGqm8hTBK9-large.jpg"
    }, {
        "id": 9,
        "name": "فیتنس موج مثبت",
        "plan": 4,
        "address": "شهر قدس",
        "workDays": "شنبه تا پنجشنبه",
        "shiftTime": "8 الی 22",
        "gender": "both",
        "facilities": [2, 10, 12],
        "sports": ["بدنسازی", "trx"],
        "image": "https://sportreserve.ir/storage/sportreserve-ir/6276/conversions/TlpmbwRNoCFF5ayz7GN3-large.jpg"
    }
    ]
}
const _PlacesList = () => {
    const [places,SetPlaces]=useState([])
    useEffect(() => {
        getAllPlaces().then(result=>{
            console.log(result)
            SetPlaces(result.data.Data)
        }).catch(e=>console.log(e))
    }, []);

    return (
        <>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.map(item => (
                        <Grid key={item.Id} item component={"a"} href={"/place?id="+item.Id+"&name="+item.Name} sx={{textDecoration:"none"}} md={6} sm={6} xs={6}>
                            <Card elevation={3} sx={{margin:0.5,padding:0.5}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item md={6} sm={6} xs={6} sx={{padding:0.5}}>
                                        {/*<Image src={item.image} width={"100%"} rounded={3}/>*/}
                                    </Grid>
                                    <Grid item sx={{padding:0}} md={6} sm={6} xs={6}>
                                        <Typography variant={"subtitle1"}>
                                            {item.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {'\r\n'+item.Region.Name}
                                        </Typography>
                                        <Typography variant={"body2"}>
                                            {/*{item.sports.map(sport=>(*/}
                                            {/*    sport+","*/}
                                            {/*))}*/}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
                {data.Data.map(item => (
                        <Grid key={item.id} item component={"a"} href={"/place?id="+item.id+"&name="+item.name} sx={{textDecoration:"none"}} md={6} sm={6} xs={6}>
                            <Card elevation={3} sx={{margin:0.5,padding:0.5}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item md={6} sm={6} xs={6} sx={{padding:0.5}}>
                                        <Image src={item.image} width={"100%"} rounded={3}/>
                                    </Grid>
                                    <Grid item sx={{padding:0}} md={6} sm={6} xs={6}>
                                        <Typography variant={"subtitle1"}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {'\r\n'+item.address}
                                        </Typography>
                                        <Typography variant={"body2"}>
                                            {item.sports.map(sport=>(
                                                sport+","
                                            ))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
};

export default _PlacesList;