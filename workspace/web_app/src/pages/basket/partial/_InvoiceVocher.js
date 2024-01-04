import React, {useState} from 'react';
import {Button, Card, CardContent, Collapse, Grid, IconButton, TextField, Typography} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const _InvoiceVocher = () => {


    const [expand,setExpand] = useState(false);


    return (
        <Card elevation={3} sx={{m: 1}}>
            <CardContent sx={{m: 0, p: "8px !important"}}>
                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"} onClick={(e)=>setExpand(!expand)}>
                    <Typography variant={"h5"} color={"#888888"} >
                        {"کد تخفیف"}
                    </Typography>
                    <IconButton size={"small"} >
                        {expand?<ExpandLessIcon />:<ExpandMoreIcon />}
                    </IconButton>
                </Grid>
                <Collapse in={expand}>
                    <Grid container spacing={1} columns={36}>
                        <Grid item xs={29}>
                            <TextField
                                label="کد تخفیف"
                                fullWidth
                                size={"medium"}
                                sx={{direction:"rtl"}}
                                placeholder={"code"}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant={"contained"} size={"large"}>ثبت</Button>
                        </Grid>
                    </Grid>
                </Collapse>


            </CardContent>
        </Card>
    );
};

export default _InvoiceVocher;
