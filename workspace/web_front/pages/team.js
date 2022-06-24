import React from 'react'
import Layout from '../layouts/Layout'
import TeamBreadcrumb from '../components/Team/TeamBreadcrumb'
import TeamGTA from '../components/Team/TeamGTA'
import TeamSection from '../components/Team/TeamSection'
import TeamVideo from '../components/Team/TeamVideo'

export default function Team() {
    return (
        <>
            <Layout>
                <TeamBreadcrumb />
                <TeamSection />
                <TeamVideo />
                <TeamGTA />
            </Layout>
        </>
    )
}
