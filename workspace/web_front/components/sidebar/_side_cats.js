import React from 'react';

const _side_cats = () => {
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                دسته بندی ها
            </h4>
            <ul className="sidebar__list">
                {/*repeat*/}
                <li>
                    <a href="service-details.html">Banner Printing
                        <span className="icon"><i className="far fa-arrow-left"></i></span>
                    </a>
                </li>
                {/*-repeat*/}
            </ul>
        </div>
    );
};

export default _side_cats;
