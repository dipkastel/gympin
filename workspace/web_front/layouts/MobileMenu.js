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
                    <li><Link href="/"><a>پیشنهادات ورزشی</a></Link></li>
                    <li><Link href="/"><a>رویداد‌ها</a></Link></li>
                    <li><Link href="/about"><a>شرکت ها</a></Link></li>
                    <li><Link href="#"><a>به ما بپیوندید</a></Link></li>
                    <li><Link href="/service"><a>فروشگاه</a></Link></li>
                    <li><Link href="/project"><a>بلاگ</a></Link></li>
                    <li><Link href="/news"><a>کارت هدیه</a></Link></li>
                </ul>
            </nav>
        </>
    )
}
