import React, {useContext, useEffect, useState} from "react";
import {Page_getHomePage} from "../../network/api/mainPage.api";
import "./Home.css"
import {connect, useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {Button, CircularProgress, Grid, IconButton, Typography} from "@mui/material";
import {Refresh} from "@mui/icons-material";
import HomeEngine from "./HomeEngine";

function Home(props) {
    const error = useContext(ErrorContext);
    const [data, setData] = useState([]);
    const [serverSettings] = useState(useSelector(settings => settings));
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        if (currentUser) {
            props.RequestUser();
        }
        getHome("WEB_MASTER_HOMEPAGE_ID");
    }, [serverSettings])

    function getHome(st){
        Page_getHomePage({SettingKey: st}).then(result => {
            setData(result.data.Data);
        }).catch(e => {
            setData(null);
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    useEffect(() => {
        if (currentUser) {
            props.RequestServerSettings(currentUser);
            props.RequestUserInvoices(currentUser);
        }

    }, [currentUser]);
    function pageLoadError(){
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <IconButton onClick={(e)=>getHome("WEB_MASTER_HOMEPAGE_ID")} size={"large"} color={"error"}>
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
    )
}

export default connect(null, sagaActions)(Home)
