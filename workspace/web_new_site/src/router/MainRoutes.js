import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Terms from "../pages/terms/Terms";
import Index from "../pages/index/Index";
import Corporate from "../pages/corporate/Corporate";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Faq from "../pages/faq/Faq";
import Blog from "../pages/blog/Blog";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogDetail from "../pages/blog-detail/BlogDetail";
import _Loading from "../pages/partials/_Loading";
import {Collapse} from "@mui/material";
import PageNotFound from "../pages/other/PageNotFound";
import Redirect from "../pages/Redirect/Redirect";

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
