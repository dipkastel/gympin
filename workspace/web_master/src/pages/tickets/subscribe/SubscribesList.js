import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {
    ticketSubscribe_add,
    TicketSubscribes_add, TicketSubscribes_delete,
    TicketSubscribes_getByPlace
} from "../../../network/api/ticketSubscribe.api";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {genders} from "../../../helper/enums/genders";
import {DeleteForever, ToggleOff, ToggleOn} from "@mui/icons-material";
import {Form} from "react-bootstrap";
import {toPriceWithComma} from "../../../helper/utils";
import {getWizardComplete} from "../../../helper/pocket";
import DeleteIcon from "@mui/icons-material/Delete";
import {ticketActiveTimes_delete} from "../../../network/api/gatesTiming.api";
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";

const SubscribesList = ({OnChangeList}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [subscribesList, setSubscribesList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    const introMode = !getWizardComplete()


    useEffect(() => {
        document.title = 'مدیریت عضویت ها';
        getPlaceSubscribes();
    }, []);

    function getPlaceSubscribes() {
        if (!place) return;
        TicketSubscribes_getByPlace({Id: place.Id}).then(result => {
            setSubscribesList(result.data.Data);
            if(introMode)
                OnChangeList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            setDeleteItem(null);
            TicketSubscribes_delete({Id: deleteItem.Id}).then(result => {
                getPlaceSubscribes();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (deleteItem) ? (
            <div>
                <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)}>
                    <DialogTitle>حذف</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"آیا حذف " + deleteItem.Name +" را تایید می کنید؟"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(null)}>لغو</Button>
                        <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        ) : (<></>)
    }

    function ModalAddSubscribe() {

        function addGate(e) {
            e.preventDefault()
            if (e.target.Name?.value?.length>35){
                error.showError({message: "عنوان طولانی است",});
                return;
            }
            setOpenModalAdd(false);
            TicketSubscribes_add({
                Name: e.target.Name.value,
                place: {Id: place.Id}
            }).then(result => {
                getPlaceSubscribes();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={addGate}>
                        <DialogTitle>افزودن عضویت جدید</DialogTitle>
                        <DialogContent>
                            <Typography variant={"caption"}>
                                برای افزودن عضویت جدید نام عضویت را وارد کنید
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"Name"}
                                label="نام عضویت"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <Typography variant={"caption"}>
                                مثال : 12 جلسه بدنسازی آقایان
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"contained"} color={"success"} type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }


    return (
        <>

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"عضویت های مجموعه"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        عضویت</Button>}

                />

            </Card>

            {subscribesList && subscribesList.map((item, number) => (
                <Card elevation={3} sx={{margin: 1}} key={"place-" + number}>

                    <CardActionArea href={introMode?(""):("/ticket/subscribe/" + item.Id)}>
                        <CardHeader
                            sx={(!introMode)&&{paddingBottom: 0}}
                            title={item.Name}
                            action={(!introMode)?(item.Enable) ? <ToggleOn color={"success"}/> : <ToggleOff color={"error"}/>:<>
                                <DeleteIcon onClick={(e) => setDeleteItem(item)} color={"primary"}/>
                            </>}
                        />

                        {!introMode&&<CardContent className={"row"} sx={{margin: 0}}>
                            <Typography className={"col-6"} variant={"subtitle2"} color={item.Gender ? "black" : "red"}
                                        alignItems="flex-start">
                                {"جنسیت : " + (item.Gender ? genders[item.Gender] : "نامشخص")}
                            </Typography>
                            <Typography className={"col-6"} variant={"subtitle2"}
                                        color={item.ExpireDuration ? "black" : "red"} alignItems="flex-start">
                                {"مهلت : " + (item.ExpireDuration ? item.ExpireDuration + " روز" : "نامشخص")}
                            </Typography>
                            <Typography className={"col-6"} variant={"subtitle2"}
                                        color={item.PlacePrice ? "black" : "red"} alignItems="flex-start">
                                {"قیمت : " + (item.PlacePrice ? toPriceWithComma(item.PlacePrice) + " تومان" : "نامشخص")}
                            </Typography>
                            <Typography className={"col-6"} variant={"subtitle2"}
                                        color={item.EntryTotalCount ? "black" : "red"} alignItems="flex-start">
                                {"تعداد ورود : " + (item.EntryTotalCount ? item.EntryTotalCount : "نامشخص")}
                            </Typography>
                            <Typography className={"col-6"} variant={"subtitle2"}
                                        color={item.SubscribeCapacity ? "black" : "red"} alignItems="flex-start">
                                {"قابل فروش : " + (item.SubscribeCapacity ? item.SubscribeCapacity : "نامشخص")}
                            </Typography>
                        </CardContent>}
                    </CardActionArea>
                </Card>
            ))}
            {ModalAddSubscribe()}
            {ModalDelete()}
        </>
    );
};

export default SubscribesList;
