import React from 'react'
import ProjectBrand from '../components/Project/ProjectBrand'
import ProjectBreadcrumb from '../components/Project/ProjectBreadcrumb'
import ProjectCTA from '../components/Project/ProjectCTA'
import ProjectSection from '../components/Project/ProjectSection'
import Layout1 from '../layouts/Layout1'

export default function Project() {
    return (
        <>
            <Layout1>
                <ProjectBreadcrumb />
                <ProjectSection />
                <ProjectBrand />
                <ProjectCTA />
            </Layout1>
        </>
    )
}
