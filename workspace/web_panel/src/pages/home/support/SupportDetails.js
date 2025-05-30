import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import {Support_addMessage, Support_getById} from "../../../network/api/support.api";
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {Checkbox, FormControlLabel, FormGroup, List, TextField, Typography} from "@mui/material";
import {Alert} from "react-bootstrap";
import {Row} from "reactstrap";
import {getUserFixedName} from "../../../helper";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const SupportDetails = () => {
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


    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>کرامت مشتری برای ما اولویت است </p>
                <p>مشتری فقط وقتی تیکت می زند که عصبانی یا دلسرد است پس در پاسخ به مشتری نکات زیر را رعایت کنید</p>
                <p>ادب ما در پاسخ باید مشتری را آرام کند</p>
                <p>توهین یا تیکه انداختن به مشتری هیچ توجیهی ندارد</p>
            </Notice>

            <Portlet>
                <PortletHeader title="مشخصات تیکت"/>

                <PortletBody>
                    <Typography variant={"h5"}>{"موضوع : "}<small>{support.Title}</small></Typography>
                    <Typography
                        variant={"h5"}>{"ایجاد کننده : "}<small>{getUserFixedName(support.CreatorUser)}</small></Typography>
                    {support.Place && <Typography
                        variant={"h5"}>{"مربوط به : "}<small>{"مجموعه " + support.Place.Name}</small></Typography>}
                    {support.Corporate && <Typography
                        variant={"h5"}>{"مربوط به : "}<small>{"سازمان " + support.Corporate.Name}</small></Typography>}
                    <Typography
                        variant={"h5"}>{"تاریخ ایجاد : "}<small>{new Date(support.CreatedDate).toLocaleDateString('fa-IR')}</small></Typography>
                    <Typography
                        variant={"h5"}>{"ساعت ایجاد : "}<small>{new Date(support.CreatedDate).toLocaleTimeString()}</small></Typography>
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

export default SupportDetails;
