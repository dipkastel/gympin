import React from 'react'
import ContactBreadcrumb from '../components/Contact/ContactBreadcrumb'
import ContactGTA from '../components/Contact/ContactGTA'
import ContactInfo from '../components/Contact/ContactInfo'
import ContactMap from '../components/Contact/ContactMap'
import Layout from '../layouts/Layout'

export default function Contact() {
    return (
        <>
            <Layout>
                <ContactBreadcrumb/>
                <ContactInfo/>
                <ContactGTA/>
                <ContactMap/>
            </Layout>
        </>
    )
}
