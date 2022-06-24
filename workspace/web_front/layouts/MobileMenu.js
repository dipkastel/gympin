import React, { useEffect } from 'react'
import MetisMenu from 'metismenujs'
import 'metismenujs/dist/metismenujs.css';
import Link from 'next/link'


export default function MobileMenu() {
    useEffect(() => {
        new MetisMenu("#metismenu");
    }, []);

    return (
        <>
            <nav className="mobile-nav">
                <ul className="metismenu" id="metismenu">
                    <li><Link href="/venues"><a>پیشنهادات ورزشی</a></Link></li>
                    <li><Link href="/events"><a>رویداد‌ها</a></Link></li>
                    <li><Link href="/corporate"><a>شرکت ها</a></Link></li>
                    <li><Link href="/join-us"><a>به ما بپیوندید</a></Link></li>
                    <li><Link href="/shop"><a>فروشگاه</a></Link></li>
                    <li><Link href="/blog"><a>بلاگ</a></Link></li>
                    <li><Link href="/shop?c=cards"><a>کارت هدیه</a></Link></li>
                </ul>
            </nav>
        </>
    )
}
