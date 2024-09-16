import React, {useCallback, useState} from 'react'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import getBaseUrl from "../../pages/api/network";


export default function TeamGTA() {
    const pageStates = {CL: 0, LO: 1, TX: 2}
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [formStatus, setFormStatus] = useState(pageStates.CL);

    const handleReCaptchaVerify = useCallback(async (e) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha();
        handleVerify(token, e)
    }, [executeRecaptcha]);


    function submitForm(value) {
        value.preventDefault();
        setFormStatus(pageStates.LO);
        handleReCaptchaVerify(value);
        // console.log("form value:", value);
    }


    function handleVerify(value, e) {
        if (value) {
            requestRegisterAdvise(e)
        } else {
            setFormStatus(pageStates.CL);
        }
    }


    const requestRegisterAdvise = async (e) => {
        if (!e.target.Name.value) {
            alert("نام نباید خالی باشد");
            setFormStatus(pageStates.CL);
            return;
        }
        if (!e.target.Tel.value) {
            alert("تلفن نباید خالی باشد");
            setFormStatus(pageStates.CL);
            return;
        }
        if (!e.target.Message.value) {
            alert("پیام نباید خالی باشد");
            setFormStatus(pageStates.CL);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                PhoneNumber: e.target.Tel.value,
                FullName: e.target.Name.value,
                Text: e.target.Message.value
            })
        };
        await fetch(getBaseUrl() + "/v1/account/requestRegisterPlace", requestOptions)
            .then(response => response.json())
            .then(result => {
                setFormStatus(pageStates.TX);
                e.target.Tel.value = "";
                e.target.Name.value = "";
                e.target.Message.value = "";
            }).catch(e => {
                setFormStatus(pageStates.CL);
            })
    }

    function renderFormClear() {
        return (<>
            <section id={"contact"} className="gta-area pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="gta-bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/sp/sp-circle.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50">
                                <h2 className="section-title section-title__2">درخواست عضویت</h2>
                            </div>
                            <div className="contact-form">
                                <form action="#" method="POST" id="contact-form" onSubmit={submitForm}>
                                    <div className="form-group mt-25">
                                        <input type="text" name="Name" id="name" placeholder="نام و نام خانوادگی"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <input type={"number"} name="Tel" id="mobile" placeholder="شماره همراه"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <textarea name="Message" id="message"
                                                  placeholder="نام مجموعه و توضیحات بیشتر"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__s2 mt-15"><span
                                        className="icon icon__black"><i
                                        className="far fa-arrow-left"></i></span> ثبت
                                    </button>
                                    <p className="ajax-response"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>);
    }

    function renderFormTnx() {
        return (

            <section id={"contact"} className="gta-area pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="gta-bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/sp/sp-circle.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50 rtl">
                                <div className="alert alert-success" role="alert">
                                    کارشناسان ما به زودی با شما تماس خواهند گرفت.
                                    <br/>
                                    با تشکر
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    function renderFormLoding() {
        return (
            <section id={"contact"} className="gta-area pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="gta-bg" data-tilt data-tilt-perspective="3000">
                                <img src="/images/sp/sp-circle.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-70">
                            <div className="section-header mb-50">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">صبر کنید</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>);
    }

    function renderFormState() {
        switch (formStatus) {
            case pageStates.CL:
                return renderFormClear();
            case pageStates.TX:
                return renderFormTnx();
            case pageStates.LO:
                return renderFormLoding();
        }
    }


    return renderFormState();
}
