import React from 'react';

const _side_tags = ({blogpost}) => {

    const unconfirmed = ["برای","شدیم","کردیم","کنند","باشند","کرده","داده","هایی","کردن","کنید","تواند","سازی"];
    function getTagsFromText() {
        const words = blogpost?.FullText?.match(/[\u0600-\u06FF]+/g);
        const wordCount = words.reduce((acc, word) => {
            if(!unconfirmed.includes(word)&&word.length>3&&!word.includes("،"))
                acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});
        const sortedWords = Object.keys(wordCount).filter(f=>wordCount[f]>3).sort((a, b) => wordCount[b] - wordCount[a]);
        return sortedWords;
    }
    return (
        <div className="widget sidebar grey-bg mb-40">
            <h4 className="sidebar__title mb-30">
                <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                تگ مطالب
            </h4>
            <div className="tag">
                {getTagsFromText().map(item=>(
                    <a key={item} href="#0" className="site-btn">{item}</a>
                ))}
            </div>
        </div>
    );
};

export default _side_tags;
