import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";

const _TextImage = ({image, alt, title, text}) => {
    return (
        <section>
            <Container>
                <Grid container sx={{direction: "ltr"}} columns={4} alignContent={"center"} textAlign={"right"}>
                    <Grid sx={{px:3}} item size={{md: 2, xs: 4}}>
                        <img alt={alt} className={"apps-img"} src={image}/>
                    </Grid>
                    <Grid sx={{px: 6, direction: "rtl"}} item size={{md: 2, xs: 4}}>
                        <Typography sx={{fontWeight: 600, mt: 8}} variant={"h5"}>{title}</Typography>
                        <Typography sx={{fontWeight: 400,lineHeight:"2rem", mt: 2, mb: 3, textAlign: "justify"}} variant={"subtitle1"}>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default _TextImage;
