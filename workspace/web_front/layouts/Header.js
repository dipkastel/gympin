import React, { useState, useEffect  } from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu';

export default function Header() {
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
                                                <li ><Link href="/"><a>صفحه اصلی</a></Link></li>
                                                <li ><Link href="https://web.gympin.ir"><a>پیشنهادات ورزشی</a></Link></li>
                                                <li><Link href="/corporate"><a>شرکت ها</a></Link></li>
                                                <li><Link href="/#places"><a>مرکز ورزشی دارید؟</a></Link></li>
                                                {/*<li><Link href="shop.gympin.ir?c=cards"><a>کارت هدیه</a></Link></li>*/}
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
