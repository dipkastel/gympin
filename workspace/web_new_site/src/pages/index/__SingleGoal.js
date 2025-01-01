import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography} from "@mui/material";

const __SingleGoal = ({title,text,image,alt}) => {
    return (
        <Grid justifyItems={"center"} sx={{p:2}} size={{ lg: 4, sm: 8, xs: 8}}>
            <Card elevation={20} sx={{width: "100%", maxWidth:250,minHeight:360, borderRadius: "100vw"}}>
                <CardContent className={"goals"}>
                    <Grid direction={"column"}>
                        <Grid>
                            <img className={"goals-img"} alt={alt}
                                 src={image}/>

                        </Grid>
                        <Grid><Typography sx={{fontWeight: 600, mt: 2}} variant={"body2"}>{title}</Typography></Grid>
                        <Grid><Typography
                             className={"text"}
                            variant={"body2"}>{text}</Typography></Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default __SingleGoal;
