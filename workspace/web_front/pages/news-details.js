import React from 'react'
import NewsDetailsArea from '../components/NewsDetails/NewsDetailsArea'
import NewsDetailsBreadcrumb from '../components/NewsDetails/NewsDetailsBreadcrumb'
import Layout1 from '../layouts/Layout1'

export default function NewsDetails() {
    return (
        <>
            <Layout1>
                <NewsDetailsBreadcrumb />
                <NewsDetailsArea />
            </Layout1>
        </>
    )
}
