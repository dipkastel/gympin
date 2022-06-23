import React from 'react'
import Layout1 from '../layouts/Layout1'
import ServiceDetailBreadcrumb from '../components/ServiceDetails/ServiceDetailBreadcrumb'
import ServiceDetailsContent from '../components/ServiceDetails/ServiceDetailsContent'

export default function ServiceDetails() {
    return (
        <>
            <Layout1>
                <ServiceDetailBreadcrumb />
                <ServiceDetailsContent />
            </Layout1>
        </>
    )
}
