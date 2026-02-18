import React, { useState } from "react";
import { Card } from "@mui/material";
import Slider from "react-slick";
import Grid from "@mui/material/Grid2";

const _InSectionSlider = ({ sliders }) => {
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
          sx={{ borderRadius: 4, mx: 2, my: 3 }}
        >
          <img alt={alt} width={"100%"} className={"slider-img"} src={src} />
        </Card>
      </div>
    );
  }
  return (
    <section>
      <Grid>
        <Slider {...settings}>
          {sliders?.map((item, num) => (
            <SliderItem key={num} src={item.Image} />
          ))}
        </Slider>
      </Grid>
    </section>
  );
};

export default _InSectionSlider;
