import React, {useContext, useState} from 'react';
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid2";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {Instagram, LinkedIn, Telegram, WhatsApp} from "@mui/icons-material";
import _MercheantSelerItem from "../../../components/_MercheantSelerItem";
import _NeedNewService from "../../../components/_NeedNewService";
import {Support_add} from "../../../network/api/support.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const TheaterAndLearn = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [selectedClass, setSelectedClass] = useState(null);


    function renderModalRequestClass() {
        function submitRequest(e) {
            e.preventDefault()

            setSelectedClass(null);
            Support_add({
                Title: "درخواست " + selectedClass,
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: "کلاس برای " + e.target.UserCount.value + " نفر و با توضیح " + e.target.Request.value + " درخواست شده ",
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
            <Dialog open={!!selectedClass} maxWidth={"sm"} onClose={() => setSelectedClass(null)}>
                <Form onSubmit={(e) => submitRequest(e)}>
                    {selectedClass && <DialogTitle>{"درخواست " + selectedClass}</DialogTitle>}
                    <DialogContent>
                        <Typography sx={{textAlign: "justify", mb: 2}} variant={"subtitle2"}>
                            این کارگاه‌ها می‌توانند یک‌روزه یا چندجلسه‌ای برگزار شوند، بسته به نیاز سازمان. مهم‌ترین ویژگی آن‌ها این است که
                            به جای آموزش خشک، از «تجربه و بازی» برای یادگیری استفاده می‌کنند.
                        </Typography>
                        <Typography sx={{textAlign: "justify", mb: 2}} variant={"subtitle2"}>
                            تسهیلگر : وحید زارعی
                        </Typography>

                        <FormControl
                            sx={{p: 1}}
                            fullWidth>
                            <TextField
                                autoFocus
                                name={"UserCount"}
                                label="تعداد نفرات"
                                variant="outlined"
                                type="number"
                            />
                        </FormControl>
                        <FormControl
                            sx={{p: 1}}
                            fullWidth>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="Request"
                                label="اگر توضیحی لازم است بنویسید ..."
                                multiline={true}
                                rows={5}
                                type="text"
                                fullWidth
                                variant={"outlined"}
                            />
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button sx={{px: 7, mb: 2, mx: 2}} type={"submit"} variant={"outlined"} color={"success"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    return (
        <>

            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            کارگاه‌های خلاق سازمانی
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            مجموعه هفت‌گانه، با طراحی ویژه، به گونه‌ای شکل گرفته است که تیم‌ها بتوانند در فضایی متفاوت و تعاملی کنار
                            یکدیگر قرار گیرند، تجربه‌های نو کسب کنند، مهارت‌های فردی و گروهی خود را توسعه دهند و در عین حال توانایی‌های
                            خلاقانه و ارتباطی‌شان را تقویت کنند. هر کارگاه ترکیبی است از تمرین‌های عملی و اجرایی، بازی‌های گروهی، فعالیت‌های
                            حرکتی، تمرین‌های تمرکزی و صامت، و مواجهه‌های خلاق با خود و دیگران، به گونه‌ای که ضمن افزایش همدلی و اعتماد میان
                            اعضای تیم، به بهبود مهارت‌های ارتباطی، تفکر خلاق، حضور ذهن و انعطاف‌پذیری فردی نیز منجر می‌شود.
                        </Typography>
                    </Card>
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"مشاوره رایگان"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class10.png"}/>}
                        describe={
                            <>
                                <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                    {"جیم‌پین این فرصت را فراهم کرده است تا سازمان‌ها بتوانند با برگزاری یک جلسه مشاوره و تجربه عملی کارگاه‌های خلاق سازمانی، نیازها و اهداف تیم خود را شناسایی کنند."}
                                </Typography>
                                <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"}  variant={"subtitle2"}>
                                    {" در این جلسه، شرکت‌کنندگان می‌توانند نمونه‌ای از فعالیت‌های اجرایی، بازی‌های گروهی و تمرین‌های خلاق را امتحان کنند و با مشاهده تأثیر آن‌ها بر تعامل و همدلی تیم، تصمیم آگاهانه و دقیقی برای انتخاب کارگاه‌های مناسب سازمان خود بگیرند."}
                                </Typography>
                                <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"}  variant={"body1"}>
                                    {"این رویکرد، امکان تطبیق دقیق برنامه با نیازهای واقعی تیم و افزایش اثربخشی یادگیری را فراهم می‌کند."}
                                </Typography>
                            </>
                        }
                        onClick={() => setSelectedClass("مشاوره رایگان")}
                        status={"ACTIVE"}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های آشنایی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class1.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: شکستن یخ، ایجاد اعتماد و ساختن یک فضای راحت و صمیمی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: تیم‌های تازه‌تشکیل‌شده، واحدهایی که نیاز به همدلی سریع دارند."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: حس تعلق، اعتماد اولیه، سرعت گرفتن ارتباط‌ها."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: دو نفر روبه‌روی هم می‌ایستند؛ هر بار یکی یک جمله‌ی کوتاه درباره‌ی خودش می‌گوید («من عاشق چای سردم»)، دیگری باید بلافاصله چیزی مشابه یا متفاوت درباره‌ی خودش بگوید. زنجیره ادامه پیدا می‌کند و کم‌کم گروهی از روایت‌های کوچک شکل می‌گیرد."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های آشنایی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های تمرکزی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class9.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: تقویت حضور ذهن و دقت در لحظه."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: مدیران، تیم‌های تصمیم‌گیر و کسانی که کار دقیق و سریع دارند."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: کاهش خطا، افزایش کیفیت تصمیم‌گیری، ذهن شفاف‌تر."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: یک نفر در جمع کلمه‌ای می‌گوید. نفر بعدی باید بلافاصله آخرین حرف آن کلمه را گرفته و کلمه‌ی تازه‌ای بسازد. این تمرین ساده، ذهن را مجبور می‌کند دقیق گوش بدهد و در لحظه واکنش نشان دهد."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های تمرکزی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های زبانی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class4.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: آزاد کردن قدرت کلمات برای نوشتن و گفتن."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: تیم‌های بازاریابی، ارتباطات، مدیران و نویسندگان درون سازمانی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: خلاقیت در بیان، روایت‌سازی، انتقال شفاف پیام."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: همه یک کلمه‌ی واحد دریافت می‌کنند (مثلاً «پل»). هر نفر باید در یک دقیقه، یک جمله یا روایت کوتاه بسازد که آن کلمه را در خودش داشته باشد. در پایان، ده‌ها زاویه‌ی متفاوت از یک واژه‌ی ساده ساخته می‌شود."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های زبانی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های مجازی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class5.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: فهم بهتر دنیای شبکه‌های اجتماعی از زاویه‌ی انسانی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: استارتاپ‌ها، تیم‌های دیجیتال مارکتینگ، مدیران جوان."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: درک فرهنگ مجازی، افزایش سواد رسانه‌ای، خلاقیت در کمپین‌ها."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: در یک گروه ۱۰ نفره، یکی از افراد «بلاک» می‌شود. او هنوز در جمع حضور دارد اما هیچ‌کس اجازه ندارد به او نگاه کند یا به حرفش واکنش نشان بدهد. تجربه‌ی سختی است که معنای «نادیده گرفتن» را به‌طور واقعی نشان می‌دهد."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های مجازی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های حرکتی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class8.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: فعال‌سازی انرژی گروهی و ایجاد هماهنگی بدنی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: تیم‌هایی با فشار کاری بالا یا نیاز به رفرش انرژی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: هماهنگی، نشاط، ریتم مشترک در کار گروهی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: گروه در دایره می‌ایستند. یک نفر ریتمی ساده با دست یا پا می‌سازد، بقیه یکی‌یکی ریتم‌های خود را اضافه می‌کنند. به‌تدریج یک موسیقی زنده و جمعی شکل می‌گیرد که فقط با بدن ساخته شده است."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های حرکتی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های ارتباطی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class6.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: تقویت توانایی شنیدن، دیدن و فهمیدن دیگری."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: تیم‌های فروش، منابع انسانی، روابط عمومی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: همدلی بیشتر، بهبود گفت‌وگوهای روزمره، کاهش سوءتفاهم."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: تمرین «آینه»: یکی حرکت ساده‌ای انجام می‌دهد و دیگری باید بدون تأخیر، دقیق همان حرکت را بازتاب دهد. در ادامه، مرز بین «رهبر» و «پیرو» محو می‌شود و هر دو همزمان تأثیر می‌گذارند و تأثیر می‌گیرند."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های ارتباطی")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"بازی‌های صامت"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/class2.png"}/>}
                        describe={<>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem",color:"white"}}  variant={"subtitle1"}>
                                {"هدف: کشف قدرت بیان غیرکلامی."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"warning"} variant={"subtitle2"}>
                                {"مناسب برای: تیم‌های خلاق، تولید محتوا، مدیران."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"success"} variant={"body1"}>
                                {"دستاورد: تقویت تخیل، جسارت در ابراز، زبان بدن مؤثر."}
                            </Typography>
                            <Typography sx={{width: "100%", textAlign: "justify",lineHeight:"1.5rem"}} color={"info"} variant={"body2"}>
                                {"تمرین نمونه: بدون استفاده از کلمات، هر نفر باید در ۳۰ ثانیه یک «اتفاق روزانه» را فقط با حرکت و بدنش اجرا کند. بقیه باید حدس بزنند."}
                            </Typography>
                        </>}
                        onClick={() => setSelectedClass("بازی‌های صامت")}
                        status={"ACTIVE"}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"کارگاه‌های خلاق"}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6, lg: 6}}>
                    <Card elevation={10} sx={{m: 2, px: 4, py: 2}}>
                        <Typography variant={"h6"} color={"info"}>
                            تلفن پشتیبانی:
                        </Typography>
                        <Typography sx={{mt: 2, mb: 2, textAlign: "justify"}} variant={"h6"} color={"info"}>
                            021-28424190
                        </Typography>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 6, lg: 6}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography sx={{mb: 1.5}} variant={"h6"} color={"info"}>
                            شبکه‌های اجتماعی:
                        </Typography>

                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://wa.me/+989221496746"}>
                            <WhatsApp sx={{fontSize: "1.3rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://t.me/gympin_info"}>
                            <Telegram sx={{fontSize: "1.3rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.linkedin.com/company/gympintdp"}>
                            <LinkedIn sx={{fontSize: "1.3rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.instagram.com/gympin_ir"}>
                            <Instagram sx={{fontSize: "1.3rem"}}/>
                        </IconButton>
                    </Card>
                </Grid>
            </Grid>
            {renderModalRequestClass()}
        </>
    );
};

export default TheaterAndLearn;
