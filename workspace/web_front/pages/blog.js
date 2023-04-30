import React, {useEffect, useState} from 'react'
import BlogArea from '../components/Blog/BlogArea'
import BlogBreadcrumb from '../components/Blog/BlogBreadcrumb'
import Layout from '../layouts/Layout'

export default function blog() {

    const [blogs, setBlogs] = useState([])
    const [selectedPage, setSelectedPage] = useState(0)
    useEffect(() => {
        getPosts(selectedPage);
    }, [selectedPage]);

    const getPosts = async (page) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "queryType": "SEARCH",
                "paging": {
                    "Page": page,
                    "Size": 10,
                    "Desc": true
                }
            })
        };
        await fetch("http://localhost:8080/api/v1/article/query", requestOptions)
            .then(response => response.json())
            .then(result => {
                setBlogs(result.Data);
                console.log(result.Data)
            })
    }

    return (
        <>
            <Layout>
                <BlogBreadcrumb/>
                <BlogArea blogs={blogs} selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            </Layout>
        </>
    )
}
