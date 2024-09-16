import React from 'react'
import PricingBreadcrumb from '../../components/Pricing/PricingBreadcrumb'
import PricingSection from '../../components/Pricing/PricingSection'
import Layout from '../../layouts/Layout'

export default function Pricing() {
    return (
        <>
            <Layout>
                <PricingBreadcrumb />
                <PricingSection />
            </Layout>
        </>
    )
}
