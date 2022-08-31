import React from 'react';
import {Button, Card, Grid, InputAdornment, TextField, Typography} from "@mui/material";

const _IncreaseCredit = () => {
    return (
        <Card elevation={3} sx={{margin: 1}}>


            <Typography
                sx={{display: "inline", margin: 1}}
                component="P"
                variant="subtitle1"
                color="text.primary"
            >
                افزایش اعتبار
            </Typography>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{padding: 1}}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{padding: 1}}
                >
                    <Button color={"info"} variant={"contained"}>200,000 تومان</Button>
                    <Button color={"info"} variant={"contained"}>400,000 تومان</Button>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{padding: 1}}
                >
                    <Button color={"info"} variant={"contained"}>800,000 تومان</Button>
                    <Button color={"info"} variant={"contained"}>1,000,000 تومان</Button>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{padding: 1}}
                >


                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="code"
                        type="number"
                        label={"مبلغ دلخواه"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Button
                                        edge="end"
                                        aria-label="Toggle password visibility"
                                        variant={"contained"}
                                    > پرداخت
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

            </Grid>
        </Card>
    );
};

export default _IncreaseCredit;
