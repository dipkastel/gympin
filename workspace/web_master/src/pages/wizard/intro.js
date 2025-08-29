import React, {useContext, useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import {getWizardComplete, getWizardLevel, setWizardComplete, setWizardLevel} from "../../helper/pocket";
import {useNavigate} from "react-router-dom";
import store from "../../helper/redux/store";
import {settingActions} from "../../helper/redux/actions/SettingsActions";
import {authActions} from "../../helper/redux/actions/authActions";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useSelector} from "react-redux";
import {placePersonnel_ByUser} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {user_GetUserSettings, user_SetUserSettings} from "../../network/api/user.api";
import {Figure} from "react-bootstrap";
import {toAbsoluteUrl} from "../../helper/utils";

const Intro = () => {

    const navigate = useNavigate();
    const error = useContext(ErrorContext);


    const user = useSelector(({auth}) => auth.user);
    const [wizard,setWizard] = useState([]);
    const [loading,setLoading] = useState(true);



    useEffect(() => {
            getWizardId()
    }, []);

    useEffect(() => {
        if(wizard){
            if(wizard?.Value=="true"){
                finishWizard()
            }
            else
                getUserPlacesOwn();
        }
    }, [wizard]);

    function getUserPlacesOwn(){
        placePersonnel_ByUser({Id:user.Id}).then(result => {
            if(result.data.Data.filter(p=>p.UserRole.includes("PLACE_OWNER")).length<1){
                finishWizard();
            }
            else
                if(getWizardLevel()>0) navigate('/intro/wizard', {replace: true});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getWizardId() {
        user_GetUserSettings({Id:user.Id}).then(data=>{
            setWizard(data.data.Data?.filter(s=>s.Key=="USER_WIZARD_COMPLETE")?.[0]);

            setLoading(false);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function finishWizard() {
        user_SetUserSettings({Id:wizard?.Id,Value:true,Key:"USER_WIZARD_COMPLETE",User:{Id:user.Id}}).then(result=>{
            setWizardComplete(true);
            setWizardLevel(0);
            setLoading(false);
            setTimeout(function () {
                window.location = "/"
                navigate('/home', {replace: false});
            }, 3000);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function finishIntro() {
        setWizardLevel(1);
        navigate('/intro/wizard', {replace: true});
    }
    return (
        <>
            {!loading&&<Grid sx={{p:2}} container direction={"column"} alignItems={"center"} justifyContent={"center"}>
                <Grid sx={{mt:5}}>
                    <Typography variant={"h5"}>
                        درود
                    </Typography>
                </Grid>
                <Grid  sx={{mb:8,mt:4}}>

                    <Typography variant={"body1"}>
                        اینجا قراره فقط برای یک بار، با هم مشخصات مرکز شما رو تکمیل کنیم، تا کاربر های جیم پین، اطلاعات شما رو، درست و کامل ببینند.
                    </Typography>
                    <Figure.Image
                        width={"100%"}
                        alt="start intro"
                        src={toAbsoluteUrl("/assets/images/start.jpg")}
                    />
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
                        ما سعی کردیم برای هر بخش توضیح کاملی بنویسیم، اما اگر سوالی داشتید با شماره 02128424190 تماس بگیرید.
                    </Typography>
                </Grid>
                <Button variant={"contained"} fullWidth onClick={()=>finishIntro()} >بزن بریم</Button>
            </Grid>}
            {loading&&<Grid sx={{width:"100vw",height:"100vh"}} container justifyContent={"center"} alignContent={"center"}>
                <CircularProgress/>
            </Grid>
            }
        </>

    );
};

export default Intro;
