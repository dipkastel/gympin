"use client";

import React, {
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";

import { Grid, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const NUM_PARTICLES = 80;
const SPEED_X = 3;
const SPEED_Y = 0.5;
const RADIUS = 5;

const COLOURS: string[] = [
  "#eaa7a7",
  "#de7a7a",
  "#e05b5b",
];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;

  constructor(
    private canvas: HTMLCanvasElement
  ) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * SPEED_X;
    this.vy = (Math.random() - 0.5) * SPEED_Y;
    this.radius = RADIUS;
    this.color =
      COLOURS[
        Math.floor(
          Math.random() * COLOURS.length
        )
      ];
  }

  draw(
    ctx: CanvasRenderingContext2D
  ): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );

    ctx.fill();
  }

  update(
    ctx: CanvasRenderingContext2D
  ): void {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.x < 0 ||
      this.x > this.canvas.width
    ) {
      this.vx *= -1;
    }

    if (
      this.y < 0 ||
      this.y > this.canvas.height
    ) {
      this.vy *= -1;
    }

    this.draw(ctx);
  }
}

export default function ValuesTicker(): JSX.Element {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const widthRef =
    useRef<HTMLDivElement>(null);

  const animationRef =
    useRef<number | null>(null);

  const [particles, setParticles] =
    useState<Particle[]>([]);

  const [canvas, setCanvas] =
    useState<HTMLCanvasElement | null>(
      null
    );

  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(
      null
    );

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const widthElement = widthRef.current;

    if (
      !canvasElement ||
      !widthElement
    ) {
      return;
    }

    canvasElement.width =
      widthElement.clientWidth;

    canvasElement.height =
      window.innerHeight / 3;

    setCanvas(canvasElement);

    setContext(
      canvasElement.getContext("2d")
    );
  }, []);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    const newParticles: Particle[] = [];

    for (
      let i = 0;
      i < NUM_PARTICLES;
      i++
    ) {
      newParticles.push(
        new Particle(canvas)
      );
    }

    setParticles(newParticles);
  }, [canvas]);

  useEffect(() => {
    if (
      !canvas ||
      !context ||
      particles.length === 0
    ) {
      return;
    }

    const animate = (): void => {
      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles.forEach((particle) =>
        particle.update(context)
      );

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [
    canvas,
    context,
    particles,
  ]);

  return (
    <section>
      <Grid className="HeaderText">
        <Typography variant="h2">
          چرا جیم پین؟
        </Typography>

        <TypeAnimation
          sequence={[
            "تعداد زیاد و رو به افزایش مراکز ورزشی",
            3000,
            "آبی، توپی، راکتی، ماساژ و سالن های چند منظوره",
            3000,
            "پوشش دهی تمام مناطق کشور",
            3000,
            "تنوع بی‌نظیر و گسترده رشته‌های ورزشی",
            3000,
            "تخفیف‌های شگفت انگیز برای کارمندان",
            3000,
            "عضویت رایگان سازمان‌ها در جیم پین",
            3000,
            "مشاوره رایگان حضوری برای شرکت‌ها",
            3000,
            "امکان استفاده هر سازمان با هر بودجه ای",
            3000,
            "گزارش‌های برخط عملکرد کارمندان",
            3000,
            "گزارش‌های اختصاصی عملکرد سازمان",
            3000,
            "عدم سوخت و حفظ بودجه رفاهی سازمان",
            3000,
            "استفاده از باقی‌مانده مبلغ برای شارژ مجدد",
            3000,
            "امکان تعریف تاریخ انقضا برای اعتبار کارمندان",
            3000,
            "درگاه پرداخت برای افزایش اعتبار توسط کارمندان",
            3000,
            "افزودن مراکز درخواستی کارمندان",
            3000,
            "هدایای مناسبتی(نوروز، یلدا، تولد، روز زن)",
            3000,
            "نظرسنجی در راستای بهبود کیفیت و ارتقا خدمات",
            3000,
            "ارتقا برند کارفرمایی از طریق پوشش هزینه ورزشی",
            3000,
            "جشنواره‌های فصلی و فروش‌های ویژه",
            3000,
            "داشبورد مدیریتی و اختصاصی سازمان",
            3000,
            "اپلیکیشن ویژه کارمندان",
            3000,
            "پاسخگویی و پشتیبانی کامل و سریع جیم پین",
            3000,
          ]}
          wrapper="span"
          cursor
          repeat={Infinity}
          style={{
            fontSize: "2.5em",
            display: "inline-block",
          }}
        />
      </Grid>

      <Grid
        ref={widthRef}
        sx={{
          width: "100%",
        }}
      />

      <canvas
        ref={canvasRef}
        className="block headerCanvas"
      />
    </section>
  );
}
