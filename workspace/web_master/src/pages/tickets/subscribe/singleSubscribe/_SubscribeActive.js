import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Switch, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {TicketSubscribes_ChangeTicketSubscribesStatus} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {getWizardComplete} from "../../../../helper/pocket";

const _SubscribeActive = ({ticketSubscribe, getSubscribeData}) => {
    const error = useContext(ErrorContext);
    const [inSubscribe, setInSubscribe] = useState(ticketSubscribe)
    const introMode=!getWizardComplete()

    useEffect(() => {
        setInSubscribe(ticketSubscribe);
    }, [ticketSubscribe]);

    function updateStatus(e,subscribe) {
        e.preventDefault();
        TicketSubscribes_ChangeTicketSubscribesStatus(subscribe).then(result => {
            getSubscribeData();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Form onSubmit={(e) => updateStatus(e)}>
                <Card elevation={3} sx={{margin: 1}}>

                    {introMode&&
                    <Typography sx={{p:1}} color={"#a2a2a2"} variant={"subtitle2"}>
                        بلیط هایی که فعال نباشد برای کاربر قابل خرید نخواهد بود.
                    </Typography>}

                    <CardHeader
                        title={inSubscribe.Enable ? "غیر فعالسازی" : "فعالسازی"}
                        action={(
                            <Switch
                                checked={!!inSubscribe.Enable}
                                onChange={(e) => updateStatus(e,{...inSubscribe, Enable: e.target.checked})}
                            />
                        )}
                    />
                </Card>
            </Form>
        </>
    );
};

export default _SubscribeActive;
