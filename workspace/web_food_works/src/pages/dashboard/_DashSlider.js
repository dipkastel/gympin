import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Avatar, Card, Typography } from "@mui/material";
import Slider from "react-slick";

const _DashSlider = () => {
  const [ww, setWw] = useState(window.innerWidth);

  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: 1,
    dots: false,
    rtl: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  function Arrow() {
    return <div style={{ display: "none" }} />;
  }

  function SliderItem({ src, alt }) {
    return (
      <div>
        <Card
          className={"rtl"}
          elevation={4}
          sx={{ borderRadius: 4, mx: "1VW", my: "1VW" }}
        >
          <img alt={alt} width={"100%"} className={"slider-img"} src={src} />
        </Card>
      </div>
    );
  }
  return (
    <section>
      <div>
        <Slider {...settings}>
          <SliderItem
            src={
              ww > 600
                ? "/assets/images/slide1.jpg"
                : "/assets/images/slide11.jpg"
            }
            alt={"معرفی ویژه به سازمان ها با اپسا"}
          />
          <SliderItem
            src={
              ww > 600
                ? "/assets/images/slide2.jpg"
                : "/assets/images/slide12.jpg"
            }
            alt={"هنر در دستان توست"}
          />
        </Slider>
      </div>
    </section>
  );
};

export default _DashSlider;
