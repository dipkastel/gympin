import React from 'react';
import {Card, Grid} from "@mui/material";
import {Image} from "react-bootstrap";

const _WalletImage = () => {
    return (
        <>
            <Card elevation={0} sx={{margin: 1}}>
                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Image
                        src={"https://api.gympin.ir/resource/image?Id=12"}
                        width={"200px"}/>


                </Grid>
            </Card>
        </>
    );
};

export default _WalletImage;
