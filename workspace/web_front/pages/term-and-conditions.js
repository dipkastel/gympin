import React from 'react'
import PrivacyBreadcrumb from '../components/PrivacyPolicy/PrivacyBreadcrumb'
import PrivacySection from '../components/PrivacyPolicy/PrivacySection'
import Layout from "../layouts/Layout";

export default function PrivacyPolicy() {
    return (
        <>
            <Layout>
                <PrivacyBreadcrumb/>
                <PrivacySection/>
            </Layout>
        </>
    )
}
