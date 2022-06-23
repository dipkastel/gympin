import React from 'react'
import Layout1 from '../layouts/Layout1'
import ProjectDetailsBreadCrumb from '../components/ProjectDetails/ProjectDetailsBreadCrumb'
import ProjectDetailsArea from '../components/ProjectDetails/ProjectDetailsArea'

export default function ProjectDetails() {
    return (
        <>
            <Layout1>
                <ProjectDetailsBreadCrumb />
                <ProjectDetailsArea />
            </Layout1>
        </>
    )
}
