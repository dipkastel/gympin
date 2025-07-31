import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Typography} from "@mui/material";
import _FoodSelerItem from "../../components/_FoodSelerItem";
import {useNavigate} from "react-router";
import {Catering_query} from "../../network/api/catering.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import _InSectionSlider from "../../components/_InSectionSlider";
import _NeedNewService from "../../components/_NeedNewService";

const Food = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [caterings, setCaterings] = useState(null);

    useEffect(() => {
        Catering_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 10, Desc: false}
        }).then(result => {
            setCaterings(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);


    return (
        <>

            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/food1.jpg"},
                        {Image: "/assets/banners/food2.jpg"}
                    ]}/>
                </Grid>
                {caterings?.map(item => (
                    <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                        <_FoodSelerItem
                            title={item.Name}
                            icon={<img width={100} alt="icon" src={item?.Logo?.Url}/>}
                            onClick={() => navigate("/food/details/" + item.Id)}
                            minOrder={item.MinOrderCount}
                            orderFrom={item.LastOrderDayCount}
                            status={item.Status}
                        />
                    </Grid>
                ))}
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"غذا و میان وعده"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            چرا غذای سازمانی؟
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"}>
                            سفارش غذا توسط سازمان برای پرسنل، سرمایه‌گذاری هوشمندانه‌ای است که دستاوردهای قابل توجهی برای سازمان به همراه
                            دارد.
                            این اقدام با ارائه وعده‌های غذایی سالم و به موقع، رضایت و انگیزه کارکنان را افزایش می‌دهد و با کاهش استرس و
                            صرفه‌جویی در زمان، بهره‌وری آن‌ها را بهبود می‌بخشد.
                            همچنین، غذا خوردن مشترک، روحیه تیمی و همکاری را تقویت می‌کند که به نوآوری و عملکرد بهتر منجر می‌شود. در نتیجه،
                            سازمان نه تنها کیفیت زندگی کاری پرسنل را ارتقا می‌دهد، بلکه با افزایش تعهد و کارایی آن‌ها، به اهداف بلندمدت خود
                            سریع‌تر دست می‌یابد.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Food;
