import React from 'react'
import Layout from '../../layouts/Layout'
import ServiceBreadcrumb from '../../components/Service/ServiceBreadcrumb'
import ServiceFeature from '../../components/Service/ServiceFeature'
import ServiceSection from '../../components/Service/ServiceSection'
import ServiceBrand from '../../components/Service/ServiceBrand'
import ServiceWorkingProgres from '../../components/Service/ServiceWorkingProgres'
import ServicePricing from '../../components/Service/ServicePricing'
import ServiceStrategy from '../../components/Service/ServiceStrategy'
export default function Service() {
    return (
        <>
            <Layout>
                <ServiceBreadcrumb />
                <ServiceFeature/>
                <ServiceSection/>
                <ServiceBrand/>
                <ServiceWorkingProgres/>
                <ServiceStrategy/>
                <ServicePricing/>
            </Layout>
        </>
    )
}
