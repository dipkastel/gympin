import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import _AboutItem from "./_AboutItem";
import {PlaceAbout_add, PlaceAbout_getByPlace} from "../../network/api/placeAbout.api";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import {ErrorContext} from "../../components/GympinPagesProvider";


const About = () => {
    const error = useContext(ErrorContext);
    const [placeAbouts, SetPlaceAbouts] = useState([])
    const [openDialogAdd, SetOpenDialogAdd] = useState(false)
    const place = useSelector(({place}) => place.place)
    useEffect(() => {
        getPlaceAbouts();
    }, []);

    function getPlaceAbouts() {
        PlaceAbout_getByPlace({id: place.Id}).then(result => {
            SetPlaceAbouts(result.data.Data)
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
                        <DialogTitle>افزودن مطلب</DialogTitle>
                        <DialogContent>
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
        return (<></>);

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت اطلاعات"}
                    action={<Button variant={"outlined"} title={"btn_add"} onClick={() => SetOpenDialogAdd(true)}>افزودن
                        اطلاعات</Button>}/>
            </Card>
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
