import React from 'react'
import ProjectBrand from '../../components/Project/ProjectBrand'
import ProjectBreadcrumb from '../../components/Project/ProjectBreadcrumb'
import ProjectCTA from '../../components/Project/ProjectCTA'
import ProjectSection from '../../components/Project/ProjectSection'
import Layout from '../../layouts/Layout'

export default function Project() {
    return (
        <>
            <Layout>
                <ProjectBreadcrumb />
                <ProjectSection />
                <ProjectBrand />
                <ProjectCTA />
            </Layout>
        </>
    )
}
