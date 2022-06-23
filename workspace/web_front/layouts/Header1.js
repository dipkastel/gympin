import React, { useState, useEffect  } from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu';

export default function Header1() {
    const [isToggled, setToggled] = useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);
    const [isSelect, setSelect] = useState("Eng");

    const [isMobileMenu, setMobileMenu] = useState(false);
    const MobileMenuTrueFalse = () => setMobileMenu(!isMobileMenu)

    const [scroll, setScroll] = useState(false);
   useEffect(() => {
      window.addEventListener("scroll", () => {
         setScroll(window.scrollY > 100);
      });
   }, [scroll]);

    return (
        <>
            {/* <!-- header start --> */}
            <header className="header">
                {/*<div className="header__top">*/}
                {/*    <div className="container-fluid">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-6 col-md-12 p-0">*/}
                {/*                <ul className="header__info">*/}
                {/*                    <li><Link href="telto:2202588-6500"><a><i className="fa fa-phone-volume"></i> +2 (202) 588-6500</a></Link>*/}
                {/*                    </li>*/}
                {/*                    <li><Link href="mailto:info@pixento24.com"><a><i className="fal fa-envelope-open"></i>*/}
                {/*                        info@pixento24.com</a></Link></li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-6 col-md-12 my-auto p-0">*/}
                {/*                <div className="social__links">*/}
                {/*                    <Link href="#"><a><i className="fab fa-facebook-f"></i></a></Link>*/}
                {/*                    <Link href="#"><a><i className="fab fa-twitter"></i></a></Link>*/}
                {/*                    <Link href="#"><a><i className="fab fa-pinterest-p"></i></a></Link>*/}
                {/*                    <Link href="#"><a><i className="fab fa-linkedin-in"></i></a></Link>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={`header__bottom ${scroll ? "sticky-header animated fadeInDown" : ""}`}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="navarea">
                                    <Link href="/"><a className="site-logo">
                                        <img src="/images/logo/logo.png" alt="LOGO" />
                                    </a></Link>
                                    <div className="mainmenu d-none d-lg-block">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li ><Link href="/"><a>پیشنهادات ورزشی</a></Link></li>
                                                <li ><Link href="/"><a>رویداد‌ها</a></Link></li>
                                                <li><Link href="/about"><a>شرکت ها</a></Link></li>
                                                <li><Link href="#"><a>به ما بپیوندید</a></Link></li>
                                                <li><Link href="/service"><a>فروشگاه</a></Link></li>
                                                <li><Link href="/project"><a>بلاگ</a></Link></li>
                                                <li><Link href="/news"><a>کارت هدیه</a></Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="mobile-menu mean-container d-block d-lg-none ">
                                        <div className="mean-bar">
                                            <a onClick={MobileMenuTrueFalse} href="#nav" className={isMobileMenu ? "meanmenu-reveal d-none" : "meanmenu-reveal"} >
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </a>
                                            <a onClick={MobileMenuTrueFalse} href="#nav" className={isMobileMenu ? "meanmenu-reveal" : "meanmenu-reveal d-none"} style={{ "right": "0px", "left": "auto", "textAlign": "center", "textIndent": "0px", "fontSize": "18px" }}>
                                                X
                                            </a>
                                        </div>
                                        {isMobileMenu &&
                                            <MobileMenu />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- header end --> */}
        </>
    )
}
