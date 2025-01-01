import React from 'react';
import _PageTitleWhite from "../partials/_PageTitleWhite";
import _BlogContents from "./_BlogContents";

const Blog = () => {
    return (
        <>
            <_PageTitleWhite title={"وبلاگ"} subtitle={"درجریان آخرین اخبار و مطالب جیم پین باشید"}/>
            <_BlogContents/>
        </>
    );
};

export default Blog;
