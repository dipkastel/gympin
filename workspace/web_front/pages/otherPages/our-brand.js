import React from 'react'
import AboutBrand from '../../components/About/AboutBrand'
import AboutBreadcrumb from '../../components/About/AboutBreadcrumb'
import AboutCounter from '../../components/About/AboutCounter'
import AboutSection from '../../components/About/AboutSection'
import AboutTeam from '../../components/About/AboutTeam'
import HomeOneTestimonial2 from '../../components/HomeOne/HomeOneTestimonial2'
import AboutVideo from '../../components/About/AboutVideo'
import AboutWCU from '../../components/About/AboutWCU'
import Layout from '../../layouts/Layout'

export default function OurBrand() {
    return (
        <Layout>
            <AboutBreadcrumb/>
            <AboutSection/>
            <AboutVideo/>
            <AboutCounter/>
            <AboutWCU/>
            <HomeOneTestimonial2/>
            <AboutTeam/>
            <AboutBrand/>
        </Layout>
    )
}
