import React from 'react';
import _Introduction from "./_Introduction";
import _RedAdditionalData from "./_RedAdditionalData";
import _ExcitingTexts from "./_ExcitingTexts";
import _OurGoals from "./_OurGoals";
import _Apps from "./_Apps";
import _Faq from "./_Faq";
import _Sports from "./_Sports";
import _Contact from "./_Contact";
import _video from "../corporate/_Video";
import _Values2 from "./_Values2";
import _Slider from "./_Slider";
import _Companies from "./_Companies";

const Index = () => {
    return (
        <>
            <_Slider />
            <_Introduction/>
            <_ExcitingTexts/>
            <_RedAdditionalData/>
            <_Companies/>
            <_video />
            <_Values2/>
            {/*<_Values/>*/}
            <_OurGoals/>
            <_Apps/>
            {/*<_Experiences />*/}
            <_Sports/>
            <_Faq/>
            <_Contact/>
        </>
    );
};

export default Index;
