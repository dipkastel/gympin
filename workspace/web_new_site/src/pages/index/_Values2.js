import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {TypeAnimation} from "react-type-animation";
import Grid from "@mui/material/Grid2";

const _Values2 = () => {
    const canvasRef = React.useRef(null);
    const widthRef = React.useRef(null);
    const [particles, setParticles] = React.useState([])
    const [canvas, setCanvas] = React.useState(null)
    const [context, setContext] = React.useState(null)
    const NUM_PARTICLES = 80;
    const SPEED_X = 3;
    const SPEED_Y = 0.5;
    const RADIUS = 5;
    const COLOURS = ["#eaa7a7", "#de7a7a", "#e05b5b"];

    useEffect(() => {
        if (typeof window !== "undefined") {
            let canvasTemp = canvasRef.current;
            let width = widthRef.current;
            canvasTemp.width = width.clientWidth;
            canvasTemp.height = window.innerHeight/3;
            setContext(canvasTemp.getContext('2d'));
            setCanvas(canvasTemp);
        }
    }, []);

    useEffect(() => {
        if(particles&&context)
            animate();
    }, [particles,context]);

    useEffect(() => {
        if(canvas)
            createParticles();
    }, [canvas]);

    class Particle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * SPEED_X;
            this.vy = (Math.random() - 0.5) * SPEED_Y;
            this.radius = RADIUS;
            this.color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }

        update(ctx) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -1;
            }

            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -1;
            }
            this.draw(ctx);
        }
    }

    const createParticles = () => {
        const newParticles = [];
        for (let i = 0; i < NUM_PARTICLES; i++) {
            newParticles.push(new Particle());
        }
        setParticles(newParticles);
    };
    const animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update(context));
        requestAnimationFrame(animate);
    };

    return (
        <section  data-aos="fade-up">
            <Grid className={"HeaderText"} >
                <Typography variant={"h2"}>چرا جیم پین؟</Typography>
                <TypeAnimation
                    sequence={[
                        "تعداد زیاد و رو به افزایش مراکز ورزشی",
                        3000,
                        "قدرتی، آبی، هوازی، توپی، رزمی، راکتی، ماساژ و ... ",
                        3000,
                        "پوشش دهی تمام مناطق استان تهران و البرز",
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
                        "گزارش‌های عمومی‌عملکرد کارمندان (ماهیانه)",
                        3000,
                        "گزارش‌های اختصاصی عملکرد سازمان (سالیانه)",
                        3000,
                        "عدم سوخت و حفظ بودجه رفاهی سازمان",
                        3000,
                        "استفاده از باقی‌مانده مبلغ برای شارژ مجدد",
                        3000,
                        "امکان تعریف تاریخ انقضا برای اعتبار کارمندان",
                        3000,
                        "درگاه پرداخت برای افزایش اعتبار توسط کارمندان",
                        3000,
                        "افزودن مراکز درخواستی شرکت‌ها و کارمندان",
                        3000,
                        "هدایای مناسبتی(نوروز، یلدا، تولد، روز زن)",
                        3000,
                        "نظرسنجی در راستای بهبود کیفیت و ارتقا خدمات",
                        3000,
                        "ارتقا برند کارفرمایی از طریق پوشش هزینه ورزشی",
                        3000,
                        "جشنواره‌های فصلی و فروش‌های ویژه",
                        3000,
                        "پنل اختصاصی مدیریت بودجه منابع انسانی",
                        3000,
                        "اپلیکیشن ویژه کارمندان با امکان مشاهده‌ی مراکز",
                        3000,
                        "پاسخگویی و پشتیبانی کامل و سریع جیم پین",
                        3000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: '2.5em', display: 'inline-block' }}
                />
            </Grid>
            <Grid ref={widthRef} sx={{width:"100%"}}>
            </Grid>
                <canvas ref={canvasRef} className=" block headerCanvas"/>
        </section>
    );
};

export default _Values2;
