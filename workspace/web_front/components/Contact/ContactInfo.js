import React from 'react'

export default function ContactInfo() {
    return (
        <>
            {/* <!-- contact info area start --> */}
            <div className="contact-info-area pt-130">
                <div className="container rtl">
                    <div className="row m-1">
                            <div className="contact-info">
                                <h4 className="contact-info__title ">
                                    درصورتی که پاسخ  سوال خود را از طریق خواندن سوالات متداول و خبرنامه سایت نیافتید میتوانید برای تماس با ما از روش های زیر اقدام فرمایید :
                                </h4>
                                <p>اگر سوال، پیشنهاد یا نیاز به ارتباط با ما دارید، می‌توانید با استفاده از فرم تماس با ما، از طریق پست الکترونیکی، شماره تلفن، یا شبکه‌های اجتماعی با ما در ارتباط باشید. تیم پشتیبانی جیم پین در هر زمان آماده پاسخگویی به شما است و تلاش خواهد کرد تا در اسرع وقت به شما پاسخ دهد.
                                </p>

                                <p> شما همیشه می‌توانید از فرم تماس با ما استفاده کنید یا به آدرس پست الکترونیکی info@gympin.ir  ایمیل بفرستید. ما را در شبکه‌های اجتماعی مختلف همراهی کنید تا از جدیدترین اخبار و فعالیت‌های ما مطلع شوید.</p>
                                <p>برای تماس با ما، شما می‌توانید از راه‌های ارتباطی زیر استفاده کنید:</p>
                            </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-12 col-lg-12 col-md-12 m-2">
                            <div className="contact-info">
                                <h4 className="contact-info__title">تلفن :</h4>
                                <a href="tel:02177162191">021-77162191</a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-12 col-lg-12 col-md-12 m-2">
                            <div className="contact-info">
                                <h4 className="contact-info__title">ایمیل :
                                </h4>
                                <a href="mailto:info@basictheme.com">support@gympin.ir</a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-12 col-lg-12 col-md-12 m-2">
                            <div className="contact-info">
                                <h4 className="contact-info__title">آدرس ما :
                                </h4>
                                <a href="mailto:info@basictheme.com">تهران - خ دماوند - پلاک 416</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- contact info area end -->    */}
        </>
    )
}
