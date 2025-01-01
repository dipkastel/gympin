import React from 'react';
import _PageTitle from "../partials/_PageTitle";
import _ContactData from "./_ContactData";
import _ContactForm from "./_ContactForm";

const Contact = () => {
    return (
        <>
            <_PageTitle title={"تماس با ما"} subtitle={"سلامتی را به سازمان خود هدیه دهید"} />
            <_ContactData />
            <_ContactForm />
        </>
    );
};

export default Contact;
