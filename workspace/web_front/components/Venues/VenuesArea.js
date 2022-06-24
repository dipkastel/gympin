import React from 'react'

export default function VenuesDetailsArea() {

    const list = [
        {
            title: "باشگاه بدنسازی کیمیا",
            image: "/images/venues/venues-thumb-1.jpg",
            city: "تهران",
            plans: ["s", "M", "L", "XL"],
            description: ["بدنسازی", "فیتنس", "TRX", "پیلاتس"],
            address: "تهرانپارس فلکه دوم",
            lat: "",
            lng: "",
            ads: true
        },
        {
            title: "استخر سرپوشیده مقامی",
            image: "/images/venues/venues-thumb-2.jpg",
            city: "تهران",
            plans: ["M", "L", "XL"],
            description: ["آموزش شنا", "شنا آزاد"],
            address: "فلکه دوم سادقیه سازمان آب",
            lat: "",
            lng: "",
            ads: true
        },
        {
            title: "باشگاه بدنسازی کیمیا",
            image: "/images/venues/venues-thumb-1.jpg",
            city: "تهران",
            plans: ["s", "M", "L", "XL"],
            description: ["بدنسازی", "فیتنس", "TRX", "پیلاتس"],
            address: "تهرانپارس فلکه دوم",
            lat: "",
            lng: "",
            ads: false
        },
        {
            title: "استخر سرپوشیده مقامی",
            image: "/images/venues/venues-thumb-2.jpg",
            city: "تهران",
            plans: ["M", "L", "XL"],
            description: ["آموزش شنا", "شنا آزاد"],
            address: "فلکه دوم سادقیه سازمان آب",
            lat: "",
            lng: "",
            ads: false
        },
        {
            title: "باشگاه بدنسازی کیمیا",
            image: "/images/venues/venues-thumb-1.jpg",
            city: "تهران",
            plans: ["s", "M", "L", "XL"],
            description: ["بدنسازی", "فیتنس", "TRX", "پیلاتس"],
            address: "تهرانپارس فلکه دوم",
            lat: "",
            lng: "",
            ads: false
        },
        {
            title: "استخر سرپوشیده مقامی",
            image: "/images/venues/venues-thumb-2.jpg",
            city: "تهران",
            plans: ["M", "L", "XL"],
            description: ["آموزش شنا", "شنا آزاد"],
            address: "فلکه دوم سادقیه سازمان آب",
            lat: "",
            lng: "",
            ads: false
        },
        {
            title: "باشگاه بدنسازی کیمیا",
            image: "/images/venues/venues-thumb-1.jpg",
            city: "تهران",
            plans: ["s", "M", "L", "XL"],
            description: ["بدنسازی", "فیتنس", "TRX", "پیلاتس"],
            address: "تهرانپارس فلکه دوم",
            lat: "",
            lng: "",
            ads: false
        },
        {
            title: "استخر سرپوشیده مقامی",
            image: "/images/venues/venues-thumb-2.jpg",
            city: "تهران",
            plans: ["M", "L", "XL"],
            description: ["آموزش شنا", "شنا آزاد"],
            address: "فلکه دوم سادقیه سازمان آب",
            lat: "",
            lng: "",
            ads: false
        }

    ]
    return (
        <>
            {/* <!-- news area start --> */}
            <div className="blog__area blog__area--2 pt-125 pb-125">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-12">
                            <div className="row releted-post">

                                {list.map((item, i) => (
                                    <div className="col-xl-3 col-md-4 col-6 mb-20 pr-1 pl-1">
                                        <article className="blog__box">
                                            <div className="thumb">
                                                <a href="#0">
                                                    <img src={item.image}
                                                         alt="blog image"/>
                                                </a>
                                            </div>
                                            <div className="content">
                                                <div className="meta mb-10">
                                                    <div className="flex-grow-1">
                                                        {item.plans.map((d, i) => (
                                                            <div className="border pr-2 pl-2 inline-btn">{d}</div>
                                                        ))}
                                                    </div>

                                                    <div className="flex-grow-3">
                                                        {item.ads &&
                                                        <a className="btn btn-sm btn-danger inline-btn">تبلیغات</a>
                                                        }
                                                    </div>
                                                </div>
                                                <h4 className="title">
                                                    <a href="#0">{item.title}</a>
                                                </h4>
                                                <div className="post-text small">
                                                    {item.description.map((d, i) => (
                                                        (i<(item.description.length-1))? d+"," :d
                                                    ))}
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-12">
                            <div className="sidebar-wrap">
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png"
                                                   alt=""/></span>
                                        جستجو اماکن
                                    </h4>
                                    <form className="sidebar-search-form">
                                        <input type="text" placeholder="جستجو در مراکز"/>
                                        <button type="submit"><i className="fas fa-search"></i></button>
                                    </form>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png"
                                                   alt=""/></span>
                                        فیلتر با پلن
                                    </h4>
                                    <div className="tag">
                                        <a href="#0" className="site-btn">S</a>
                                        <a href="#0" className="site-btn">M</a>
                                        <a href="#0" className="site-btn">L</a>
                                        <a href="#0" className="site-btn">X</a>
                                    </div>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png"
                                                   alt=""/></span>
                                        شهر ها
                                    </h4>
                                    <ul className="sidebar__list">
                                        <li>
                                            <a href="service-details.html">تهران
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">اصفهان
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">مشهد
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">شیراز
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget sidebar grey-bg mb-40">
                                    <h4 className="sidebar__title mb-30">
                                        <span><img src="/images/shape/heading-shape-3.png"
                                                   alt=""/></span>
                                        فعالیت ها
                                    </h4>
                                    <ul className="sidebar__list">
                                        <li>
                                            <a href="service-details.html">بدنسازی
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">استخر
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">بولینگ
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">تنیس
                                                <span className="icon"><i className="far fa-arrow-left"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- news area end -->  */}
        </>
    )
}
