import React from 'react';
import _Introduction from "./_Introduction";
import _RedAdditionalData from "./_RedAdditionalData";
import _ExcitingTexts from "./_ExcitingTexts";
import _OurGoals from "./_OurGoals";
import _Apps from "./_Apps";
import _Faq from "./_Faq";
import _Sports from "./_Sports";
import _Contact from "./_Contact";
import _Values from "./_Values";
import _Experiences from "./_Experiences";

const Index = () => {
    return (
        <>
            <_Introduction/>
            <_ExcitingTexts/>
            <_RedAdditionalData/>
            <_Values/>
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
