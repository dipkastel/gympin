import React, {useCallback} from 'react'
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import getBaseUrl from "../../pages/api/network";

export default function ContactGTA() {
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
        if(!e.target.name.value){
            alert("نام نباید خالی باشد");
            return;
        }
        if(!e.target.tel.value){
            alert("تلفن نباید خالی باشد");
            return;
        }
        if(!e.target.message.value){
            alert("پیام نباید خالی باشد");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                PhoneNumber: e.target.tel.value,
                FullName: e.target.name.value,
                Text: e.target.message.value
            })
        };
        await fetch(getBaseUrl()+"/v1/account/requestPublicMessage", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("پیام شما ثبت شد همکاران ما در صورت نیاز با شما در تماس خواهند بود .")
                e.target.tel.value = "";
                e.target.name.value = "";
                e.target.message.value = "";
            }).catch(e=>{
                alert("خطا")
            })
    }

    return (
        <>
            {/* <!-- gta section start --> */}
            <section className="gta-area gta-area__2 pt-125 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">

                        </div>
                        <div className="col-xl-6 pl-50">
                            <div className="section-header mb-50">
                                <h2 className="section-title section-title__2">پیامی بگذارید</h2>
                            </div>
                            <div className="contact-form">
                                <form onSubmit={submitForm} method="POST" id="contact-form">
                                    <div className="form-group mt-25">
                                        <input className={"rtl"} type="text" name="name" id="name" placeholder="نام"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <input  className={"rtl"} type="tel" name="tel" id="tel" placeholder="تلفن"/>
                                    </div>
                                    <div className="form-group mt-25">
                                        <textarea  className={"rtl"} name="message" id="message" placeholder="پیام"></textarea>
                                    </div>
                                    <button type="submit" className="site-btn site-btn__2 mt-15"><span className="icon icon__black"><i
                                        className="far fa-arrow-left"></i></span> ارسال</button>
                                    <p className="ajax-response"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- gta section end -->    */}
        </>
    )
}
