import React, { useEffect } from 'react'
import MetisMenu from 'metismenujs'
// import 'metismenujs/dist/metismenujs.min.css';
import Link from 'next/link'


export default function MobileMenu() {
    useEffect(() => {
        new MetisMenu("#metismenu");
    }, []);

    return (
        <>
            <nav className="mobile-nav">
                <ul className="metismenu" id="metismenu">
                    <li ><Link href="/"><a>صفحه اصلی</a></Link></li>
                    <li ><Link href="/blog"><a>مطالب و مقالات</a></Link></li>
                    <li ><Link href="https://web.gympin.ir"><a>پیشنهادات ورزشی</a></Link></li>
                    <li><Link href="/corporate"><a>شرکت ها</a></Link></li>
                    <li><Link href="/#places"><a>مرکز ورزشی دارید؟</a></Link></li>
                </ul>
            </nav>
        </>
    )
}
