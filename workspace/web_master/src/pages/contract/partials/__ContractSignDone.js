import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import checkAnim from "./check.json";
import Lottie from "react-lottie";

const __ContractSignDone = ({place}) => {

    const navigate = useNavigate();
    const [openModalSign, setOpenModalSign] = useState(true);

    const checkOptions = {
        loop: true,
        autoplay: true,
        animationData: checkAnim,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    };

    function complete(e){
        store.dispatch(sagaActions.RequestPlace(place.Id));
        navigate("/dashboard");
    }

    return (

        <Dialog open={openModalSign} >
            <DialogContent>
                <Typography variant={"subtitle1"} >
                    با تشکر از شما تفاهم نامه تکمیل گردید
                </Typography>
                <Lottie options={checkOptions} height={300} width={300} />
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color={"success"} fullWidth onClick={(e)=>complete(e)}>برو به صفحه اصلی</Button>
            </DialogActions>
        </Dialog>
    );
};

export default __ContractSignDone;
