import React, {useEffect} from 'react';
import _Introduction from "./_Introduction.js";
import _RedAdditionalData from "./_RedAdditionalData.js";
import _ExcitingTexts from "./_ExcitingTexts.js";
import _OurGoals from "./_OurGoals.js";
import _Apps from "./_Apps.js";
import _Faq from "./_Faq.js";
import _Sports from "./_Sports.js";
import _Contact from "./_Contact.js";
import _video from "../corporate/_Video.js";
import _Values2 from "./_Values2.js";
import _Slider from "./_Slider.js";
import _Companies from "./_Companies.js";
import _CorporateForm from "../corporate/_CorporateForm.js";
import _Boxes from "../corporate/_Boxes.js";
import AOS from "aos";
import "aos/dist/aos.css";
import _TextBox from "./_TextBox.js";

const Index = () => {

    useEffect(() => {
        AOS.init({
            delay:500,
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <>
            <_Slider />
            <_Introduction/>
            <_ExcitingTexts/>
            <_RedAdditionalData/>
            <_Companies/>
            <_video />
            <_TextBox />
            <_Boxes />
            <_Values2/>
            <_OurGoals/>
            <_CorporateForm />
            <_Apps/>
            <_Sports/>
            <_Faq/>
            <_Contact/>
        </>
    );
};

export default Index;
