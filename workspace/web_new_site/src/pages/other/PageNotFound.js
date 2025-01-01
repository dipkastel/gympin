import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";

const PageNotFound = () => {
    const refreshTime = 10000;
    const [time,setTime]=useState(refreshTime)
    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    window.location = "/"
                    clearInterval(timer);
                    return 0;
                } else return time - 100;
            });
        }, 100);
    }, []);

    return (
        <>
            <div className={"notfound-center"} >
                <img alt={"این صفحه موجود نیست"} src={"/assets/images/404.png"}/>
            </div>
            <div className={"notfound-center"} >
                <Typography sx={{p:1,m:1}} variant={"h5"}>{time/1000}</Typography>
            </div>
        </>
    );
};

export default PageNotFound;
