import React from 'react'
import FAQBreadcrumb from '../components/FAQ/FAQBreadcrumb'
import FAQArea from '../components/FAQ/FAQArea'
import FAQGTA from '../components/FAQ/FAQGTA'
import Layout from '../layouts/Layout'

export default function FAQ() {
    return (
        <>
            <Layout>
                <FAQBreadcrumb />
                <FAQArea />
            </Layout>
        </>
    )
}
