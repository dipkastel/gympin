import React from 'react'
import EventsArea from '../components/Events/EventsArea'
import EventsBreadcrumb from '../components/Events/EventsBreadcrumb'
import Layout from '../layouts/Layout'

export default function NewsDetails() {
    return (
        <>
            <Layout>
                <EventsBreadcrumb />
                <EventsArea />
            </Layout>
        </>
    )
}
