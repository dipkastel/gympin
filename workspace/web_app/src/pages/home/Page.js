import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Page_getPageBydata} from "../../network/api/mainPage.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import HomeEngine from "./HomeEngine";
import {CircularProgress, Grid, IconButton, Typography} from "@mui/material";
import {Refresh} from "@mui/icons-material";

const Page = () => {

    const {pData} = useParams();

    const error = useContext(ErrorContext);
    const [data, setData] = useState([]);
    const [serverSettings] = useState(useSelector(settings => settings));
    const currentUser = useSelector(state => state.auth.user);


    useEffect(() => {
        getPage(pData);
    }, [pData]);



    function getPage(pD) {
        Page_getPageBydata({"Data":pD}).then(result => {
            setData(result.data.Data)
        }).catch(e => {
            setData(null);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function pageLoadError(){
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <IconButton onClick={(e)=>getPage(pData)} size={"large"} color={"error"}>
                <Refresh sx={{fontSize:"4rem"}} />
            </IconButton>

            <Typography variant={"h6"}>خطا در بارگزاری اطلاعات لطفا مجددا تلاش نمایید</Typography>
        </Grid>);
    }

    function pageLoading(){
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CircularProgress/>
        </Grid>);
    }

    return (
        <>
            <title>وب اپلیکیشن جیم پین</title>
            {data==null&& pageLoadError()}
            {data?.length<1&& pageLoading()}
            {data?.length>0&&<HomeEngine items={data} />}
        </>
    );
};

export default Page;
