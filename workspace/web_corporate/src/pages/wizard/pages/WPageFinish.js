import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {corporate_updateStatus} from "../../../network/api/corporate.api";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const WPageFinish = () => {

    const error = useContext(ErrorContext);
    const [loading, setLoading] = useState(false);

    const corporate = useSelector(({corporate}) => corporate.corporate);

    useEffect(() => {
        if (corporate?.Status !== "PREREGISTER")
            window.location = "/";
    }, []);


    function ActivateCorporate(e) {
        e.preventDefault()
        setLoading(true);
        corporate_updateStatus({Id: corporate.Id, Status: "ACTIVE"}).then(result => {
            store.dispatch(sagaActions.RequestCorporate(corporate));
            setInterval(function () {
                window.location = "/";
            }, 3000)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="تشکر"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            تیم جیم.پین از شما متشکر است که با پیوستن به ما، ضمن بهره مندی از خدمات جیم پین گام مهمی در بالا بردن سطح سلامت جامعه برداشته اید.
                        </Typography>
                        <Button disabled={loading} fullWidth onClick={e => ActivateCorporate(e)} variant={"contained"}> فعالسازی
                            سازمان </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default WPageFinish;
