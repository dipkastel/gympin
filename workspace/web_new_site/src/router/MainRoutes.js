import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Terms from "../pages/terms/Terms.js";
import Index from "../pages/index/Index.js";
import Corporate from "../pages/corporate/Corporate.js";
import Contact from "../pages/contact/Contact.js";
import About from "../pages/about/About.js";
import Faq from "../pages/faq/Faq.js";
import Blog from "../pages/blog/Blog.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import BlogDetail from "../pages/blog-detail/BlogDetail.js";
import _Loading from "../pages/partials/_Loading.js";
import {Collapse} from "@mui/material";
import PageNotFound from "../pages/other/PageNotFound.js";
import Redirect from "../pages/Redirect/Redirect.js";

export const MainRoutes = () => {

    const [pageStatus,setPageStatus] = useState("NotLoaded")
    useEffect(() => {
        const onPageLoad = () => {
            setPageStatus('Loaded');
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    return (
        <>
            <Collapse sx={{m:0,p:0}} in={pageStatus!=="Loaded"}><_Loading /></Collapse>
            <Header/>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/blog-detail/:Cid/:slug" element={<BlogDetail />}/>
                <Route path="/corporate" element={<Corporate/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/term-and-conditions" element={<Terms/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/r/:code" element={<Redirect/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
            <Footer/>
        </>
    );
};
