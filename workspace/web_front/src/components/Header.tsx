"use client";
import {JSX, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Alert,
    Button,
    Card,
    CardContent,
    Collapse,
    Drawer, Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { LocalPhone } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ContactForm from "./sections/ContactForm";
import {formStatus} from "@/lib/enums/formStatus";
import {formTypeEnum} from "@/lib/enums/formTypeEnum";

type FormStatus = (typeof formStatus)[keyof typeof formStatus] | null;

export default function Header(): JSX.Element {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [thisFormStatus, setThisFormStatus] =
  useState<FormStatus>(null);

  return (
      <>
        <header className="DesktopHeader">
          <Link href="/">
            <Image
                src="/images/logo300.png"
                alt="لوگو جیم پین"
                width={300}
                height={100}
            />
          </Link>

          <ul>
            <li>
              <Link href="/#intro">ثبت نام</Link>
            </li>

            <li>
              <Link href="/about">آشنایی با جیم پین</Link>
            </li>

            <li>
              <Link href="/blog">مطالب و مقالات</Link>
            </li>

            <li>
              <Link href="/contact">پشتیبانی</Link>
            </li>
          </ul>

          <div className="header-actions">
            <Button
                href="https://apps.gympin.ir"
                color="primary"
                size="small"
                variant="contained"
                sx={{
                  mt: 2,
                  mr: 1.6,
                  color: "#ffffff !important"
                }}
            >
              ورود
            </Button>

            <div className="header-call">
                <Grid sx={{mt:1}}>
                    <LocalPhone color="primary" />
                </Grid>

              <Typography
                  sx={{
                    mt: 1,
                    ml: "8px",
                    fontWeight: 600,
                    direction: "rtl",
                  }}
              >
                <a href="tel:02128424190"> (۰۲۱) ۲۸۴۲۴۱۹۰</a>
              </Typography>
            </div>
          </div>
        </header>

        <header className="mobileHeader">
          <Link href="/">
            <Image
                src="/images/logo300.png"
                alt="لوگو جیم پین"
                width={300}
                height={100}
            />
          </Link>

          <div className="header-actions">
            <IconButton
                size="large"
                sx={{ m: 1 }}
                onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon
                  sx={{
                    fontSize: "2rem",
                    padding: 1,
                  }}
              />
            </IconButton>

            <Button
                href="https://apps.gympin.ir"
                color="primary"
                size="small"
                variant="contained"
                sx={{
                  px: "32px !important",
                  mt: 3.2,
                  height: 35,
                  ml: 1.6,
                  color: "#ffffff !important",
                }}
            >
              ورود
            </Button>
          </div>

          <Drawer
              anchor="top"
              open={openDrawer}
              className="drawer"
              onClose={() => setOpenDrawer(false)}
          >
            <Link href="/">
              <Image
                  src="/images/logo300.png"
                  alt="لوگو جیم پین"
                  className="logo"
                  width={300}
                  height={100}
              />
            </Link>

            <ul>
              <li>
                <Link
                    href="/#intro"
                    onClick={() => setOpenDrawer(false)}
                >
                  ثبت نام
                </Link>
              </li>

              <li>
                <Link
                    href="/corporate"
                    onClick={() => setOpenDrawer(false)}
                >
                  سازمان‌ها و شرکت‌ها
                </Link>
              </li>

              <li>
                <Link
                    href="/about"
                    onClick={() => setOpenDrawer(false)}
                >
                  آشنایی با جیم پین
                </Link>
              </li>

              <li>
                <Link
                    href="/blog"
                    onClick={() => setOpenDrawer(false)}
                >
                  مطالب و مقالات
                </Link>
              </li>

              <li>
                <Link
                    href="/contact"
                    onClick={() => setOpenDrawer(false)}
                >
                  پشتیبانی
                </Link>
              </li>

              <li>
                <a
                    onClick={() =>
                        setThisFormStatus(
                            thisFormStatus === null
                                ? formStatus.filled
                                : null
                        )
                    }
                >
                  درخواست تماس
                </a>
              </li>
            </ul>

            <Collapse
                in={thisFormStatus === formStatus.complete}
            >
              <Alert
                  severity="success"
                  variant="filled"
                  elevation={10}
                  sx={{ m: 3 }}
              >
                با تشکر از شما. همکاران ما به زودی با شما تماس خواهند
                گرفت.
              </Alert>
            </Collapse>

            <Collapse in={thisFormStatus === formStatus.error}>
              <Alert
                  severity="error"
                  variant="filled"
                  elevation={10}
                  sx={{ m: 3 }}
              >
                خطا در ارسال اطلاعات. لطفا با شماره‌های جیم پین تماس
                بگیرید!
              </Alert>
            </Collapse>

            <Collapse in={thisFormStatus === formStatus.filled}>
              <Card
                  elevation={5}
                  sx={{
                    borderRadius: 3,
                    maxWidth: 500,
                    m: 4,
                  }}
              >
                <CardContent>
                  <Grid
                      direction="column"
                      spacing={3}
                      sx={{textAlign:"center"}}
                  >
                    <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6,
                          textAlign: "justify",
                        }}
                    >
                      برای دریافت اطلاعات بیشتر فرم زیر را تکمیل
                      نمایید:
                    </Typography>

                    <ContactForm
                        formType={formTypeEnum.advise}
                        setFormStatus={(status: FormStatus) =>
                            setThisFormStatus(status)
                        }
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Collapse>
          </Drawer>
        </header>
      </>
  );
}
