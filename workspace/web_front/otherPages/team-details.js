import React from 'react'
import TeamDetailsBreadcrumb from '../components/TeamDetails/TeamDetailsBreadcrumb'
import TeamDetailsContent from '../components/TeamDetails/TeamDetailsContent'
import Layout from '../layouts/Layout'

export default function TeamDetails() {
    return (
        <>
            <Layout>
                <TeamDetailsBreadcrumb />
                <TeamDetailsContent />
            </Layout>
        </>
    )
}
