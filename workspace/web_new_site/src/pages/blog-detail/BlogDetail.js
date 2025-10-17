import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Article_getById} from "../../network/api/article.api.js";
import _PageTitle from "../partials/_PageTitle.js";
import {Container} from "@mui/material";

const BlogDetail = (props) => {
    const {Cid} = useParams();
    const [postId,setPostId] = useState(null)
    const [article,setArticle] = useState(null)
    useEffect(() => {
        setPostId(CidToId(Cid))
    }, [Cid]);

    useEffect(()=>{
        if(postId){
            getPost(postId)
        }
    },[postId])
    function getPost(postId){
        Article_getById({id: postId}).then(result => {
            setArticle(result.data.Data);
        }).catch(e => {

        });
    }
    function CidToId(Cid){
       var Idcount =  Cid.substr(0, 1);
       var Id = Cid.substr(1,Idcount);
       return Id;
    }

    function getSubtitle(artic) {
        var cats = "منتشر شده در دسته بندی ";
        if(artic?.Categories.length>1)
            cats+="های "
        for(var cat in artic?.Categories){
            cats+=artic?.Categories[cat]?.Name;
            if (artic?.Categories?.length-1>cat)
                cats+= " و "
        }
        if(artic?.CreatorUser){

            cats+= " توسط " + artic?.CreatorUser?.Username
        }
        return cats;
    }

    return (
        <>
            <title>{"جیم پین پل ارتباطی مراکز مرزشی و سازمان‌ها - "+article?.Title}</title>
            <meta name={"description"} content={article?.Summary}/>

            <_PageTitle title={article?.Title} subtitle={getSubtitle(article)} />
            <Container className={"article"}>
                <div>
                    <div dangerouslySetInnerHTML={{__html: article?.Summary}}/>
                </div>
                <div>
                    <div className="inner-content">
                        <img src={article?.ArticleImage?.Url} alt={article?.Title}/>
                    </div>
                </div>
                <div className="inner-content">
                    <div dangerouslySetInnerHTML={{__html: article?.FullText}}/>
                </div>
            </Container>

        </>
    );
};

export default BlogDetail;
