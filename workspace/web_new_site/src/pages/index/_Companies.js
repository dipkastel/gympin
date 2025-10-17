import React from 'react';
import Slider from "react-slick";

const _Companies = () => {

    const settings = {
        infinite: true,
        dots: false,
        autoplay: true,
        slidesToShow: 7,
        speed: 2000,
        rtl:true,
        autoplaySpeed: 2200,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 5,
                    centerMode: false,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                }
            }
        ],
        swipe: false,
        touchMove: false,
        draggable: false,
        nextArrow: <Arrow/>,
        prevArrow: <Arrow/>

    };


    function Arrow() {
        return (<div style={{display: "none"}}/>);
    }


    return (
        <section >
            <div className="slider-companies-container">
                <Slider  {...settings}>
                    <SliderItem url={"/assets/images/company/company1.jpg"} delay={"150"}/>
                    <SliderItem url={"/assets/images/company/company5.jpg"} delay={"500"}/>
                    <SliderItem url={"/assets/images/company/company4.jpg"} delay={"400"}/>
                    <SliderItem url={"/assets/images/company/company8.jpg"} delay={"800"}/>
                    <SliderItem url={"/assets/images/company/company3.jpg"} delay={"300"}/>
                    <SliderItem url={"/assets/images/company/company6.jpg"} delay={"600"}/>
                    <SliderItem url={"/assets/images/company/company2.jpg"} delay={"200"}/>
                    <SliderItem url={"/assets/images/company/company7.jpg"} delay={"750"}/>
                    <SliderItem url={"/assets/images/company/company9.jpg"} delay={"700"}/>
               </Slider>
            </div>
        </section>
    );

    function SliderItem({url,delay}) {
        return (
            <div className={"itemHolder"} data-aos="zoom-in" data-aos-delay={delay}>

                <img alt={"شرکت‌ها"} className={"apps-img"} src={url}/>

            </div>)
    }
};

export default _Companies;
