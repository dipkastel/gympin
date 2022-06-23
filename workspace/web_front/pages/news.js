import React from 'react'
import NewsArea from '../components/News/NewsArea'
import NewsBreadcrumb from '../components/News/NewsBreadcrumb'
import Layout1 from '../layouts/Layout1'

export default function News() {
    return (
        <>
         <Layout1>
             <NewsBreadcrumb/>
             <NewsArea/>
             </Layout1>   
        </>
    )
}
