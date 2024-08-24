import React from 'react';

const _side_other_content = () => {
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                مطالب دیگر
            </h4>
            <ul className="recent-posts rtl">
                {/*repeat*/}
                <li>
                    <div className="thumb">
                        <a href="blog-details.html"><img
                            src="/images/news/news-releted-post-1.jpeg" alt="" /></a>
                    </div>
                    <div className="content">
                        <h6 className="title"><a href="news-details.html">Lorem ipsum dolor sit
                            cing elit, sed do.</a></h6>
                        <div className="meta"> 24th March 2019</div>
                    </div>
                </li>
                {/*-repeat*/}
            </ul>
        </div>
    );
};

export default _side_other_content;
