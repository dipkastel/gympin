import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Button, Card, CardActionArea, Container, InputBase, Pagination, Paper, Typography} from "@mui/material";
import {Search} from '@mui/icons-material';
import {Article_query} from "../../network/api/article.api";

const _BlogContents = () => {

    const [Blogs, setBlogs] = useState([])
    const [selectedPage, setSelectedPage] = useState(0)

    useEffect(() => {
        getPosts(selectedPage);
    }, [selectedPage]);




    function getPosts(page) {
        Article_query({
            "queryType": "FILTER",
            "Status": "PUBLISHED",
            "paging": {
                "Page": page,
                "Size": 10,
                "Desc": true
            }
        }).then(result => {
            setBlogs(result.data.Data);
        }).catch(e => {
            console.log("errror", e);
        })
    }

    function createSlug(title) {
        var slug = title
            .toLowerCase()
            .replace(/[^a-z0-9آ-ی]/g, '-')
            .replace(/-+/g, '-')
            .replace(/(^-)|(-$)/g, '');
        return slug;
    }

    function createCId(article) {
        var createdate = new Date(article.CreatedDate)
        var idcount = (article.Id+"").length
        return idcount+""+article.Id+""+createdate.getHours()+""+createdate.getMonth()+""+createdate.getMinutes()+""+createdate.getDay();
    }
    function getRandomArbitrary(min, max) {
        var result = Math.round(Math.random() * (max - min) + min);
        return result;
    }


    return (
        <section>
            <Container>
                <Grid className={"blog"} container columns={60} textAlign={"center"}>
                    <Grid justifyItems={"center"} size={60} sx={{mb: 5}}>

                        <Paper
                            component="form"
                            elevation={0}
                            className={"search"}
                            sx={{display: 'flex', border: "1px solid #aaaaaa", borderRadius: 2, borderLeft: "none", alignItems: 'center'}}
                        >
                            <Search sx={{color: "#aaaaaa", mx: 1}}/>
                            <InputBase
                                sx={{flex: 1}}
                                placeholder="جستجو در مطالب ..."
                                inputProps={{width: "2px"}}
                            />
                            <Button variant={"contained"} color="primary" sx={{px: 3, borderRadius: 4, ml: -14}} aria-label="directions">
                                جستجوی مقاله
                            </Button>
                        </Paper>
                    </Grid>
                    {Blogs?.content?.map((article, number) => (
                        <Grid key={number} size={{xl:20,md:30,sm:60}} alignContent={"start"} textAlign={"start"} >
                            <Card  className={"card"}  elevation={3}>

                                <CardActionArea href={"/blog-detail/"+createCId(article)+"/"+createSlug(article.Title)}>
                                <img alt={article?.Title} src={article?.ArticleImage?.Url}/>
                                <Typography sx={{mr:1,fontSize:"1rem",fontWeight:600,color:"#555555"}} variant={"subtitle1"}>{article?.Title}</Typography>
                                <Typography sx={{mr:1,fontSize:"0.8rem",fontWeight:400,minHeight:160,color:"#999999"}} variant={"subtitle1"}><div dangerouslySetInnerHTML={{__html: article?.Summary}}/></Typography>
                                </CardActionArea>
                                </Card>
                        </Grid>

                    ))}

                    <Grid justifyItems={"center"} size={60} sx={{mb: 5}}>
                        <Pagination count={Blogs.totalPages} onChange={(number,nu)=>setSelectedPage(nu-1)} />
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default _BlogContents;
