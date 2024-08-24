import React from 'react';
import _side_search from "../components/sidebar/_side_search";
import _side_other_content from "../components/sidebar/_side_other_content";
import _side_cats from "../components/sidebar/_side_cats";
import _side_x from "../components/sidebar/_side_x";
import _side_insta from "../components/sidebar/_side_insta";
import _side_tags from "../components/sidebar/_side_tags";

const BlogSidebar = ({blogpost}) => {

    return (
        <div className="col-xl-3 col-lg-12">
            <div className="sidebar-wrap">
                <_side_search />
                {/*<_side_other_content/>*/}
                {/*<_side_cats />*/}
                {/*<_side_x />*/}
                {/*<_side_insta />*/}
                <_side_tags blogpost={blogpost}/>
                {/*<div className="widget sidebar grey-bg ad__widget">*/}
                {/*    <img src="/images/bg/news-ad-banner.jpeg" alt="" />*/}
                {/*    <div className="ad-text">*/}
                {/*        <h3><span>350x600</span>Add Banner</h3>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default BlogSidebar;
