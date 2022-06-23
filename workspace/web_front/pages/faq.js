import React from 'react'
import FAQBreadcrumb from '../components/FAQ/FAQBreadcrumb'
import FAQArea from '../components/FAQ/FAQArea'
import FAQGTA from '../components/FAQ/FAQGTA'
import Layout1 from '../layouts/Layout1'

export default function FAQ() {
    return (
        <>
            <Layout1>
                <FAQBreadcrumb />
                <FAQArea />
                <FAQGTA />
            </Layout1>
        </>
    )
}
