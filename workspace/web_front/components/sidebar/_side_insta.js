import React from 'react';

const _side_insta = () => {
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                اينستاگرام
            </h4>
            <ul id="Instafeed">
                {/*repeat*/}
                <li><a href="#0"><img src="/images/news/instafeed/insta-feed-1.jpeg" alt="" /></a>
                </li>
                {/*-repeat*/}
            </ul>
        </div>
    );
};

export default _side_insta;
