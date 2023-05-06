import React, {useCallback, useEffect, useState} from 'react'
import VideoPopUp from '../Plugins/VideoPopup'
import {GoogleReCaptcha, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import getBaseUrl from "../../pages/api/network";

export default function HomeTwoVideo() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify= useCallback(async (e) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha();
        handleVerify(token,e)
    }, [executeRecaptcha]);

    function submitForm(value) {
        value.preventDefault();
        handleReCaptchaVerify(value);
        // console.log("form value:", value);
    }
    function handleVerify(value,e) {
        if(value){
            requestRegisterAdvise(e)
        }
    }


    const requestRegisterAdvise = async (e) => {
        if(!e.target.Name.value){
            alert("نام نباید خالی باشد");
            return;
        }
        if(!e.target.Tel.value){
            alert("تلفن نباید خالی باشد");
            return;
        }
        if(!e.target.Message.value){
            alert("پیام نباید خالی باشد");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                PhoneNumber: e.target.Tel.value,
                fullName: e.target.Name.value,
                placeName: e.target.Message.value
            })
        };
        await fetch(getBaseUrl()+"/v1/account/requestRegisterAdvise", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("پیام شما ثبت شد به زودی با شما تماس خواهیم گرفت .")
                e.target.Tel.value = "";
                e.target.Name.value = "";
                e.target.Message.value = "";
            }).catch(e=>{
                alert("خطا")
            })
    }
    return (
        <>
            {/* <!-- video area start --> */}
            <section className="video-area" id="corporate-contact">
                <div className={"mt-110 mb-80"}>
                    <div className="container-fluid">
                        <div className="row no-gutters">
                            <div className="col-xl-8 ">
                                <div className="video__bg bg_img"
                                     style={{"background": "url(/images/bg/quotebg-1.jpeg)"}} data-overlay="dark"
                                     data-opacity="34">
                                    <div className="video-container-wrap">
                                        <div
                                           data-rel="lightcase:myCollection" data-animation="fadeInLeft"
                                           data-delay=".1s"
                                           className="video-link pointer">
                                            <div className="video-play-wrap">
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
                                <div className="quote-wrapper">
                                    <h2 className="quote-title">مشاوره رایگان</h2>
                                    <div className="quote-form rtl">
                                        <form onSubmit={submitForm} className="mt-none-15">
                                            <div className="form-group mt-15">
                                                <input type="text" name="Name" id="name" placeholder="نام"/>
                                            </div>
                                            <div className="form-group mt-15">
                                                <input type="tel" name="Tel" id="tel" placeholder="تلفن"/>
                                            </div>
                                            <div className="form-group mt-15">
                                                <textarea name="Message" id="message" placeholder="پیام"/>
                                            </div>
                                            <div className="form-group mt-15">
                                                <button type="submit" className="quote-btn"> ارسال
                                                    <span className="icon"><i
                                                        className="far fa-arrow-left"/></span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- video area end -->    */}
        </>
    )
}
