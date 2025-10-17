import React from 'react';
import _PageTitle from "../partials/_PageTitle.js";
import _FaqList from "./_FaqList.js";

const Faq = () => {
    return (
        <>
            <_PageTitle title={"سوالات متداول"} subtitle={"پرسش و پاسخ‌های رایج دسته بندی شده"} />
            <_FaqList />
        </>
    );
};

export default Faq;
