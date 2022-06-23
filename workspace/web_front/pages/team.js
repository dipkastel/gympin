import React from 'react'
import Layout1 from '../layouts/Layout1'
import TeamBreadcrumb from '../components/Team/TeamBreadcrumb'
import TeamGTA from '../components/Team/TeamGTA'
import TeamSection from '../components/Team/TeamSection'
import TeamVideo from '../components/Team/TeamVideo'

export default function Team() {
    return (
        <>
            <Layout1>
                <TeamBreadcrumb />
                <TeamSection />
                <TeamVideo />
                <TeamGTA />
            </Layout1>
        </>
    )
}
