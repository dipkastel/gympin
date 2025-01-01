import React from 'react';
import _PageTitle from "../partials/_PageTitle";
import _FaqList from "./_FaqList";

const Faq = () => {
    return (
        <>
            <_PageTitle title={"سوالات متداول"} subtitle={"پرسش و پاسخ های رایج دسته بندی شده"} />
            <_FaqList />
        </>
    );
};

export default Faq;
