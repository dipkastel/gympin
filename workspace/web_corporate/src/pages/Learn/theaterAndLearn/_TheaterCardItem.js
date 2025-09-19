import React from 'react';
import {Box, Card, CardActionArea, Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {CateringStatus} from "../helper/enums/CateringStatus";

const _TheaterCardItem = ({icon, title,describe, onClick, status}) => {
    return (
        <>
            <Box sx={{zIndex: 900, ml: 4,minHeight:"80px"}} onClick={status !== 'ACTIVE'?{}:onClick}>{icon}</Box>
            <Card sx={{mt: -8, mb: 2, mx: 2}} elevation={10}>
                <CardActionArea
                    sx={{px: 4, pt: 4, pb: 2, textAlign: "center", alignContent: "center", justifyItems: "center", borderRadius: 0}}
                    onClick={onClick} disabled={status !== 'ACTIVE'}>
                    <Typography sx={{mb: 4}} variant={"h4"}>
                        {title}
                    </Typography>
                        {describe}
                </CardActionArea>
                {status!="ACTIVE"&&<Paper sx={{width: "100%", textAlign: "center", borderRadius: "0", p: 1}}>
                    {CateringStatus[status]}
                </Paper>}
            </Card>
        </>
    );
};

export default _TheaterCardItem;
