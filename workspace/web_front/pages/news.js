import React from 'react'
import NewsArea from '../components/News/NewsArea'
import NewsBreadcrumb from '../components/News/NewsBreadcrumb'
import Layout from '../layouts/Layout'

export default function News() {
    return (
        <>
         <Layout>
             <NewsBreadcrumb/>
             <NewsArea/>
             </Layout>
        </>
    )
}