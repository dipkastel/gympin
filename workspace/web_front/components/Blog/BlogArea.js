import React from 'react'
// Import Swiper styles
import SwiperCore, {EffectFade, Navigation} from 'swiper';
import 'swiper/swiper.min.css';
import BlogSidebar from "../../layouts/BlogSidebar";

SwiperCore.use([Navigation, EffectFade]);

export default function BlogArea({blogs, selectedPage, setSelectedPage}) {
    function createSlug(title) {
        console.log()
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9آ-ی]/g, '-')
            .replace(/-+/g, '-')
            .replace(/(^-)|(-$)/g, '');
        return slug;
    }

    function renderPagination() {
        // var pageable = blogs.pageable
        function getTotalPagesArray() {
            const numbers = [];
            for (let i = 0; i <= blogs.totalPages - 1; i++) {
                numbers.push(i);
            }
            return numbers;
        }

        return (
            <div className="blog__pagination mt-40 rtl">
                <ul>

                    {(selectedPage > 3) && <li><a href="#0"><i className="fas fa-angle-double-right"></i></a></li>}
                    {(selectedPage > 3) && <li><i className="fas fa-ellipsis-h"></i></li>}
                    {getTotalPagesArray().map(pageNumber => (
                        <li className={selectedPage == pageNumber ? "active" : ""}><a onClick={() => {
                            setSelectedPage(pageNumber)
                        }}>{pageNumber + 1}</a></li>
                    ))}
                    {(blogs.totalPages > 3) && <li><i className="fas fa-ellipsis-h"></i></li>}
                    {(blogs.totalPages > 3) && <li><a href="#0"><i className="fas fa-angle-double-left"></i></a></li>}

                </ul>
            </div>
        )
    }

    return (
        <>
            {/* <!-- news area start --> */}
            <div className="blog__area blog__area--2 pt-125 pb-125">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            {/*repeat*/}
                            {blogs.content && blogs.content.map(item => (
                                <article key={item.Id} className="blog__box blog__box--3 blog__box--image mb-40">
                                    <div className="thumb">
                                        <a href="news-details.html">
                                            <img src={item.ArticleImage?item.ArticleImage.Url:""} alt={item.Title}/>
                                        </a>
                                    </div>
                                    <div className="content pt-50">
                                        {item.Categories.map(cats => (
                                            <div key={"cat-" + cats.Id} className="cat mr-1 ml-1">
                                                <span>{cats.Name}</span>
                                            </div>
                                        ))}
                                        <h3 className="title">
                                            <a href={"/blog-details/?id=" + item.Id + "&slug=" + createSlug(item.Title)}>{item.Title}</a>
                                        </h3>
                                        <div className="meta mt-20 mb-20">
                                            <span><i className="far fa-eye"></i> {Math.round(Math.random() * 500)} نمایش </span>
                                            <span><a href="#0"><i
                                                className="far fa-comments"></i> {Math.round(Math.random() * 10)} نظر</a></span>
                                            <span><a href="#0"><i
                                                className="far fa-calendar-alt"></i> {new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                            })}</a></span>
                                        </div>
                                        <div className="post-text mb-35">
                                            <div dangerouslySetInnerHTML={{__html: item.Summary}}/>
                                        </div>
                                        <div className="post-bottom mt-30">
                                            <div className="authore ">
                                                <img
                                                    src={item.CreatorUser.Avatar ? (item.CreatorUser.Avatar.Url) : "/images/news/news-list-authore.png"}
                                                    alt=""/>
                                                <span>{item.CreatorUser.Username}</span>
                                            </div>
                                            <a href={"/blog-details/?id=" + item.Id + "&slug=" + createSlug(item.Title)}
                                               className="inline-btn"><span className="icon"><i
                                                className="fal fa-arrow-left"></i></span> ادامه مطلب</a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                            {/*-repeat*/}
                            {renderPagination()}
                        </div>
                        {/*<BlogSidebar/>*/}
                    </div>
                </div>
            </div>
            {/* <!-- news area end -->    */}
        </>
    )
}
