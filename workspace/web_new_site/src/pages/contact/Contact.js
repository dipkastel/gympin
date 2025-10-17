import React from 'react';
import _PageTitle from "../partials/_PageTitle.js";
import _ContactData from "./_ContactData.js";
import _ContactUs from "./_ContactUs.js";

const Contact = () => {
    return (
        <>
            <_PageTitle title={"تماس با ما"} subtitle={"سلامتی را به سازمان خود هدیه دهید"} />
            <_ContactData />
            <_ContactUs />
        </>
    );
};

export default Contact;
