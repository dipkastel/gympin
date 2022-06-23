import React from 'react'

export default function HomeTwoNews() {
    return (
        <>
         {/* <!-- news section start --> */}
    <section className="news-area news-area__2 pt-125 pb-125">
        <div className="container">
            <div className="row">
                <div className="col-xl-7">
                    <div className="section-header">
                        <h4 className="sub-heading sub-heading__2 mb-10">Latest articles</h4>
                        <h2 className="section-title section-title__2">Recent update</h2>
                    </div>
                </div>
                <div className="col-xl-5 text-right news-right">
                    <a href="news.html" className="inline-btn"><span className="icon"><i className="far fa-arrow-right"></i></span>
                        Go to blog</a>
                </div>
            </div>
            <div className="row mt-none-30">
                <div className="col-xl-6 col-lg-12 mt-30">
                    <article className="post-box">
                        <div className="post-box__thumb post-box__thumb--2">
                            <img src="/images/news/news-4.jpeg" alt=""/>
                        </div>
                        <div
                            className="post-box__content post-box__content--2 post-box__content--grey post-box__content--white  pl-45 pr-45">
                            <a href="news-details.html" className="date-author">Creative / 12 nov 2020</a>
                            <h4 className="post-box__title post-box__title--2">
                                <a href="news-details.html">Magna nostra vitae pede pretium sceler
                                    isque nec turpis rhoncus</a>
                            </h4>
                            <a href="news-details.html" className="inline-btn mt-0">
                                <span className="icon"><i className="far fa-arrow-right"></i></span>
                                continue Reading
                            </a>
                        </div>
                    </article>
                </div>
                <div className="col-xl-6">
                    <article className="post-box">
                        <div className="row reverse-col flex-xs-column-reverse mt-30">
                            <div className="col-xl-6 col-lg-6 my-auto">
                                <div className="post-box__content post-box__content--2 post-box__content--white p-0">
                                    <a href="news-details.html" className="date-author">Creative / 12 nov 2020</a>
                                    <h4 className="post-box__title post-box__title--2">
                                        <a href="news-details.html">Nisine fertum molestie
                                            suspe end morbi</a>
                                    </h4>
                                    <div className="post-box__excerpt">
                                        <p>Massa mauris an felis platea dictum pharetra sollicitudins for the tempo
                                            vivamus nulla partue eros ani quam pulvinar
                                            aliquam...</p>
                                    </div>
                                    <a href="news-details.html" className="inline-btn">
                                        <span className="icon"><i className="far fa-arrow-right"></i></span>
                                        continue Reading
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="post-box__thumb post-box__thumb--2">
                                    <img src="/images/news/news-5.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="post-box">
                        <div className="row mt-30">
                            <div className="col-xl-6 col-lg-6">
                                <div className="post-box__thumb post-box__thumb--2">
                                    <img src="/images/news/news-6.jpeg" alt=""/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 my-auto">
                                <div className="post-box__content post-box__content--2 post-box__content--white p-0">
                                    <a href="news-details.html" className="date-author">Creative / 12 nov 2020</a>
                                    <h4 className="post-box__title post-box__title--2">
                                        <a href="news-details.html">Nisine fertum molestie
                                            suspe end morbi</a>
                                    </h4>
                                    <div className="post-box__excerpt">
                                        <p>Massa mauris an felis platea dictum pharetra sollicitudins for the tempo
                                            vivamus nulla partue eros ani quam pulvinar
                                            aliquam...</p>
                                    </div>
                                    <a href="news-details.html" className="inline-btn">
                                        <span className="icon"><i className="far fa-arrow-right"></i></span>
                                        continue Reading
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- news section end -->    */}
        </>
    )
}
