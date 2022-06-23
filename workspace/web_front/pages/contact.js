import React from 'react'
import ContactBreadcrumb from '../components/Contact/ContactBreadcrumb'
import ContactGTA from '../components/Contact/ContactGTA'
import ContactInfo from '../components/Contact/ContactInfo'
import ContactMap from '../components/Contact/ContactMap'
import Layout1 from '../layouts/Layout1'

export default function Contact() {
    return (
        <>
            <Layout1>
                <ContactBreadcrumb/>
                <ContactInfo/>
                <ContactGTA/>
                <ContactMap/>
            </Layout1>
        </>
    )
}
