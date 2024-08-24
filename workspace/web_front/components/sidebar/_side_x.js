import React from 'react';

const _side_x = () => {
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                توييتر
            </h4>
            <ul className="twitter__feeds">
                {/*repeat*/}
                <li>
                    <div className="t-feed-icon">
                        <i className="fab fa-twitter"></i>
                    </div>
                    <div className="t-feed-body">
                        <p>Rescue - #Gutenberg ready @wordpress
                            Theme for Creative Bloggers available on
                            @ThemeForest https://t.co/2r1POjOjgV
                            C… https://t.co/rDAnPyClu1</p>
                        <div className="t-feed-meta"> November 25, 2018</div>
                    </div>
                </li>
                {/*-repeat*/}
            </ul>
        </div>
    );
};

export default _side_x;
