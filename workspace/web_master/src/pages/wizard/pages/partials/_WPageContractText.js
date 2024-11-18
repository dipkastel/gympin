import React from 'react';
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";

const _WPageContractText = ({place, contract, PlacePersonel}) => {







    return (

        <Card elevation={3} sx={{borderRadius: 3, margin: 1}}>
            <CardHeader
                sx={{backgroundColor: "#e7333e", color: "#ffffff"}}
                title={"تفاهم نامه"}/>
            <CardContent>
                <Grid sx={{maxHeight: "25VH", overflowY: "scroll"}} variant={"body2"}>
                    <Typography variant={"body2"} textAlign={"center"}>بسم تعالی</Typography>
                    <Typography variant={"body1"} textAlign={"center"}>تفاهم نامه همکاری</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>مقدمه</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"اين تفاهم نامه به منزله چارچوب كلي همكاري‌هاي متقابل تلقي گرديده و در مورد جزئيات همكاري‌هایی كه تعهدات مالي و اجرايي خاصي داشته باشد، قراردادهاي جداگانهاي منعقد خواهد شد. این تفاهم نامه به منظور تعیین اهداف و توافقات مشترک مبنی بر همکاری در ارائه خدمات ورزشی به کارمندان سازمانها در بستر وبسایت جیمپین توسط مراکز ورزشی تدوین گردیده و به استناد ماده 10 قانون مدنی، بین طرفین تفاهم نامه منعقد شده است:"}</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>{"ماده1 - طرفین تفاهم نامه"}</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>{"طرف اول"}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"شرکت پیشگامان فناوری داده نوتریکا به شناسه ملی 14007662864و شماره ثبت 527530 با نمایندگی آقای علی اشرفی به سمت مدیر عامل که ازین پس در قرارداد با عنوان طرف اول نامیده می شود."}</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>{"طرف دوم"}</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>
                        {"مرکز ورزشی "}
                        <b> {place.Name} </b>
                        {" به شماره ثبت و یا شناسه ملی "}
                        <b>{contract.registrationNumber === "0" ? " - " : contract.registrationNumber} </b>
                        {" به نشانی "}
                        <b>{place.Address}</b>
                        {" با شماره تماس "}
                        <b>{contract.ownerPhoneNumber} </b>
                        {" و جواز کسب "}
                        <b>{contract.occupationLicence === "0" ? " - " : contract.occupationLicence} </b>
                        {" با نمایندگی/مدیریت /موسس "}
                        <b>{contract.ownerName} </b>
                        {" به سمت صاحب امتیاز و مسئول مرکز ورزشی به شماره ملی "}
                        <b>{contract.ownersNationalCode} </b>
                        {" که از این پس در این تفاهم نامه با عنوان طرف دوم نامیده می شود. "}
                    </Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>{"ماده2 - تعاریف"}</Typography>
                    <Typography variant={"body1"} textAlign={"right"}> در این تفاهم نامه، عبارات زیر به معنایی که بیان شده اند در نظر گرفته
                        می‌شوند:</Typography>

                    <Typography variant={"body1"} textAlign={"right"}>
                        جیم پین: پلتفرم (سکوی) ارائه‌دهنده‌ی رزرو و پرداخت آنلاین (بر خط) بلیت خدمات ورزشی و تفریحی است.</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>
                        مرکز: منظور مکانی است که برای انجام فعالیت های ورزشی طراحی و تاسیس شده است. این مکان معمولاً دارای امکانات و
                        تجهیزاتی است که برای انجام ورزش های مختلف مورد نیاز بوده و خدمات ورزشی و تفریحی در آنجا به ورزشکاران ارائه و
                        مرکز از این طریق درآمدزایی دارد.</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>
                        کاربر: فردی است که برای دریافت خدمات ورزشی و تفریحی به مرکز مراجعه کرده و از طریق پلتفرم جیم پین بلیت خود را
                        تهیه می‌کند.</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>
                        بلیت: مدرکی است که کاربر برای اثبات پرداخت هزینه‌ی خدمات یا دسترسی به فعالیت‌های مرکز، از آن‌ها استفاده می‌کند
                        که این امکان وجود دارد تا بلیت به صورت مجازی هم صادر شود.</Typography>
                    <Typography variant={"body1"} textAlign={"right"}>
                        پرداخت: میزان مبلغی که کاربر برای استفاده از خدمات ورزشی از طریق سیستم الکترونیکی به وسیله کارت های بانکی،
                        آنلاین و یا از طریق تلفن همراه واریز مینماید.</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده3- موضوع تفاهم نامه</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>
                        تعیین شرایط و ضوابط همکاری در جهت استفاده طرف دوم از خدمات اینترنتی پلتفرم جیمپین که توسط طرف اول ارائه شده و
                        همچنین تعیین شرایط فروش بلیت به کاربران توسط طرف اول با رعایت شرایط مقرر شده در تفاهم نامه.</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده4- مدت تفاهم نامه</Typography>
                    <Typography variant={"body2"} textAlign={"right"}> این تفاهم نامه از تاریخ امضاء و مبادله آن از سوی طرف ها برای مدت یک
                        سال معتبر و نافذ است و در اين مدت طرفین
                        متعهد خواهند بود که سعی و تلاش حداکثری و مسئولانه خود را جهت پیگیری و پیشبرد مذاکرات و توافقات عملیاتی نمودن
                        مفاد موضوع ماده 3 این تفاهم نامه به انجام برسانند. مدت این تفاهم نامه در صورت عدم فسخ به صورت خودکار هر سال
                        تمدید خواهد شد.</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده5- تعهدات طرف اول</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"5 - 1 - طرف اول متعهد ارائه بستر الکترونیکی فروش بلیط مرکز ورزشی به طرفی دوم بوده و همچنین متعهد به نگهداری و به روزآوری و به روز رسانی نرم افزار جیم پین در راستای سرویس دهی بهتر به کاربران و طرف دوم در طول مدت این تفاهم نامه می باشد."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"5 - 2 - طرف اول تعهد می نماید که کاربران بتوانند پس از انتخاب مرکز و نوع بلیط خود و سرانجام پرداخت هزینه هر بلیط، بتوانند به صورت آنلاین بلیط خود را (در قالب بلیط های یک یا چند بار مصرف یا بلیط های اعتباری که دارای مدت اعتبار  مشخصی هستند)، دریافت نمایند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"5 - 3 - طرف اول تعهد می نماید اپلیکیشن جیم پین را جهت ارائه اطلاعات دقیق به کاربران و مراکز و برطرف نمودن ایرادات                            فنی پلتفرم، همواره به روز رسانی نماید تا کاربران بتوانند به سهولت خدمات موردنیاز را دریافت کنند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"5 - 4 - طرف اول به حفظ حریم خصوصی کاربران و عدم انتشار اطلاعات شخصی آنها تعهد می‌نماید."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"5 - 5 - طرف اول متعهد به پاسخگویی شکایات کاربران و حل مشکلات آنها در چارچوب خدمات ارائه خود می باشد. 5-6-طرف اول،                            خدمات معرفی مرکز ورزشی، مرفی ورزشکاران و خدمات بازاریابی برای فروش بلیط را در چارچوب مدل کسب و کار خود به طرف                            دوم در طول مدت این تفاهم نامه ارائه خواهد داد."}</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده6- تعهدات طرف دوم</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 1 - طرف دوم تعهد می‌نماید پس از مراجعه‌ی کاربر به مرکز، بلیت خریداری شده‌ای را که توسط اپلیکیشن جیم پین (طرف                            اول) صادر شده است، صحت سنجی کرده و احراز هویت انجام داده و ورود کاربر را ثبت نماید."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 2 - طرف دوم متعهد می‌گردد تمامی بلیت های به فروش رسیده با قیمت های قبلی، که پیش از اعمال تغییر بر روی قیمتها به                            کاربران فروخته شده است را با همان شرایط قبلی بپذیرد ولو اینکه ثبت نام یا اولین ورود کاربر با آن بلیت همچنان به                            ثبت نرسیده باشد."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 3 - طرف دوم متعهد می‌گردد خدماتی را که در اپلیکیشن ثبت می‌کند، دقیقاً مطابق با خدماتی باشد که در مرکز و به صورت                            عمومی نیز عرضه می‌گردد و خلاف واقع خدماتی را در جیمپین عنوان نکند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 4 - طرف دوم متعهد می‌گردد قیمت هایی را که در اپلیکیشن ثبت می‌کند، از قیمت فروش همان خدمات چه به صورت حضوری چه                            از طرق دیگر، بیشتر نباشد."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 5 - طرف دوم رعایت مقررات و قوانین مربوط به صنعت ورزش و سلامتی، اخذ و تمدید پروانه و مجوزهای لازم برای فعالیت                            مراکز ورزشی وهمچنین رعایت تمامی استاندارد های موردنیاز را در مرکز خود را تعهد می نماید."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 6 - طرف دوم رعایت کلیه مسائل بهداشتی و ایمنی در محیط ورزشی را در مرکز خود تعهد می‌نماید."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 7 - طرف دوم پاسخگویی به شکایات مشتریان و حل مشکلات آنها را در مرکز خود تعهد می‌نماید."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"6 - 8 - طرف دوم عدم هرگونه تبعیض در ارائه‌ی خدمات به مشتریان را در مرکز خود تعهد می‌نماید."}</Typography>

                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}> ماده7- میزان تعرفه و کارمزد</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>
                        {"7 - 1 - نرخ کارمزد مربوط به طرف اول، بر اساس توافقات صورت گرفته و پذیرفته شده بین طرفین به نحو "}
                        {PlacePersonel?.CommissionFee}
                        {"درصد از فروش هر بلیط می باشد."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"تبصره: لازم به ذکر است تغییر این کارمزدهای مذکور در بند 4-1- در طول زمان، فقط با توافق طرفین امکان پذیر خواهد                            بود."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"7 - 2 - تعیین میزان تعرفه‌ی دریافتی خدمات ورزشی ارائه شده توسط طرف دوم در اپلیکیشن مراکز جیم پین، به صورت آنلاین می                            باشد و طرف دوم همواره امکان تغییر و به روزآوری آن را خواهد داشت."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"7 - 3 - پس از ثبت اولین ورود کاربر به مرکز در اپلیکیشن مراکز، نرخ کارمزد از تعرفه کسر گردیده و مابقی آن در کیف پول                            مجموعه شارژ می‌گردد."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"7 - 4 - طرف اول می‌تواند همه یا مقداری از کارمزد خود را در قالب تخفیف به کاربران ارائه کند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"7 - 5 - هر پرداخت طرف اول به طرف دوم، تنها از طریق ثبت درخواست پرداخت در اپلیکیشن مراکز جیم پین صورت خواهد گرفت و                            ظرف مدت حداکثر 5 روز کاری انجام خواهد شد."}</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده8- حفظ حریم خصوصی کاربران</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>طرفین تفاهم نامه به حفظ حریم خصوصی کاربران و عدم انتشار اطلاعات شخصی
                        آنها تعهد می‌نمایند.</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده9- فسخ تفاهم نامه</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 1 - طرفین مکلف اند هرگونه انتقال مالکیت که مفاد این تفاهم نامه و تعهدات ناشی از آن را تحت تاثیر قرار می‌دهد، به                            اطلاع دیگری برسانند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 2 - این تفاهم‏نامه و حقوق و تعهدات ناشی از آن، چه به صورت کلی یا جزیی غیر قابل انتقال است، مگر با رضایت کتبی                            طرف اول و دوم."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 3 - در صورت عدم رعایت شرایط تفاهم نامه توسط طرف دوم، حق فسخ برای طرف اول محفوظ است."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 4 - طرف دوم متعهد است در صورت عدم تمایل به ادامه همکاری با طرف اول، از حداقل یک ماه قبل به صورت کتبی اطلاع                            رسانی کند."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 5 - در صورت فسخ قرارداد، بلیت‌های فروخته شده در مدت تفاهم، معتبر خواهد بود و در صورت عدم پذیرش بلیت، مطالبه‌ی                            خسارات وارد شده حق طرف اول خواهد بود."}</Typography>
                    <Typography variant={"body2"}
                                textAlign={"right"}>{"9 - 6 - احکام صادره از مراجع قانونی و قضایی مبنی بر خاتمه رابطه قراردادی، باعث خاتمه مفاد این تعهدنامه میشود."}
                    </Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}> ماده10- مرجع حل اختلاف</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>
                        كليه اختلافاتي كه ممكن است بين طرفين تفاهم‌نامه بروز نمايد در صورتي كه بعد از اولین جلسه حل اختلاف از طريق
                        مذاكرات مستقيم و به صورت مسالمت آمیز حل نشود، موضوع از طریق مراجع ذیصلاح و قضایی شهر تهران قابل پیگیری و حل و
                        فصل خواهد بود.</Typography>
                    <br/>
                    <Typography variant={"h6"} textAlign={"right"}>ماده11- نسخ تفاهم نامه</Typography>
                    <Typography variant={"body2"} textAlign={"right"}>
                        این تفاهم نامه در 11 ماده و1 تبصره در یک نسخه دیجیتال تنظیم و به امضاء دیجیتال طرف دوم از طریق ارسال کد، می رسد و
                        ثبت کد ارسال شده به منزله اطلاع کامل از مفاد و امضا طرف دوم خواهد بود.</Typography>

                    <Typography variant={"body2"} textAlign={"right"}>در صورت نیاز، طرف دوم می تواند نسخه چاپی تفاهم نامه از طریق تیکت
                        درخواست نماید. </Typography>
                </Grid>

            </CardContent>
        </Card>
    );
};

export default _WPageContractText;
