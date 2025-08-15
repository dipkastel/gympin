import React, {useState} from 'react';
import {Button, Card, CardContent, Dialog, DialogContent, Grid, Typography} from "@mui/material";
import {MapTwoTone} from "@mui/icons-material";
import _PlaceMap from "./_PlaceMap";

const _PlaceAddress = ({place}) => {


    const [openModalDirection, setOpenModalDirection] = useState(false);

    function renderModalDirection() {
        return (<Dialog open={openModalDirection} onClose={() => setOpenModalDirection(false)}>
            <DialogContent>
                <_PlaceMap place={place}/>
            </DialogContent>
        </Dialog>)
    }

    return (
        <>
            <Card elevation={3} sx={{mx: 2, mt: 4, mb: 2, padding: 1}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt: -5, bgcolor: "#FFFFFF", position: "absolute", px: 3}}
                            gutterBottom>
                    {"آدرس مجموعه ورزشی "+place.Name}
                </Typography>

                <Grid container columns={3} sx={{mt: 2}} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>
                        {place?.Location?.parentName2}
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        {place?.Location?.parentName}
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        {place?.Location?.Name}
                    </Typography>
                </Grid>


                <Grid sx={{mt: 1}}>
                    <Typography variant={"h2"} sx={{fontSize: "1rem", fontWeight: 900, display: "inline"}}>
                        {"آدرس : "}
                    </Typography>
                    <Typography variant={"h2"} sx={{fontSize: "1rem", fontWeight: 500, display: "inline"}}>
                        {place.Address}
                    </Typography>
                </Grid>
                <Button onClick={(e) => setOpenModalDirection(true)} sx={{mt: 1}} variant={"contained"} size={"large"} color={"inherit"}
                        startIcon={<MapTwoTone/>}> مشاهده روی نقشه و مسیریابی </Button>

            </CardContent>
        </Card>
            {renderModalDirection()}
        </>
    );
};

export default _PlaceAddress;
