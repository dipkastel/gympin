import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {purchasedSubscribe_getByKey} from "../../../network/api/purchasedSubscribe.api";
import {Grid2 as Grid, Typography} from "@mui/material";
import _UseExpire from "../commonPartials/_UseExpire";
import _TicketOwner from "../commonPartials/_TicketOwner";
import _SubscribeDetail from "./_SubscribeDetail";
import _UsageProgress from "../commonPartials/_UsageProgress";
import _SubscribeUserEnter from "./_SubscribeUserEnter";
import {Masonry} from "@mui/lab";
import _SubscribePhoneLessEnter from "./_SubscribePhoneLessEnter";
import _SubscribeEnterList from "./_SubscribeEnterList";

const SingleSubscribe = () => {
    const {subscribeKey} = useParams();
    const [subscribe, setSubscribe] = useState(null)
    const [userCanEnter, setUserCanEnter] = useState(true)
    const error = useContext(ErrorContext);

    useEffect(() => {
        document.title = 'بلیط - عضویت';
        getSubscribe();
    }, []);

    function getSubscribe() {
        purchasedSubscribe_getByKey({key: subscribeKey}).then(result => {
            setSubscribe(result.data.Data);
            if (result.data.Data.UseExpire) {
                setUserCanEnter(false);
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>
            {subscribe && <Grid sx={{minHeight:30}}>
                <div className={"section-title mt-3 me-3"}>
                    <Typography variant={"body2"}>{subscribe.Name}</Typography>

                </div>
            </Grid>}
            {subscribe &&
            <Masonry columns={{xs: 1, sm: 1, md: 2, lg: 2}}>
                    <_UseExpire subscribe={subscribe} getSubscribe={getSubscribe}/>

                    <_TicketOwner subscribe={subscribe}/>

                    <_SubscribeDetail subscribe={subscribe}/>
                    <_UsageProgress setUserCanEnter={setUserCanEnter} ticket={subscribe}/>

                    {(subscribe.Status == "ACTIVE" || subscribe.Status == "READY_TO_ACTIVE") &&
                    <_SubscribeUserEnter ticket={subscribe} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/>}

                    <_SubscribeEnterList subscribe={subscribe} getSubscribe={getSubscribe} setUserCanEnter={setUserCanEnter}/>

                {/*{(subscribe.Status == "ACTIVE") &&<Grid>*/}
                {/*     <_SubscribePhoneLessEnter subscribe={subscribe} getSubscribe={getSubscribe}/>*/}
                {/*</Grid>}*/}
            </Masonry>}
        </>

    );
};

export default SingleSubscribe;
