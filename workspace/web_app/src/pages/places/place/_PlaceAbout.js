import React, {useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";

const data = [{
    title: "درباره باشگاه",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
}, {
    title: "قوانین و مقررات مرکز",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
}];
const _PlaceAbout = ({place}) => {
    const [abouts,SetAbouts] = useState([]);
    useEffect(() => {
        PlaceAbout_getByPlace({Id:place.Id}).then(result=>{
            SetAbouts(result.data.Data)
        }).catch(e=>console.log(e))
    }, [place]);

    return (

        <div className={"nopadding"}>
            {abouts.map((item,number) => (
                    <Card key={number}  elevation={3} sx={{margin: 1, padding: 1}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid>
                                <Typography variant={"subtitle1"}>
                                    {item.Name}
                                </Typography>
                                <Typography variant={"subtitle2"}>
                                    { item.Description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                )
            )}
        </div>
    );
};

export default _PlaceAbout;
