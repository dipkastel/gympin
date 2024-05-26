import React, {useEffect} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import {getWizardComplete, getWizardLevel, setWizardLevel} from "../../helper/pocket";
import {useNavigate} from "react-router-dom";
import store from "../../helper/redux/store";
import {settingActions} from "../../helper/redux/actions/SettingsActions";
import {authActions} from "../../helper/redux/actions/authActions";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useSelector} from "react-redux";

const Intro = () => {

    const navigate = useNavigate();


    useEffect(() => {
        if(getWizardLevel()>0) navigate('/intro/wizard', {replace: true});
    }, []);


    function finishIntro() {
        setWizardLevel(1);
        navigate('/intro/wizard', {replace: true});
    }
    return (
        <Grid sx={{p:2}} container direction={"column"} alignItems={"center"} justifyContent={"center"}>
            <Grid sx={{mt:8}}>
                <Typography variant={"h5"}>
                    به جیم پین خوش آمدید.
                </Typography>
            </Grid>
            <Grid  sx={{mb:8,mt:4}}>
                <Typography variant={"body1"}>
                    سلام
                </Typography>
                <Typography variant={"body2"}>
                    سلام اینجا قراره فقط برای یک بار، با هم مشخصات مرکز شما رو تکمیل کنیم، تا کاربر های جیم پین، اطلاعات شما رو، درست و کامل ببینند.
                </Typography>
                <Typography variant={"subtitle1"}>
                    لطفا برسی کنید که تا پایان مسیر دریافت اطلاعات به، اینترنت متصل باشید.
                </Typography>
                <Typography variant={"subtitle1"}>
                    وی پی ان و پروکسی ممکنه سرعتتون رو کم کنه، پس لطفا اگر روشن هست، خاموشش کنید.
                </Typography>
                <Typography variant={"subtitle1"}>
                     نگران نباشید! سعی شده اطلاعات وارد شده در هر مرحله، ذخیره بشه پس اگر فرصت کافی نداشتید و تا قسمتی پیش رفتید، میتونید بعدا ادامش بدید.
                </Typography>
                <Typography variant={"subtitle1"}>
                    ما سعی کردیم برای هر بخش توضیح کاملی بنویسیم، اما اگر سوالی داشتید با شماره 02177162192 تماس بگیرید.
                </Typography>
            </Grid>
                <Button variant={"contained"} fullWidth onClick={()=>finishIntro()} >بزن بریم</Button>
        </Grid>
    );
};

export default Intro;
