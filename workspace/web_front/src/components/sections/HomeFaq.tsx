"use client";

import { JSX } from "react";

import Link from "next/link";
import Slider, { Settings } from "react-slick";

import {
  Card,
  Grid,
  Typography,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(): JSX.Element {
  return (
    <div
      style={{
        display: "none",
      }}
    />
  );
}

interface FaqSliderItemProps {
  title: string;
  text: string;
}

function FaqSliderItem({
  title,
  text,
}: FaqSliderItemProps): JSX.Element {
  return (
    <div>
      <Card
        className="faqTopCard rtl"
        elevation={12}
        sx={{
          borderRadius: 4,
        }}
      >
        <Grid
          container
          direction="column"
          className="experience-text"
          sx={{
            alignItems: "start",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              px: 2,
              p: 2,
              textAlign: "justify",
            }}
          >
            {title}
          </Typography>
        </Grid>
      </Card>

      <Card
        className="faqBottomCard rtl"
        elevation={12}
        sx={{
          borderRadius: 4,
        }}
      >
        <Grid
          container
          direction="column"
          className="experience-text"
          sx={{
            alignItems: "start",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              px: 2,
              p: 2,
              textAlign: "justify",
            }}
          >
            {text}
          </Typography>
        </Grid>
      </Card>
    </div>
  );
}

export default function HomeFaq(): JSX.Element {
  const settings: Settings = {
    className: "experienceSlider",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: true,
    autoplay: true,
    slidesToShow: 3,
    speed: 1000,
    rtl: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  return (
    <section>
      <Grid
        container
        columns={4}
        sx={{
          mt: 8,
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <Grid size={4}>
          <Typography
            component="h2"
            variant="h1"
            color="primary"
            sx={{
              fontWeight: 600,
              mt: 8,
            }}
          >
            پاسخ به سوالات متداول
          </Typography>
        </Grid>
      </Grid>

      <div className="slider-container">
        <Slider {...settings}>
          <FaqSliderItem
            title="جیم پین برای کارمندان چه امکاناتی دارد؟"
            text="از امکانات جیم پین می‌توان به جست‌وجو و مشاهده مراکز ورزشی، رزرو بلیط مجموعه‌های ورزشی، تخفیف‌های شگفت‌انگیز، برنامه‌های تمرینی و تغذیه‌ای و همچنین ارتباط با مربیان اشاره کرد."
          />

          <FaqSliderItem
            title="هزینه عضویت سازمان‌ها در جیم پین چقدر است؟"
            text="عضویت و استفاده از خدمات جیم پین برای سازمان‌ها کاملاً رایگان بوده و جیم پین برای خدمات خود هیچ هزینه‌ای از شرکت‌ها دریافت نمی‌کند. در واقع استفاده از جیم پین برای شرکت‌ها رایگان است."
          />

          <FaqSliderItem
            title="آیا امکان افزودن مجموعه ورزشی مورد نظر سازمان‌ها در جیم پین وجود دارد؟"
            text="بله، جیم پین از این پیشنهاد استقبال می‌کند و آمادگی همکاری با مراکز پیشنهادی کارمندان را دارد."
          />
        </Slider>
      </div>

      <Grid
        container
        direction="column"
        sx={{
          mb: 6,
          alignItems: "end",
          textAlign: "end",
        }}
      >
        {/*
        <Typography
          component={Link}
          href="/faq"
          color="primary"
          sx={{
            fontWeight: 600,
            p: 4,
            textAlign: "justify",
          }}
          variant="caption"
        >
          ادامه سوالات ⮘
        </Typography>
        */}
      </Grid>
    </section>
  );
}
