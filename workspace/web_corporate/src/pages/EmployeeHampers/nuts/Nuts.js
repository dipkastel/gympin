import React, {useContext, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {
    Button, ButtonGroup,
    Card,
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField,
    Typography
} from "@mui/material";
import _MercheantSelerItem from "../../../components/_MercheantSelerItem";
import {Form, Image} from "react-bootstrap";
import {toPriceWithComma} from "../../../helper/utils";
import {corporate_deleteCorporateGroup} from "../../../network/api/corporate.api";
import {Add, DeleteOutline, Remove} from "@mui/icons-material";
import {Support_add} from "../../../network/api/support.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";

const items = [
    {
        image:"/assets/nuts/ajil-shoor800.jpg",
        name:"بسته 1کیلویی آجیل شور درجه 1",
        desc:"پسته دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی",
        fullDesc:"بسته ۱ کیلویی «آجیل شور درجه ۱» ترکیبی از مغزهای باکیفیت و تازه است که پس از فرآیند شور شدن دقیق، طعمی مطلوب و ماندگاری بالاتری پیدا کرده‌اند. بر اساس منابع موجود، این نوع آجیل شور اغلب شامل ترکیبی از دانه‌هایی مانند تخم کدو، تخم ژاپنی، پسته، بادام هندی، فندق و… می‌باشد و در هر صد گرم از آن ≈ ۶۰۷ کیلوکالری انرژی، ۲۰ گرم پروتئین، ۵۴ گرم چربی، ۲۱ گرم کربوهیدرات و ۷ گرم فیبر وجود دارد. بسته ۱ کیلویی این محصول به عنوان گزینه‌ای مناسب برای پذیرایی و تنقلات مجلسی مطرح است و بسته‌بندی‌های بهداشتی و وزن ثابت برای آن در نظر گرفته شده است.این محصول برای کسانی که به دنبال تنقلاتی خوش‌طعم با کیفیت بالا هستند، انتخابی مطمئن به شمار می‌آید.",
        weight:1000,
        minOrder:"20",
        price:1350000
    },
    {
        image:"/assets/nuts/ajil-kham800.jpg",
        name:"بسته 1کیلویی آجیل خام درجه 1",
        desc:"پسته دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی",
        fullDesc:"بسته ۱ کیلویی «آجیل خام درجه ۱» شامل ترکیبی از مغزهای تازه و طبیعی مانند بادام درختی، پسته، فندق، بادام هندی و تخم کدو است که بدون هیچ‌گونه فرآیند برشته‌سازی یا افزودنی، طعم و خواص اصلی خود را حفظ کرده‌اند. این نوع آجیل سرشار از اسیدهای چرب مفید، پروتئین گیاهی، فیبر و مواد معدنی مانند منیزیم و فسفر است و گزینه‌ای عالی برای تغذیه سالم و رژیم‌های کم‌نمک محسوب می‌شود. بسته‌بندی‌های ۱ کیلویی این محصول در محیط‌های بهداشتی و با حفظ تازگی مغزها تهیه می‌شود و به‌دلیل کیفیت بالای مواد اولیه، انتخابی مناسب برای مصرف روزانه، پذیرایی یا هدیه دادن به شمار می‌آید.",
        weight:1000,
        minOrder:"20",
        price:1350000
    },
    {
        image:"/assets/nuts/ajil-shirin800.jpg",
        name:"بسته 1کیلویی آجیل شیرین درجه 1",
        desc:"پسته دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی - کشمش ایرانی - مویز خارجی بی دانه - گردو - انجیر",
        fullDesc:"بسته ۱ کیلویی «آجیل شیرین درجه ۱» ترکیبی از مغزهای باکیفیت و میوه‌های خشک‌شده خوش‌طعم است که طعمی شیرین و پذیرایی‌پسند دارد؛ برای مثال ترکیب‌هایی مثل پسته، بادام درختی، بادام هندی، مغز فندق، گردو همراه با کشمش یا انجیر در آن مشاهده می‌شود. این محصول به‌عنوان میان‌وعده، پذیرایی از مهمان یا هدیه انتخابی محبوب به شمار می‌آید؛ بسته‌بندی بهداشتی، وزن ثابت و تنوع بالا از ویژگی‌های بارز آن هستند. همچنین به دلیل وجود میوه‌های خشک تغلیظ‌شده مثل انجیر و کشمش، علاوه‌بر مغزها، انرژی سریع و طعم شیرین نیز فراهم می‌گردد.",
        weight:1000,
        minOrder:"20",
        price:1000000
    },
    {
        image:"/assets/nuts/ahmad-aghaei800.jpg",
        name:"1 کیلویی پسته احمدآقایی",
        desc:"فندقی - دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی پسته احمد آقایی یکی از باکیفیت‌ترین و محبوب‌ترین انواع پسته ایرانی است که به‌ویژه برای مجلس، پذیرایی و صادرات انتخاب می‌شود. این نوع پسته دارای پوسته‌ای سفید استخوانی با مغزی به رنگ قرمز روشن تا ارغوانی همراه با سبز است. شکل دانه کشیده و بادامی بوده و اندازه آن کمی کمتر از نوع پسته اکبری است. درخت آن زودگل است، باردهی نسبتاً پایدار دارد و مقاومت خوبی در برابر تنش گرمایی نشان می‌دهد. پسته فلات این پسته به‌عنوان «پسته اشرافی» شناخته می‌شود به دلیل ظاهر زیبا و طعم ممتازش.در بسته ۱ کیلویی، این محصول به‌صورت یکدست و درجه ۱ عرضه می‌شود؛ بدین معنا که دانه‌ها نسبتاً هم‌سایز هستند، ناخالصی‌ها (مثلاً پسته دهان‌بسته یا خرد شده) کم‌تر دیده می‌شود و کیفیت ظاهری و طعمی بالا است. اگر به دنبال محصولی لوکس برای مصرف شخصی، هدیه یا مهمانی هستید، این بسته گزینه بسیار مناسبی است.",
        weight:1000,
        minOrder:"20",
        price:1400000
    },
    {
        image:"/assets/nuts/akbari800.jpg",
        name:"1 کیلویی پسته اکبری",
        desc:"فندقی - دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی «پسته اکبری» شامل دانه‌هایی از یکی از لوکس‌ترین ارقام پسته ایران است که به‌خاطر اندازه بزرگ، ظاهر کشیده و کیفیت ممتاز شناخته می‌شود. این پسته دارای پوست به رنگ کرم‌تیره و مغزی با رنگ سبز متمایل به بنفش-قهوه‌ای است. به دلیل سایز درشت و طعم برجسته، اغلب در بسته‌بندی‌های درجه ۱ و برای مصرف‌های مهمانی یا صادرات عرضه می‌شود. هنگام خرید این بسته باید به این نکات توجه شود: دانه‌ها تا حد امکان یکدست و سالم باشند، پوست ترک‌خورده یا دارای لکه زیاد نداشته باشند، خندان بودن (باز بودن پوست) و تازه بودن مغز از شاخص‌های کیفیت هستند. این محصول گزینه‌ای عالی برای کسانی است که به دنبال آجیل “مجلسی” با کیفیت بالا هستند.",
        weight:1000,
        minOrder:"20",
        price:1400000
    },
    {
        image:"/assets/nuts/peste-motefareghe800.jpg",
        name:"1 کیلویی پسته (بی نام)",
        desc:"فندقی - دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی «پسته فندقی دست‌چین-خندان درجه‌۱» از مغزهایی از پسته فندقی برخوردار است که با دقت و کیفیت بالا جدا شده‌اند، به‌گونه‌ای که تقریباً همه دانه‌ها خندان (پوست‌شان باز) و ظاهری یکدست و سالم دارند. «دست‌چین» بودن آن یعنی مغزهای شکسته، دهن-بسته یا بسیار ریز از بسته حذف شده‌اند و این سبب می‌شود بسته برای پذیرایی یا هدیه‌دادن گزینه‌ای شکیل‌تر باشد. فروشگاه‌ها این بسته را غالباً با عنوان «تمام خندان دست‌چین»، «انس ۲۴-۲۵ بسیار درشت» معرفی می‌کنند.",
        weight:1000,
        minOrder:"20",
        price:1100000
    },
]

const Nuts = () => {

    const [openItem,setOpenItem] = useState(null);
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    function SellNutsItem({image,name,desc,price,onclick}){
        return (
            <>
                <Card sx={{mt: 4, mb: 2, mx: 2}} elevation={10}>
                <CardActionArea
                    onClick={onclick}
                    sx={{
                        px: 4,
                        pt: 4,
                        pb: 2,
                        textAlign: "center",
                        alignContent: "center",
                        justifyItems: "center",
                        borderRadius: 0
                    }}>
                    <Image rounded={"12px"} className={"m-1"}
                           src={image}
                           width={"90%"}/>
                    <Typography sx={{mb: 1, mt: 1}} variant={"h6"}>
                        {name}
                    </Typography>
                    <Typography sx={{mb:6,minHeight:"50px"}} color={"info"}
                                variant={"body2"}>
                        {desc}
                    </Typography>
                </CardActionArea>
            </Card>
                <Grid sx={{px:3}}>
                    <Button sx={{mt: -6,p:1,fontSize:"1.2rem"}} size={"large"} variant={"contained"} fullWidth>
                        {toPriceWithComma(price)+" تومان"}
                    </Button>
                </Grid>
            </>

        )
    }

    function renderModalShow() {
        function submitOrder(e) {
            e.preventDefault()

            setOpenItem(null);
            error.showError({message: "درحال ارسال ...",});
            Support_add({
                Title: "درخواست خرید آجیل",
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: "درخواست خرید "+openItem.count+"بسته "+openItem.name,
                    IsRead: "true"
                },
                CorporateId: corporate.Id
            }).then(result => {
                error.showError({message: "درخواست شما با موفقیت ثبت شد",});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });


        }

        return (
            <Dialog fullWidth maxWidth={"lg"} open={!!openItem} onClose={() => setOpenItem(null)}>
                <Form onSubmit={(e) => submitOrder(e)}>
                    <DialogTitle>{openItem?.name}</DialogTitle>
                    <DialogContent>
                        <Grid container >
                            <Grid size={6}>
                                <Image rounded={"12px"} className={"m-1"}
                                       src={openItem?.image}
                                       width={"90%"}/>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant={"h4"}>{openItem?.name}</Typography>
                                <Typography variant={"subtitle1"}>{openItem?.desc}</Typography>
                                <Typography sx={{mt:3,lineHeight:"1.6rem",textAlign:"justify"}} variant={"body2"}>{openItem?.fullDesc}</Typography>
                                <Typography sx={{mt:3,lineHeight:"1.6rem",textAlign:"justify"}} variant={"subtitle1"}>{"وزن : "+openItem?.weight+" گرم"}</Typography>
                                <Typography sx={{mt:0,lineHeight:"1.6rem",textAlign:"justify"}} variant={"subtitle1"}>{"حداقل سفارش : "+openItem?.minOrder+" بسته"}</Typography>
                                <Grid sx={{mt:4}}>
                                    <ButtonGroup  size={"large"} >
                                        <Button size={"large"} variant={"outlined"} onClick={(e)=>setOpenItem({...openItem,count:openItem.count+1})}><Add /></Button>
                                        <Button disabled={true} variant={"contained"}>{openItem?.count}</Button>
                                        <Button size={"large"} variant={"outlined"} onClick={(e)=>openItem.count>openItem?.minOrder&&setOpenItem({...openItem,count:openItem.count-1})}>{openItem?.count>1?<Remove />:<DeleteOutline />}</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"} onClick={(e) => setOpenItem(null)}>لغو</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>ثبت سفارش</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }
    return (
        <>
            <Grid container columns={12}>
                {items.map((item,nu)=>(
                    <Grid key={nu} size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                        <SellNutsItem
                            image={item.image}
                            name={item.name}
                            desc={item.desc}
                            price={item.price}
                            onclick={(e)=>setOpenItem({...item,count:20})}
                        />
                    </Grid>
                ))}

                <Grid sx={{mb: 8}} size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            هدیه‌ی آجیل‌های باکیفیت
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            هدیه‌ی آجیل‌های باکیفیت به مناسبت‌هایی مانند عید نوروز، شب یلدا یا اعیاد مختلف، یکی از زیباترین روش‌های قدردانی
                            سازمان از کارکنان خود است. این اقدام نمادی از احترام و توجه شرکت به ارزش‌های فرهنگی و خانوادگی کارکنان به شمار
                            می‌آید و باعث تقویت حس تعلق، همبستگی و رضایت در میان آنان می‌شود. دریافت چنین هدیه‌ای نه‌تنها لحظات شادی را برای
                            خانواده‌ی پرسنل رقم می‌زند، بلکه پیامی روشن از سوی مدیریت است که «خانواده‌ی شما برای ما اهمیت دارد». این توجه
                            صمیمانه، روحیه‌ی کارکنان را بالا می‌برد و انگیزه‌ی آن‌ها برای مشارکت و همکاری مؤثرتر در محیط کار را دوچندان
                            می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            {renderModalShow()}
        </>
    );


};

export default Nuts;
