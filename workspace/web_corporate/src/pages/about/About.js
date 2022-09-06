import React from 'react';
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import _AboutItem from "./_AboutItem";


const About = () => {
    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"}>افزودن اطلاعات</Button>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت اطلاعات"}
                    action={renderAddButton()}/>
            </Card>
            <_AboutItem name={"قوانین مرکز"}/>
            <_AboutItem name={"درباره مرکز"}/>
        </>

    );
};

export default About;
