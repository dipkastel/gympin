import React from 'react'
import PricingBreadcrumb from '../components/Pricing/PricingBreadcrumb'
import PricingSection from '../components/Pricing/PricingSection'
import Layout1 from '../layouts/Layout1'

export default function Pricing() {
    return (
        <>
            <Layout1>
                <PricingBreadcrumb />
                <PricingSection />
            </Layout1>
        </>
    )
}
