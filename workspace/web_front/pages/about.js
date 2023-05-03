import React from 'react'
import PrivacyBreadcrumb from '../components/PrivacyPolicy/PrivacyBreadcrumb'
import AboutSection from '../components/About/AboutSection'
import Layout from "../layouts/Layout";
import AboutBreadcrumb from "../components/About/AboutBreadcrumb";

export default function About() {
    return (
        <>
            <Layout>
                <AboutBreadcrumb/>
                <AboutSection/>
            </Layout>
        </>
    )
}
