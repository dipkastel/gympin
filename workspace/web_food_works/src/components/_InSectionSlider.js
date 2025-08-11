import React, { useState } from "react";
import { Card } from "@mui/material";
import Slider from "react-slick";

const _InSectionSlider = ({ sliders }) => {
  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: 1,
    dots: true,
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
          {sliders?.map((item, num) => (
            <SliderItem key={num} src={item.Image} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default _InSectionSlider;
