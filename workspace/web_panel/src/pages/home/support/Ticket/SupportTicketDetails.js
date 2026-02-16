import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Support_addMessage, Support_getById, Support_update} from "../../../../network/api/support.api";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Card, Checkbox, FormControlLabel, FormGroup, Grid, List, TextField, Typography} from "@mui/material";
import {Alert, Form} from "react-bootstrap";
import {Row} from "reactstrap";
import {getUserFixedName} from "../../../../helper";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import PopoverUser from "../../../../components/popover/PopoverUser";
import Select from "react-select";
import {SupportStatus} from "../../../../helper/enums/SupportStatus";

const SupportTicketDetails = () => {
    const error = useContext(ErrorContext);
    const {supportId} = useParams();
    const [support, SetSupport] = useState({})
    const [Messages, SetMessages] = useState([])
    const [answer, SetAnswer] = useState("")
    const [isLastMessage, SetIsLastMessage] = useState(false)
    const [sending, setSending] = useState(false);
    useEffect(() => {
        getSupportDetail()
    }, []);

    function getSupportDetail() {
        Support_getById({id: supportId}).then(result => {
            SetSupport(result.data.Data);
            SetMessages(result.data.Data.Messages.reverse())
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function SendAnswer() {
        if (!answer || answer == "" || sending) {
            error.showError({message: "پیام وارد نشده",});
            return;
        }
        setSending(true);
        Support_addMessage({
            "SupportId": support.Id,
            "Status": isLastMessage ? "COMPLETE" : "AWAITING_USER",
            "Message": answer,
            "IsRead": false,
            "IsAnswer": true
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            getSupportDetail()
            SetIsLastMessage(false)
            SetAnswer("")
            setSending(false);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

    }


    function getStatusOptions() {

        return Object.keys(SupportStatus).map(item => {
            return {label: SupportStatus[item], value: item}
        })

    }

    function setStatusOptions(value) {
        Support_update({...support,Status:value})
            .then(result => {
                error.showError({message: "عملیات موفق",});
                getSupportDetail()
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>کرامت کاربر برای ما اولویت است </p>
            </Notice>

            <Portlet>
                <PortletHeader title="مشخصات تیکت"/>

                <PortletBody>
                    <Grid container spacing={2}>
                        <Grid size={6}>

                            <Card variant={"outlined"} sx={{borderRadius: 3, p: 2}}>
                                <Typography variant={"h5"}>{"موضوع : "}<small>{support.Title}</small></Typography>
                                <Typography sx={{display: "flex"}}
                                            variant={"h5"}>{"ایجاد کننده : "}<PopoverUser user={support.CreatorUser}/></Typography>
                                {support.Place && <Typography
                                    variant={"h5"}>{"مربوط به : "}<small>{"مجموعه " + support.Place.Name}</small></Typography>}
                                {support.Corporate && <Typography
                                    variant={"h5"}>{"مربوط به : "}<small>{"سازمان " + support.Corporate.Name}</small></Typography>}
                                <Typography
                                    variant={"h5"}>{"تاریخ ایجاد : "}<small>{new Date(support.CreatedDate).toLocaleDateString('fa-IR')}</small></Typography>
                                <Typography
                                    variant={"h5"}>{"ساعت ایجاد : "}<small>{new Date(support.CreatedDate).toLocaleTimeString()}</small></Typography>
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card variant={"outlined"} sx={{borderRadius: 3, p: 2}}>
                                <Form.Group>
                                    <Form.Label>وضعیت</Form.Label>
                                    <Select
                                        className={"dropdown"}
                                        name="formStatus"
                                        value={
                                            getStatusOptions()?.filter(option =>
                                                option.value === support?.Status)
                                        }
                                        options={getStatusOptions()}
                                        onChange={(e) => setStatusOptions(e.value)}
                                        defaultValue={"dropdown-menu"}
                                        menuPortalTarget={document.body}
                                    />
                                </Form.Group>

                            </Card>
                        </Grid>
                    </Grid>
                </PortletBody>
            </Portlet>


            <Portlet>
                <PortletHeader title="پاسخ به مشتری"/>

                <PortletBody>

                    <TextField
                        label="پاسخ"
                        multiline
                        rows="4"
                        onChange={e => SetAnswer(e.target.value)}
                        value={answer}
                        className="textField"
                        margin="normal"
                        variant="outlined"
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={isLastMessage}/>} onChange={(e) => SetIsLastMessage(e.target.checked)}
                                          label="با این پیام مکالمه به پایان میرسد"/>
                    </FormGroup>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm "
                        onClick={() => SendAnswer()}
                        disabled={sending}
                    >
                        ارسال
                    </button>
                </PortletBody>
            </Portlet>

            <Portlet>
                <PortletHeader title="گفتگو"/>

                <PortletBody>

                    <List>
                        {Messages.map(item => (

                            item.IsAnswer ?
                                (<Row><Alert key={item.Id} variant={"info"} className={"m-2  d-block"}>
                                    <Typography variant={"h6"} component={"p"}>{item.Message}</Typography>


                                    <Typography
                                        variant={"caption"}
                                        component={"p"}>{getUserFixedName(item.CreatorUser) + " - " + new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</Typography>
                                </Alert></Row>)
                                :
                                (<Row className={"ltr"}><Alert key={item.Id} variant={"warning"} className={"m-2 d-block "}>
                                    <Typography variant={"h6"} component={"p"}>{item.Message}</Typography>
                                    <Typography
                                        variant={"caption"}
                                        component={"p"}>{getUserFixedName(item.CreatorUser) + " - " + new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</Typography>
                                </Alert></Row>)
                        ))}
                    </List>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default SupportTicketDetails;
