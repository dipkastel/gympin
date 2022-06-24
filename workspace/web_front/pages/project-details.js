import React from 'react'
import Layout from '../layouts/Layout'
import ProjectDetailsBreadCrumb from '../components/ProjectDetails/ProjectDetailsBreadCrumb'
import ProjectDetailsArea from '../components/ProjectDetails/ProjectDetailsArea'

export default function ProjectDetails() {
    return (
        <>
            <Layout>
                <ProjectDetailsBreadCrumb />
                <ProjectDetailsArea />
            </Layout>
        </>
    )
}
