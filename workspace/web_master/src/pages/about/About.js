import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card, CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import _AboutItem from "./_AboutItem";
import {PlaceAbout_add, PlaceAbout_getByPlace} from "../../network/api/placeAbout.api";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import {ErrorContext} from "../../components/GympinPagesProvider";
import AccessDenied from "../../components/AccessDenied";


const About = ({introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const [placeAbouts, SetPlaceAbouts] = useState([])
    const [openDialogAdd, SetOpenDialogAdd] = useState(false)
    const place = useSelector(({place}) => place.place)
    useEffect(() => {
        document.title = 'مدیریت قوانین و درباره';
        getPlaceAbouts();
    }, []);

    function getPlaceAbouts() {
        PlaceAbout_getByPlace({id: place?.Id}).then(result => {
            SetPlaceAbouts(result.data.Data)
            try{introCanGoNext(result.data.Data.length>0)}catch (e) {}
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function RenderModalAdd() {

        function addAbout(e) {
            e.preventDefault()
            PlaceAbout_add({
                Name: e.target.title.value,
                acceptable: false,
                active: true,
                description: "",
                place: {Id: place.Id}
            }).then(result => {
                getPlaceAbouts();
                e.target.title.value = "";
                SetOpenDialogAdd(false)
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={openDialogAdd} onClose={() => SetOpenDialogAdd(false)}>
                    <Form onSubmit={(e) => addAbout(e)}>
                        <DialogTitle>افزودن قوانین یا اطلاعات</DialogTitle>
                        <DialogContent>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                یک تیتر یا موضوع برای قوانین یا اطلاعات وارد نمایید . مثلا : قوانین استفاده از مجموعه یا را های تماس با ما.
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                در ادامه میتوانید متن کامل را برای اطلاعات یا قوانین خود وارد نمایید
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                همچنین در ادامه میتوانید انتخاب کنید کاربر برای خرید بلیط باید این قوانین را بپذیرد یا این اطلاعات فقط برای اطلاع رسانی وارد شده.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="موضوع یا تیتر"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => SetOpenDialogAdd(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementAbout))
        return <AccessDenied/>;

    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"مدیریت اطلاعات و قوانین"}
                    action={<Button variant={"outlined"} title={"btn_add"} onClick={() => SetOpenDialogAdd(true)}>افزودن
                        </Button>}/>
            </Card>
            <CardContent>
                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                    پس از اعمال هر تغییر حتما دکمه ثبت را فشار دهید
                </Typography>
            </CardContent>
            {placeAbouts.map(item => (
                <div key={item.Id}>
                    <_AboutItem placeAbout={item} onChange={() => getPlaceAbouts()}/>
                </div>
            ))}
            {RenderModalAdd()}
        </>

    );
};

export default About;
