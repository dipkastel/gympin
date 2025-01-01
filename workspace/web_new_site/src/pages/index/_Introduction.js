import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import __IntroForm from "./__IntroForm";

const _Introduction = () => {
    return (
        <section id={"intro"}>
            <Container className={"rtl"}>
                <Grid container alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
                    <Grid className={"text-intro rtl"} md={6} item>
                        <__IntroForm />
                    </Grid>
                    <Grid className={"fx-into"} md={6} item>
                        {/*<__IntroImage/>*/}
                        <img alt={"رفاهی ورزشی"} width={"100%"} src={"/assets/images/main-img.jpg"}/>
                    </Grid>

                </Grid>
            </Container>
        </section>
    );
};

export default _Introduction;
