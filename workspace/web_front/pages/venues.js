import React from 'react'
import VenuesArea from '../components/Venues/VenuesArea'
import VenuesBreadcrumb from '../components/Venues/VenuesBreadcrumb'
import Layout from '../layouts/Layout'

export default function NewsDetails() {
    return (
        <>
            <Layout>
                <VenuesBreadcrumb />
                <VenuesArea />
            </Layout>
        </>
    )
}
