import React from 'react';
import {
    Button, Card,
    CardContent,
    CardHeader,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel
} from "@mui/material";

const _AboutItem = (props) => {

    function renderRemoveButton() {
        return (
            <Button variant={"contained"} title={"btn_add"}>حذف</Button>
        )
    }
    function getValue() {
        return Math.floor(Math.random()*10)*16000
    }
    return (
        <Card elevation={3} sx={{margin: 1}}>

            <CardHeader
                sx={{paddingBottom: 0}}
                title={props.name}
                action={renderRemoveButton()}
            />
            <CardContent sx={{margin: 0}}>
                <FormGroup>
                    <FormControl sx={{margin: 1}}>
                        <InputLabel htmlFor="my-input">توضیح</InputLabel>
                        <Input multiline={true} aria-describedby="my-helper-text" value="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد" />
                    </FormControl>
                    <FormControl sx={{margin: 1}}>
                        <Button variant={"contained"}>ثبت</Button>
                    </FormControl>
                </FormGroup>
            </CardContent>
        </Card>
    );
};

export default _AboutItem;
