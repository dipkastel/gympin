import React from 'react'
import NewsDetailsArea from '../components/NewsDetails/NewsDetailsArea'
import NewsDetailsBreadcrumb from '../components/NewsDetails/NewsDetailsBreadcrumb'
import Layout from '../layouts/Layout'

export default function NewsDetails() {
    return (
        <>
            <Layout>
                <NewsDetailsBreadcrumb />
                <NewsDetailsArea />
            </Layout>
        </>
    )
}
