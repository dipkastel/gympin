import React from 'react';

const _side_search = () => {
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                جستجو در مطالب
            </h4>
            <form className="sidebar-search-form">
                <input type="text" placeholder="... جستجو" />
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        </div>
    );
};

export default _side_search;
