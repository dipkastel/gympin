import React, {useContext, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid2 as Grid, TextField, Tooltip, Typography} from "@mui/material";
import {InfoOutlined} from "@mui/icons-material";
import {TicketSubscribes_add} from "../../../network/api/ticketSubscribe.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _SubscribeNew = ({place, reloadList}) => {

    const error = useContext(ErrorContext);
    const [loading, setLoading] = useState(false);

    function addNewTicket(e) {
        e.preventDefault()
        if (e.target.Name?.value?.length > 35) {
            error.showError({message: "نام بلیط طولانی است",});
            return;
        }
        if (e.target.Name?.value?.length < 5) {
            error.showError({message: "نام بلیط کوتاه است",});
            return;
        }
        setLoading(true)
        TicketSubscribes_add({
            Name: e.target.Name.value,
            place: {Id: place.Id}
        }).then(result => {
            setLoading(false)
            reloadList();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return  (
        <>

            {!loading&&<Grid size={{xs: 2, sm: 2, md: 2, lg: 1, xl: 1}} sx={{width: "100%"}}>
                <Card variant={"outlined"} elevation={2} sx={{
                    width: "100%",
                    transition: "0.3s",
                    boxShadow: 1,
                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: 6,
                    }
                }}>
                    <CardHeader
                        component={"a"}
                        sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                        title={"افزودن بلیط جدید"}
                    />
                    <CardContent sx={{pt: 0}}>
                        <Form onSubmit={addNewTicket}>
                            <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                                <Grid size={{xs: 11, sm: 11, md: 11, xl: 11}}>
                                    <TextField
                                        name={"Name"}
                                        sx={{my: 1}}
                                        margin="dense"
                                        label="نام بلیط"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                                    <Tooltip
                                        title={<Typography variant={"subtitle2"}>
                                            نام بلیط باید کوتاه باشد و مشخص کننده خدماتی که به کاربر داده میشود مانند ◄ '16 جلسه بدنسازی
                                            آقایان' یا ◄ 'ورودی استخر جمعه ها بانوان'
                                        </Typography>}>
                                        <InfoOutlined fontSize={"large"}/>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Button variant={"contained"} color={"warning"} type={"submit"} sx={{mt: 1}} fullWidth>
                                <Typography variant={"h6"}>{"افزودن جدید"}</Typography>
                            </Button>
                        </Form>
                    </CardContent>
                </Card>
            </Grid>}

        </>
    );
};

export default _SubscribeNew;
