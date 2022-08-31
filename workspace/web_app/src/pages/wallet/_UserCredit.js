import React from 'react';
import {Card, Divider, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const _UserCredit = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"} >

                <Typography
                    sx={{display: "inline" ,marginY:5}}
                    component="P"
                    variant="h2"
                    color="text.primary"
                >
                    اعتبار :
                    2,800,000
                    تومان
                </Typography>
                <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR8QTGSZL4Oq6rXd0eXYM_QqhOmCbqFhTWKw&usqp=CAU"} width={"200px"}  />
                <Typography
                    sx={{display: "inline" ,margin:1}}
                    component="P"
                    variant="subtitle1"
                    color="text.primary"
                >
                    اعتبار اشتراکی (رایان پژوه آوا) :
                    1,450,000
                    تومان
                </Typography>
                <Divider variant="inset" sx={{width:"50%",margin:0,padding:0}}   component="div"/>
                <Typography
                    sx={{display: "inline" ,margin:1}}
                    component="P"
                    variant="subtitle1"
                    color="text.primary"
                >
                    اعتبار اشتراکی (دیجی کالا) :
                    1,000,000
                    تومان
                </Typography>
                <Divider variant="inset" sx={{width:"50%",margin:0,padding:0}}   component="div"/>
                <Typography
                    sx={{display: "inline" ,margin:1}}
                    component="P"
                    variant="subtitle1"
                    color="text.primary"
                >
                    اعتبار شخصی
                    350,000
                    تومان
                </Typography>
                <Divider variant="inset" sx={{width:"50%",margin:0,padding:0}}   component="div"/>

            </Grid>

        </Card>
    );
};

export default _UserCredit;
