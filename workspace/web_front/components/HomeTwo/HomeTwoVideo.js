import React, {useCallback, useRef, useState} from 'react'
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import getBaseUrl from "../../pages/api/network";


export default function HomeTwoVideo() {

    const pageStates = {CL: 0, LO: 1, TX: 2}
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [formStatus, setFormStatus] = useState(pageStates.CL);
    const video = useRef(null)
    const videoPlaceHolder = useRef(null)

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
        }else{
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
        await fetch(getBaseUrl() + "/v1/account/requestRegisterAdvise", requestOptions)
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

    function playVideo(e) {
        console.log(video);
        video.current.removeAttribute("hidden");
        videoPlaceHolder.current.setAttribute("hidden", true);
        video.current.play();
    }

    function renderFormClear() {
        return (<>

            <div className="quote-wrapper">
                <h2 className="quote-title">مشاوره رایگان</h2>
                <div className="quote-form rtl">
                    <form onSubmit={submitForm} className="mt-none-30">
                        <div className="form-group mt-10">
                            <input type="text" name="Name" id="name" placeholder="نام"/>
                        </div>
                        <div className="form-group mt-10">
                            <input type={"number"} name="Tel" id="tel" placeholder="تلفن"/>
                        </div>
                        <div className="form-group mt-10">
                            <textarea name="Message" id="message" placeholder="پیام"/>
                        </div>
                        <div className="form-group mt-10">
                            <button type="submit" className="quote-btn"> ارسال
                                <span className="icon"><i
                                    className="far fa-arrow-left"/></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>);
    }

    function renderFormTnx() {
        return (
            <div className="quote-wrapper">
                <h2 className="quote-title">همکاران ما به زودی با شما تماس خواهند گرفت </h2>
                <h4 className="quote-form">با تشکر</h4>
            </div>);
    }

    function renderFormLoding() {
        return (<div className="quote-wrapper">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);
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

    return (
        <>
            {/* <!-- video area start --> */}
            <section className="video-area" id="corporate-contact">
                <div className={"mt-110 mb-80"}>
                    <div className="container-fluid">
                        <div className="row no-gutters">
                            <div className="col-xl-8 ">
                                <video ref={video} height={"100%"} width={"100%"} hidden={true} type="video/mp4"
                                       controls>
                                    <source src="/videos/gympin-c-5.mp4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                                <div ref={videoPlaceHolder} className="video__bg bg_img"
                                     style={{"background": "url(/images/bg/quotebg-1.jpeg)"}} data-overlay="dark"
                                     data-opacity="34">
                                    <div className="video-container-wrap">
                                        <div
                                            data-rel="lightcase:myCollection" data-animation="fadeInLeft"
                                            data-delay=".1s"
                                            className="video-link pointer">
                                            <div className="video-play-wrap" onClick={e => playVideo(e)}>
                                                <div className="video-mark">
                                                    <div className="wave-pulse wave-pulse-1"></div>
                                                    <div className="wave-pulse wave-pulse-2"></div>
                                                </div>
                                                <div className="video-play">
                                                    <i className="fa fa-play"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                {renderFormState()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- video area end -->    */}
        </>
    )
}
