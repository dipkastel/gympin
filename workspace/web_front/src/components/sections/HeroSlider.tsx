"use client";

import {JSX} from "react";
import { Card } from "@mui/material";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Slide {
  desktop: string;
  mobile: string;
  alt: string;
}

const settings: Settings = {
  centerMode: false,
  infinite: true,
  slidesToShow: 1,
  dots: true,
  arrows: false,
};

const slides: Slide[] = [
  {
    desktop: "/images/slide1.jpg",
    mobile: "/images/slide11.jpg",
    alt: "جیم پین - پلتفرم رفاهیات ورزشی سازمان‌ها",
  },
  {
    desktop: "/images/slide2.jpg",
    mobile: "/images/slide12.jpg",
    alt: "ثبت‌نام رایگان سازمان‌ها در جیم پین",
  },
  {
    desktop: "/images/slide3.jpg",
    mobile: "/images/slide13.jpg",
    alt: "دسترسی کارمندان به هزاران مرکز ورزشی",
  },
];

export default function HeroSlider(): JSX.Element {
  return (
      <section>
        <div>
          <Slider {...settings}>
            {slides.map((slide: Slide) => (
                <div key={slide.desktop}>
                  <Card
                      className="rtl"
                      elevation={4}
                      sx={{
                        borderRadius: 4,
                        mx: "1vw",
                        my: "1vw",
                      }}
                  >
                    <picture>
                      <source
                          media="(max-width: 600px)"
                          srcSet={slide.mobile}
                      />
                      <img
                          src={slide.desktop}
                          alt={slide.alt}
                          className="slider-img"
                      />
                    </picture>
                  </Card>
                </div>
            ))}
          </Slider>
        </div>
      </section>
  );
}
