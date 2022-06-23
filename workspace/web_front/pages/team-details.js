import React from 'react'
import TeamDetailsBreadcrumb from '../components/TeamDetails/TeamDetailsBreadcrumb'
import TeamDetailsContent from '../components/TeamDetails/TeamDetailsContent'
import Layout1 from '../layouts/Layout1'

export default function TeamDetails() {
    return (
        <>
            <Layout1>
                <TeamDetailsBreadcrumb />
                <TeamDetailsContent />
            </Layout1>
        </>
    )
}
