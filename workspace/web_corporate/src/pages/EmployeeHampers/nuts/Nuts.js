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
        name:"آجیل چهار مغز شور درجه 1",
        desc:"پسته احمد آقایی دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی",
        fullDesc:"بسته ۱ کیلویی «آجیل شور درجه ۱» ترکیبی از مغزهای باکیفیت و تازه است که پس از فرآیند شور شدن، طعمی مطلوب و ماندگاری بالاتری پیدا کرده‌اند. این نوع آجیل شور شامل ترکیبی از  پسته، بادام هندی، فندق و بادام درختی با درصد های ذکر شده است و در هر صد گرم از آن ≈ ۶۰۷ کیلوکالری انرژی، ۲۰ گرم پروتئین، ۵۴ گرم چربی، ۲۱ گرم کربوهیدرات و ۷ گرم فیبر وجود دارد. بسته ۱ کیلویی این محصول به عنوان گزینه‌ای مناسب برای پذیرایی و تنقلات مجلسی مطرح است و بسته‌بندی‌های بهداشتی و وزن ثابت برای آن در نظر گرفته شده است.این محصول برای کسانی که به دنبال تنقلاتی خوش‌طعم با کیفیت بالا هستند، انتخابی مطمئن به شمار می‌آید.",
        weight:1000,
        minOrder:"20",
        percentage: {"پسته": "30%","بادام": "30%","بادام هندی": "30%","فندق": "10%"},
        price:1350000
    },
    {
        image:"/assets/nuts/ajil-kham800.jpg",
        name:"آجیل چهار مغز خام درجه 1",
        desc:"پسته دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی",
        fullDesc:"بسته ۱ کیلویی «آجیل خام درجه ۱» شامل ترکیبی از مغزهای تازه و طبیعی  بادام درختی، پسته، فندق، بادام هندی است که بدون هیچ‌گونه فرآیند برشته‌سازی یا افزودنی، طعم و خواص اصلی خود را حفظ کرده‌اند. در هر صد گرم از آن ≈ ۶۰۷ کیلوکالری انرژی، ۲۰ گرم پروتئین، ۵۴ گرم چربی، ۲۱ گرم کربوهیدرات و ۷ گرم فیبر وجود دارد.این نوع آجیل سرشار از اسیدهای چرب مفید، پروتئین گیاهی، فیبر و مواد معدنی مانند منیزیم و فسفر است و گزینه‌ای عالی برای تغذیه سالم و رژیم‌های کم‌نمک محسوب می‌شود. بسته‌بندی‌های ۱ کیلویی این محصول در محیط‌های بهداشتی و با حفظ تازگی مغزها تهیه می‌شود و به‌دلیل کیفیت بالای مواد اولیه، انتخابی مناسب برای مصرف روزانه، پذیرایی یا هدیه دادن به شمار می‌آید.",
        weight:1000,
        minOrder:"20",
        percentage: {"پسته": "30%","بادام": "30%","بادام هندی": "30%","فندق": "10%"},
        price:1350000
    },
    {
        image:"/assets/nuts/ajil-shirin800.jpg",
        name:"آجیل شیرین درجه 1",
        desc:"پسته دستچین - بادام خارجی (بدون تلخی) - بادام هندی درشت - فندق ایرانی - کشمش ایرانی - مویز خارجی بی دانه - گردو - انجیر",
        fullDesc:"بسته ۱ کیلویی «آجیل شیرین درجه ۱» ترکیبی از مغزهای باکیفیت و میوه‌های خشک‌شده خوش‌طعم است که طعمی شیرین و پذیرایی‌پسند دارد؛ برای مثال ترکیب‌هایی مثل پسته، بادام درختی، بادام هندی، فندق، گردو همراه با کشمش و انجیر در آن مشاهده می‌شود. این محصول به‌عنوان میان‌وعده سالم، پذیرایی از مهمان یا هدیه، انتخابی محبوب به شمار می‌آید؛ بسته‌بندی بهداشتی، وزن ثابت و تنوع بالا از ویژگی‌های بارز آن هستند. ",
        weight:1000,
        minOrder:"20",
        percentage: {"پسته": "18%","بادام": "12%","بادام هندی": "12%","کشمش":"12%","مویز":"11%","گردو":"10%","انجیر":"10%","توت":"10%","فندق": "5%",},
        price:1000000
    },
    {
        image:"/assets/nuts/ahmad-aghaei800.jpg",
        name:"پسته احمدآقایی",
        desc:"فندقی - دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی پسته احمد آقایی یکی از باکیفیت‌ترین و محبوب‌ترین انواع پسته ایرانی است که به‌ویژه برای مجلس، پذیرایی و صادرات انتخاب می‌شود. این نوع پسته دارای پوسته‌ای سفید استخوانی با مغزی به رنگ قرمز روشن تا ارغوانی همراه با سبز است. شکل این نوع پسته، کشیده و بادامی بوده و اندازه آن کمی کوچکتر از پسته اکبری است. این پسته به دلیل ظاهر زیبا و طعم ممتازش به‌عنوان «پسته اشرافی» شناخته می‌شود. این محصول به‌صورت یکدست و درجه ۱ و تماما در باز، در بسته ۱ کیلویی عرضه می‌شود. اگر به دنبال محصولی لوکس برای مصرف شخصی، هدیه یا مهمانی هستید، این بسته گزینه بسیار مناسبی است.",
        weight:1000,
        minOrder:"20",
        price:1400000
    },
    {
        image:"/assets/nuts/akbari800.jpg",
        name:"پسته اکبری",
        desc:"فندقی - دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی «پسته اکبری» شامل دانه‌هایی از یکی از لوکس‌ترین ارقام پسته ایران است که به‌خاطر اندازه بزرگ، ظاهر کشیده و کیفیت ممتاز شناخته می‌شود. این پسته دارای پوست به رنگ کرم‌تیره و مغزی با رنگ سبز متمایل به بنفش-قهوه‌ای است. به دلیل سایز درشت و طعم برجسته، اغلب در بسته‌بندی‌های درجه ۱ و برای مصرف‌های مهمانی یا صادرات عرضه می‌شود. هنگام خرید این بسته باید به این نکات توجه شود: دانه‌ها تا حد امکان یکدست و سالم باشند، پوست ترک‌خورده یا دارای لکه زیاد نداشته باشند، خندان بودن (باز بودن پوست) و تازه بودن مغز از شاخص‌های کیفیت هستند. این محصول گزینه‌ای عالی برای کسانی است که به دنبال آجیل “مجلسی” با کیفیت بالا هستند.",
        weight:1000,
        minOrder:"20",
        price:1400000
    },
    {
        image:"/assets/nuts/peste-fandoghi.jpg",
        name:"پسته فندقی",
        desc:"دستچین - خندان",
        fullDesc:"بسته ۱ کیلویی «پسته فندقی دست‌چین-خندان درجه‌۱» از مغزهایی از پسته فندقی برخوردار است که با دقت و کیفیت بالا جدا شده‌اند، به‌گونه‌ای که همه دانه‌ها خندان (پوست‌شان باز) و ظاهری یکدست و سالم دارند. «دست‌چین» بودن آن یعنی مغزهای شکسته، دهن-بسته یا بسیار ریز از بسته حذف شده‌اند و این سبب می‌شود بسته برای پذیرایی یا هدیه‌دادن گزینه‌ای شکیل‌تر باشد. فروشگاه‌ها این بسته را غالباً با عنوان «تمام خندان دست‌چین»، «انس ۲۴-۲۵ بسیار درشت» معرفی می‌کنند.",
        weight:1000,
        minOrder:"20",
        price:1100000
    },
    {
        image:"/assets/nuts/tokhmekado.jpg",
        name:"تخمه کدو گوشتی",
        desc:"دانه‌ درشت و یک‌دست",
        fullDesc:"تخمه کدو گوشتی درجه‌یک از محبوب‌ترین تنقلات سالم و مقوی است که با دانه‌هایی درشت، سفید و یک‌دست شناخته می‌شود. این محصول دارای مغزی سبز و خوش‌طعم است که به‌راحتی از پوست جدا می‌شود و طعمی ملایم و دلپذیر دارد. تخمه کدو گوشتی منبعی غنی از پروتئین، فیبر، منیزیم و زینک بوده و گزینه‌ای عالی برای میان‌وعده یا همراهی با آجیل‌های دیگر است. در بسته‌بندی‌های کاملاً بهداشتی و تازه عرضه می‌شود و برای افرادی که به دنبال ترکیبی از طعم عالی و خواص تغذیه‌ای بالا هستند، انتخابی ایده‌آل به شمار می‌آید.",
        weight:1000,
        minOrder:"20",
        price:490000
    },
    {
        image:"/assets/nuts/tokhmeaftab.jpg",
        name:"تخمه آفتابگردان",
        desc:"کم نمک ، شور ، گلپر ..",
        fullDesc:"تخمه آفتابگردان یکی از پرطرفدارترین و سالم‌ترین تنقلات طبیعی است که از دانه‌های گیاه آفتابگردان به دست می‌آید و با طعم خوشایند و ارزش غذایی بالا شناخته می‌شود. این دانه‌ها منبعی غنی از ویتامین E، منیزیم، سلنیوم، فیبر و چربی‌های مفید هستند و به تقویت سیستم ایمنی، سلامت قلب و پوست کمک می‌کنند. تخمه آفتابگردان در دو نوع خام و بوداده عرضه می‌شود و به‌عنوان میان‌وعده‌ای مقوی برای تمام سنین گزینه‌ای عالی به شمار می‌آید. در بسته‌بندی‌های بهداشتی و تازه، این محصول طعمی لذیذ، مغزی نرم و پوسته‌ای ترد دارد که هر لحظه از مصرف آن را لذت‌بخش می‌سازد.",
        weight:1000,
        minOrder:"20",
        price:310000
    },
    {
        image:"/assets/nuts/tokhmejabani.jpg",
        name:"تخمه جابانی",
        desc:"دانه‌ درشت و یک‌دست",
        fullDesc:"تخمه جابانی، که به نام تخمه ژاپنی نیز شناخته می‌شود، از تخمه‌های هندوانه آجیلی منطقه جابان دماوند به دست می‌آید و به‌دلیل رنگ قرمز مایل به قهوه‌ای و طعم خاص خود در میان محبوب‌ترین انواع تخمه جای دارد. این محصول دانه‌هایی درشت، پوسته‌ای نازک و مغزی خوش‌طعم دارد که معمولاً به‌صورت بوداده و گاه با نمک ملایم عرضه می‌شود. تخمه جابانی سرشار از پروتئین، منیزیم، آهن و چربی‌های مفید است و در کنار طعم لذیذش، ارزش غذایی بالایی دارد. بسته‌بندی‌های بهداشتی و تازه این محصول، آن را به گزینه‌ای عالی برای تنقلات روزانه، پذیرایی یا دورهمی‌ها تبدیل کرده است.",
        weight:1000,
        minOrder:"20",
        price:530000
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
                    <Button sx={{mt: -6,p:1,fontSize:"1.2rem"}} size={"large"} variant={"contained"}
                            onClick={onclick} fullWidth>
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

                                {openItem?.percentage&&Object?.keys(openItem?.percentage)?.map(o=>(
                                    <Typography sx={{mt:0,lineHeight:"1.6rem",textAlign:"justify"}} variant={"subtitle1"}>{o+" : "+openItem?.percentage[o]}</Typography>
                                ))}
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
