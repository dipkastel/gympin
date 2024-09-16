import React from 'react'
import Layout from '../../layouts/Layout'
import ServiceDetailBreadcrumb from '../../components/ServiceDetails/ServiceDetailBreadcrumb'
import ServiceDetailsContent from '../../components/ServiceDetails/ServiceDetailsContent'

export default function ServiceDetails() {
    return (
        <>
            <Layout>
                <ServiceDetailBreadcrumb />
                <ServiceDetailsContent />
            </Layout>
        </>
    )
}
