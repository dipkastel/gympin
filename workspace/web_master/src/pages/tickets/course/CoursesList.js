import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {
    Button,
    Card, CardActionArea, CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {TicketCourses_add, TicketCourses_delete, TicketCourses_getByPlace} from "../../../network/api/ticketCourse.api";
import {ToggleOff, ToggleOn} from "@mui/icons-material";
import {genders} from "../../../helper/enums/genders";
import {toPriceWithComma} from "../../../helper/utils";
import {CourseStatusEnum} from "../../../helper/enums/CourseStatusEnum";
import {getWizardComplete} from "../../../helper/pocket";
import {TicketSubscribes_delete} from "../../../network/api/ticketSubscribe.api";
import DeleteIcon from "@mui/icons-material/Delete";

const CoursesList = ({OnChangeList}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [coursesList, setCoursesList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    const introMode = !getWizardComplete()



    useEffect(() => {
        document.title = 'مدیریت کلاس ها';
        getPlaceCourses();
    }, []);

    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            setDeleteItem(null);
            TicketCourses_delete({Id: deleteItem.Id}).then(result => {
                getPlaceCourses();
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

    function getPlaceCourses() {
        if (!place) return;
        TicketCourses_getByPlace({Id: place.Id}).then(result => {
            setCoursesList(result.data.Data);
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


    function ModalAddCourse() {

        function addCourse(e) {
            e.preventDefault()
            if (e.target.Name?.value?.length>35){
                error.showError({message: "عنوان طولانی است",});
                return;
            }
            TicketCourses_add({
                Name: e.target.Name.value,
                place: {Id: place.Id}
            }).then(result => {
                getPlaceCourses();
                setOpenModalAdd(false)
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
                    <Form onSubmit={addCourse}>
                        <DialogTitle>افزودن کلاس جدید</DialogTitle>
                        <DialogContent>
                            <Typography variant={"caption"}>
                                برای افزودن کلاس جدید نام کلاس را وارد کنید
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"Name"}
                                label="نام کلاس"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <Typography variant={"caption"}>
                                مثال : تکواندو
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

            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"کلاس های مجموعه"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        کلاس</Button>}

                />

            </Card>

            {coursesList && coursesList.map((item, number) => (
                <Card elevation={3} sx={{borderRadius: 3,margin: 1}} key={"place-" + number}>

                    <CardActionArea href={introMode?(""):("/ticket/course/" + item.Id)}>
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
                            <Typography className={"col-6"} variant={"subtitle2"} color={item.ClassCapacity ? "black" : "red"}
                                        alignItems="flex-start">
                                {"ضرفیت کلاس : " + (item.ClassCapacity || "نامشخص")}
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
                                        color={item.CourseCapacity ? "black" : "red"} alignItems="flex-start">
                                {"قابل فروش : " + (item.CourseCapacity ? item.CourseCapacity : "نامشخص")}
                            </Typography>
                            <Typography className={"col-6"} variant={"subtitle2"}
                                        color={item.Status ? "black" : "red"} alignItems="flex-start">
                                {"نوع : " + (item.Status ? CourseStatusEnum[item.Status] : "نامشخص")}
                            </Typography>
                            {item.StartDate&&<Typography className={"col-12"} variant={"subtitle2"}
                                        color={item.StartDate ? "black" : "red"} alignItems="flex-start">
                                {"شروع کلاس : " + (item.StartDate ? new Date(item.StartDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }): "نامشخص")}
                            </Typography>}
                            {item.EndDate&& <Typography className={"col-12"} variant={"subtitle2"}
                                        color={item.EndDate ? "black" : "red"} alignItems="flex-start">
                                {"پایان کلاس : " + (item.EndDate ? new Date(item.EndDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }): "نامشخص")}
                            </Typography>}
                            {item.AgeLimit&&<Typography className={"col-12"} variant={"subtitle2"} color={item.AgeLimit ? "black" : "red"}
                                        alignItems="flex-start">
                                {"محدوده سنی : " + (item.AgeLimit|| "نامشخص")}
                            </Typography>}
                            {item.CourseLevel&&<Typography className={"col-12"} variant={"subtitle2"} color={item.CourseLevel ? "black" : "red"}
                                        alignItems="flex-start">
                                {"سطح کلاس : " + (item.CourseLevel|| "نامشخص")}
                            </Typography>}
                            {item.Description&&<Typography className={"col-12"} variant={"subtitle2"}
                                         color={"black"}
                                         alignItems="flex-start">
                                {"توضیح : " + (item.Description || "نامشخص")}
                            </Typography>}
                        </CardContent>}
                    </CardActionArea>
                </Card>
            ))}
            {ModalAddCourse()}
            {ModalDelete()}
        </>
    );
};

export default CoursesList;
