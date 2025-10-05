import React, {useState} from 'react';
import {Card, CardContent, Collapse, Grid, Typography} from "@mui/material";

const _PlaceSingleAbout = ({about, number}) => {
    const [openCollapse,setOpenCollapse] = useState(false);
    return (
        <Card elevation={3} sx={{mx: 2, mt: 4, mb: 2, padding: 1}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt: -5, bgcolor: "#FFFFFF", position: "absolute", px: 3}}
                            gutterBottom>
                    {about.Name}
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                >
                    <Grid>
                        <Collapse in={openCollapse} onClick={(e)=>setOpenCollapse(!openCollapse)}  collapsedSize={30}>
                            <Typography variant={"subtitle2"}>
                                {about.Description}
                            </Typography>
                        </Collapse>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default _PlaceSingleAbout;
