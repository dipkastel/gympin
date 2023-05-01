import React, {useEffect, useState} from 'react'

export default function BlogDetailsArea({blogpost}) {
    console.log("blogpost",blogpost)

    return (
        <>
            {/* <!-- news area start --> */}
            <div className="blog__area blog__area--2 pt-125 pb-125">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            <article className="blog__box blog__box--3 blog__box--details">
                                <div className="content pt-20">

                                    {blogpost.Categories.map(cats => (
                                        <div key={"cat-" + cats.Id} className="cat mr-1 ml-1">
                                            <span>{cats.Name}</span>
                                        </div>
                                    ))}
                                    <h3 className="title">
                                        {blogpost.Title}
                                    </h3>
                                    <div className="meta mt-20 mb-20">
                                        <span><i className="far fa-user"></i> {blogpost.CreatorUser.Username} </span>
                                        <span><a href="#0"><i
                                            className="far fa-calendar-alt"></i> {new Date(blogpost.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                        })}</a></span>
                                        {/*<span><a href="#0"><i className="far fa-comments"></i> 23 Comments</a></span>*/}
                                    </div>
                                    <div className="post-text mb-20">

                                        <div dangerouslySetInnerHTML={{__html: blogpost.Summary}}/>
                                    </div>
                                    <div className="blog-inner-img mt-40 mb-40">
                                        <div className="inner-content">
                                            <img src={blogpost.ArticleImage?blogpost.ArticleImage.Url:""} alt={blogpost.Title}/>
                                        </div>
                                    </div>
                                    <div className="inner-content">
                                        <div dangerouslySetInnerHTML={{__html: blogpost.FullText}}/>
                                    </div>
                                    {/*<div className="row mt-40">*/}
                                    {/*    <div className="col-xl-7 col-lg-7 col-md-7">*/}
                                    {/*        <div className="blog-post-tag">*/}
                                    {/*            <span>Releted Tags</span>*/}
                                    {/*            <a href="#0">organic</a>*/}
                                    {/*            <a href="#0">Foods</a>*/}
                                    {/*            <a href="#0">tasty</a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-xl-5 col-lg-5 col-md-5">*/}
                                    {/*        <div className="blog-share-icon text-left text-md-right">*/}
                                    {/*            <span>Share: </span>*/}
                                    {/*            <a href="#0"><i className="fab fa-facebook-f"></i></a>*/}
                                    {/*            <a href="#0"><i className="fab fa-twitter"></i></a>*/}
                                    {/*            <a href="#0"><i className="fab fa-instagram"></i></a>*/}
                                    {/*            <a href="#0"><i className="fab fa-google-plus-g"></i></a>*/}
                                    {/*            <a href="#0"><i className="fab fa-vimeo-v"></i></a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="navigation-border pt-50 mt-50"></div>
                                        </div>
                                        {/*<div className="col-xl-5 col-lg-5 col-md-5">*/}
                                        {/*    <div className="bakix-navigation b-next-post text-left mb-30">*/}
                                        {/*        <span><a href="#0">Prev Post</a></span>*/}
                                        {/*        <h4><a href="#0">Tips on Minimalist</a></h4>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-xl-2 col-lg-2 col-md-2 my-auto">*/}
                                        {/*    <div className="bakix-filter text-left text-md-center mb-30">*/}
                                        {/*        <a href="#0"><img src="/images/icons/filter.png" alt=""/></a>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-xl-5 col-lg-5 col-md-5">*/}
                                        {/*    <div className="bakix-navigation b-next-post text-left text-md-right mb-30">*/}
                                        {/*        <span><a href="#0">Next Post</a></span>*/}
                                        {/*        <h4><a href="#0">Less Is More</a></h4>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                {/*<div className="row mt-none-30">*/}
                                {/*    <div className="col-xl-12">*/}
                                {/*        <div className="row">*/}
                                {/*            <div className="col-12">*/}
                                {/*                <div className="navigation-border pt-50 mt-50"></div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="row">*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <h2 className="releted-post-heading">Releted Post</h2>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="row releted-post">*/}
                                {/*            <div className="col-xl-6">*/}
                                {/*                <article className="blog__box mt-30">*/}
                                {/*                    <div className="thumb">*/}
                                {/*                        <a href="#0">*/}
                                {/*                            <img src="/images/news/releted-post-thumb-1.jpeg"*/}
                                {/*                                alt="blog image"/>*/}
                                {/*                        </a>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="content">*/}
                                {/*                        <div className="meta mb-10">*/}
                                {/*                            <a href="#0"><i className="fal fa-calendar-alt"></i> 24th March 2020</a>*/}
                                {/*                        </div>*/}
                                {/*                        <h4 className="title">*/}
                                {/*                            <a href="#0">A series of iOS 7 inspire*/}
                                {/*                                vector icons.</a>*/}
                                {/*                        </h4>*/}
                                {/*                        <div className="post-text">*/}
                                {/*                            <p>Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed*/}
                                {/*                                doing.</p>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </article>*/}
                                {/*            </div>*/}
                                {/*            <div className="col-xl-6">*/}
                                {/*                <article className="blog__box mt-30">*/}
                                {/*                    <div className="thumb">*/}
                                {/*                        <a href="#0">*/}
                                {/*                            <img src="/images/news/releted-post-thumb-2.jpeg"*/}
                                {/*                                alt="blog image"/>*/}
                                {/*                        </a>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="content">*/}
                                {/*                        <div className="meta mb-10">*/}
                                {/*                            <a href="#0"><i className="fal fa-calendar-alt"></i> 24th March 2020</a>*/}
                                {/*                        </div>*/}
                                {/*                        <h4 className="title">*/}
                                {/*                            <a href="#0">A series of iOS 7 inspire*/}
                                {/*                                vector icons.</a>*/}
                                {/*                        </h4>*/}
                                {/*                        <div className="post-text">*/}
                                {/*                            <p>Lorem ipsum dolor sit amet, conse ctet ur adipisicing elit, sed*/}
                                {/*                                doing.</p>*/}
                                {/*                        </div>*/}
                                {/*                    </div>*/}
                                {/*                </article>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="blog-author mt-50 mb-40">*/}
                                {/*    <div className="blog-author__img">*/}
                                {/*        <img src="/images/news/news-author-1.jpeg" alt=""/>*/}
                                {/*    </div>*/}
                                {/*    <div className="blog-author__text">*/}
                                {/*        <span>Written by</span>*/}
                                {/*        <h3>Rosalina D. William</h3>*/}
                                {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor*/}
                                {/*            incididunt ut labore et*/}
                                {/*            dolore magna*/}
                                {/*            aliqua. Ut enim ad minim veniam, quis nostrud exercitation is enougn for today.</p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="post-comments">*/}
                                {/*    <h2 className="title mb-25">03 Comments</h2>*/}
                                {/*    <div className="latest__comments">*/}
                                {/*        <ul>*/}
                                {/*            <li>*/}
                                {/*                <div className="comments-box">*/}
                                {/*                    <div className="comments-avatar">*/}
                                {/*                        <img src="/images/news/news-comment-a-1.jpeg" alt=""/>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="comments-text">*/}
                                {/*                        <div className="avatar-name">*/}
                                {/*                            <h5>Rosalina Kelian</h5>*/}
                                {/*                            <span>19th May 2018</span>*/}
                                {/*                            <a className="reply" href="#0"><i className="fal fa-reply"></i>Reply</a>*/}
                                {/*                        </div>*/}
                                {/*                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do*/}
                                {/*                            eiusmod*/}
                                {/*                            tempor incididunt*/}
                                {/*                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis*/}
                                {/*                            nostrud*/}
                                {/*                            exercitation*/}
                                {/*                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li className="children">*/}
                                {/*                <div className="comments-box">*/}
                                {/*                    <div className="comments-avatar">*/}
                                {/*                        <img src="/images/news/news-comment-a-2.jpeg" alt=""/>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="comments-text">*/}
                                {/*                        <div className="avatar-name">*/}
                                {/*                            <h5>Rosalina Kelian</h5>*/}
                                {/*                            <span>19th May 2018</span>*/}
                                {/*                            <a className="reply" href="#0"><i className="fal fa-reply"></i>Reply</a>*/}
                                {/*                        </div>*/}
                                {/*                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do*/}
                                {/*                            eiusmod*/}
                                {/*                            tempor incididunt*/}
                                {/*                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis*/}
                                {/*                            nostrud*/}
                                {/*                            exercitation*/}
                                {/*                            ullamco laboris nisi ut aliquip.</p>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li>*/}
                                {/*                <div className="comments-box">*/}
                                {/*                    <div className="comments-avatar">*/}
                                {/*                        <img src="/images/news/news-comment-a-3.jpeg" alt=""/>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="comments-text">*/}
                                {/*                        <div className="avatar-name">*/}
                                {/*                            <h5>Arista Williamson</h5>*/}
                                {/*                            <span>19th May 2018</span>*/}
                                {/*                            <a className="reply" href="#0"><i className="fal fa-reply"></i>Reply</a>*/}
                                {/*                        </div>*/}
                                {/*                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do*/}
                                {/*                            eiusmod*/}
                                {/*                            tempor incididunt*/}
                                {/*                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis*/}
                                {/*                            nostrud*/}
                                {/*                            exercitation*/}
                                {/*                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="comments__form">*/}
                                {/*    <h2 className="title">Post Comments</h2>*/}
                                {/*    <form className="form" action="#">*/}
                                {/*        <div className="row">*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <div className="contact-icon contacts-message">*/}
                                {/*                    <textarea name="comments" id="comments" cols="30" rows="10"*/}
                                {/*                        placeholder="Your Comments...."></textarea>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <div className="contact-icon contacts-name">*/}
                                {/*                    <input type="text" placeholder="Your Name.... "/>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <div className="contact-icon contacts-email">*/}
                                {/*                    <input type="email" placeholder="Your Email...."/>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <div className="contact-icon contacts-website">*/}
                                {/*                    <input type="text" placeholder="Your Website...."/>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="col-xl-12">*/}
                                {/*                <button className="site-btn site-btn__2" type="submit"><span className="icon"><i*/}
                                {/*                            className="fal fa-comments"></i></span> Post*/}
                                {/*                    comment</button>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </form>*/}
                                {/*</div>*/}
                            </article>
                        </div>
                        {/*<BlogSidebar/>*/}
                    </div>
                </div>
            </div>
            {/* <!-- news area end -->  */}
        </>
    )
}
