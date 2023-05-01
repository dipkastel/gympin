import React, {useEffect, useState} from 'react'
import BlogDetailsArea from '../components/BlogDetails/BlogDetailsArea'
import BlogDetailsBreadcrumb from '../components/BlogDetails/BlogDetailsBreadcrumb'
import Layout from '../layouts/Layout'
import { useRouter } from 'next/router'
import getBaseUrl from "./api/network";

export default function BlogDetails() {

    const router = useRouter()
    const { id } = router.query

    const [blogpost, setBlogpost] = useState(null)

    useEffect(() => {
        if(id)
            getPost(id);
    }, [id]);

    const getPost = async (id) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        await fetch(getBaseUrl()+"/v1/article/getById?id="+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setBlogpost(result.Data);
                console.log(result.Data)
            })
    }




    return (
        <>
            <Layout>
                {blogpost&&<BlogDetailsBreadcrumb blogpost={blogpost} />}
                {blogpost&&<BlogDetailsArea blogpost={blogpost} />}
            </Layout>
        </>
    )
}
