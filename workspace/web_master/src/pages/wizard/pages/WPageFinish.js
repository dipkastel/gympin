import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";
import About from "../../about/About";
import {placePersonnel_ByUser} from "../../../network/api/placePersonnel.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setWizardComplete} from "../../../helper/pocket";
import {user_getById, user_GetUserSettings, user_SetUserSettings} from "../../../network/api/user.api";

const WPageFinish = ({onNext}) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const [userPlaceCount, SetUserPlaceCount] = useState(0);
    const [selectedPlace, SetSelectedPlace] = useState(useSelector(({place}) => place.place))
    const [wizard,setWizard] = useState([]);

    useEffect(() => {
        placePersonnel_ByUser({Id:user.Id}).then(result => {
            SetUserPlaceCount(result.data.Data.filter(p=>p.UserRole.includes("PLACE_OWNER")).length);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);
    useEffect(() => {
        user_GetUserSettings({Id:user.Id}).then(data=>{
            setWizard(data.data.Data?.filter(s=>s.Key=="USER_WIZARD_COMPLETE")?.[0]);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function finishIntro() {

        user_SetUserSettings({Id:wizard?.Id,Value:true,Key:"USER_WIZARD_COMPLETE",User:{Id:user.Id}}).then(result=>{
            error.showError({message: "ثبت موفق",});
            setWizardComplete(true);
            navigate('/', {replace: true});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    return (
        <div>
            <Typography sx={{p:2}} variant={"subtitle1"}>
                ممنون از این که تا اینجا اومدید
            </Typography>
            <Typography sx={{p:2}} variant={"subtitle1"}>
                <Alert severity="success" sx={{px:1}}>
                    {"ما اطلاعات لازم برای مجموعه "+selectedPlace.Name+" رو دریافت کردیم."}</Alert>
            </Typography>
            {(userPlaceCount>1)&&<>
                <Typography sx={{p:2}} variant={"subtitle1"}>
                    <Button onClick={(e)=>onNext(1)} fullWidth variant={"contained"} color={"primary"} >بریم مجموعه بعدی</Button>
                </Typography>
                <Grid sx={{p:2}}>
                    <Button onClick={(e)=>finishIntro()} fullWidth variant={"contained"} color={"success"} >همه مجموعه ها وارد شدن</Button>
                </Grid>
            </>}
            {(userPlaceCount<2)&&<>
                <Grid sx={{p:2}}>
                    <Button onClick={(e)=>finishIntro()} fullWidth variant={"contained"} color={"success"} >اتمام فرایند دریافت</Button>
                </Grid>
            </>}
        </div>
    );
};

export default WPageFinish;
