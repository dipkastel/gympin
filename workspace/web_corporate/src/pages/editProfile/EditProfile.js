import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid2 as Grid,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {media_AddImage, media_getCatById} from "../../network/api/multimedia.api";
import {Formik} from "formik";
import {user_updateAvatar, user_update} from "../../network/api/user.api";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {CircleStencil, FixedCropper} from 'react-advanced-cropper'
import 'date-fns/locale/fa-IR';
import 'react-advanced-cropper/dist/style.css';
import {resizeCanvas} from "../../helper/utils";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {format} from "date-fns";
import {BarChart, Edit} from "@mui/icons-material";

const EditProfile = (props) => {
    const error = useContext(ErrorContext);
    const [imageUrl, SetImageUrl] = useState("")
    const [imageToCrop, SetImageToCrop] = useState(null)
    const cropperRef = useRef(null);
    const currentUser = useSelector(state => state.auth.user)
    const [user, setUser] = useState(currentUser)
    const [ratio, setRatio] = useState(null)

    useEffect(() => {
        document.title = 'ویرایش پروفایل';
        SetImageUrl(currentUser?.Avatar?.Url || "")
        try {
            if (currentUser.Username && currentUser.FullName && currentUser.Gender && currentUser.Birthday && currentUser.NationalCode)
                props?.introCanGoNext(true);
        } catch (e) {
        }
    }, [currentUser]);

    useEffect(() => {
        props.RequestUser(user)
        getratio()
    }, []);

    function getratio() {
        media_getCatById({id: 2})
            .then(result => {
                setRatio(result.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function uploadImage(e) {

        let canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            if (canvas.height < ratio?.MINH) {
                error.showError({message: "تصویر کوچک است",});
                return;
            }
            if (canvas.height > ratio?.MAXH) {
                canvas = resizeCanvas(canvas, ratio?.MAXH, null);
            }
            canvas.toBlob((blob) => {
                if (blob) {
                    error.showError({message: "لطفا تا ارسال کامل تصویر صبر کنید."});
                    SetImageToCrop(null)
                    const formData = new FormData();
                    formData.append("MediaType", "IMAGE");
                    formData.append("File", blob);
                    formData.append("CategoryId", "2");
                    formData.append("Title", user.Username);
                    formData.append("Description", user.Id);
                    //
                    media_AddImage(formData)
                        .then(data => {
                            user_updateAvatar({
                                UserId: currentUser.Id,
                                MultimediaId: data.data.Data.Id
                            }).then(result => {
                                SetImageUrl(result.data.Data.Avatar ? (result.data.Data.Avatar.Url + "&width=200") : "")
                                error.showError({message: "با موفقیت ثبت شد",});
                                props.RequestUser(user)
                            }).catch(e => {
                                try {
                                    error.showError({message: e.response.data.Message});
                                } catch (f) {
                                    error.showError({message: "خطا نا مشخص",});
                                }
                            });
                        }).catch(e => {
                        try {
                            error.showError({message: e.response.data.Message,});
                        } catch (f) {
                            error.showError({message: "خطا نا مشخص",});
                        }
                    });
                }
            });


        }
    }


    function renderModalCrop() {

        const onChange = (cropper) => {

        };
        return (<>

            <Dialog
                className={"w-100"}
                open={!!imageToCrop} onClose={() => SetImageToCrop(null)}>
                <DialogContent>
                    <FixedCropper

                        ref={cropperRef}
                        src={imageToCrop}
                        stencilComponent={CircleStencil}
                        stencilProps={{
                            aspectRatio: 1,
                            handlers: false,
                            lines: false,
                            movable: false,
                            resizable: false

                        }}
                        stencilSize={{
                            width: ratio ? ratio.MAXW : 1000,
                            height: ratio ? ratio.MAXH : 1000,
                        }}
                        onChange={onChange}
                        className={'cropper'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={() => uploadImage()}>تایید</Button>
                </DialogActions>
            </Dialog>
        </>)
    }

    return (
        <>
            <Container maxWidth>


                <title>ویرایش پروفایل</title>

                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <Edit/>
                            <Typography sx={{px: 1}}>{"ویرایش پروفایل"}</Typography>
                        </Grid>
                    </Card>
                </Grid>
                <Grid container alignContent={"center"} columns={12}>
                    <Grid size={{xs: 12, sm: 5, md: 3}}>
                        <Card elevation={3} sx={{margin: 1, p: 2, justifyItems: "center",textAlign:"center"}}>
                            <label htmlFor="raised-button-file">
                                <Avatar
                                    sx={{width: 120, height: 120, marginTop: 3}}
                                    alt="userImage"
                                    src={imageUrl}
                                />
                            </label>
                            <Input
                                accept="image/*"
                                className={"input"}
                                style={{display: 'none'}}
                                id="raised-button-file"
                                onChange={(e) => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        SetImageToCrop(reader.result);
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }}
                                type="file"
                            />
                            <Typography sx={{mt: 3, mb: 1}} variant={"body2"}>فرمت ها jpeg jpg </Typography>
                            <Typography sx={{mb: 1}} variant={"body2"}>حد اکثر 1 مگابایت</Typography>
                            <Typography sx={{mb: 4}} variant={"body2"}>حداقل اندازه 300 پیکسل</Typography>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 12, sm: 7, md: 9}}>
                        <Card elevation={3} sx={{margin: 1, p: 2}}>
                            <Formik
                                initialValues={{
                                    Id: user.Id,
                                    AvatarId: user.AvatarId,
                                    Bio: user.Bio,
                                    Birthday: user.Birthday ? user.Birthday : "",
                                    Email: user.Email,
                                    FullName: user.FullName,
                                    Gender: user.Gender,
                                    NationalCode: user.NationalCode,
                                    PhoneNumber: user.PhoneNumber,
                                    Username: user.Username,

                                }}
                                onSubmit={(values, {setStatus, setSubmitting}) => {
                                    if (values?.Bio?.length > 220) {
                                        error.showError({message: "درباره من طولانی است.",});
                                        return;
                                    }

                                    if (values?.FullName?.length > 50) {
                                        error.showError({message: "نام و نام خانوادگی طولانی است.",});
                                        return;
                                    }
                                    if (!values?.FullName) {
                                        error.showError({message: "نام و نام خانوادگی الزامی است.",});
                                        return;
                                    }
                                    if (!values?.Gender) {
                                        error.showError({message: "جنسیت الزامی است.",});
                                        return;
                                    }
                                    if (!values?.Birthday) {
                                        error.showError({message: "تاریخ تولد الزامی است.",});
                                        return;
                                    }
                                    if (!values?.NationalCode) {
                                        error.showError({message: "کد ملی الزامی است.",});
                                        return;
                                    }
                                    if (values?.Email?.length > 50) {
                                        error.showError({message: "ایمیل طولانی است.",});
                                        return;
                                    }

                                    if (values?.Username?.length > 50) {
                                        error.showError({message: "نام کاربری طولانی است.",});
                                        return;
                                    }

                                    user_update(values).then(result => {
                                        setUser(result.data.Data);
                                        props.RequestUser(values)
                                        error.showError({message: "با موفقیت ثبت شد",});
                                    }).catch(e => {
                                        try {
                                            error.showError({message: e.response.data.Message,});
                                        } catch (f) {
                                            error.showError({message: "خطا نا مشخص",});
                                        }
                                    });
                                }}
                            >
                                {({
                                      values,
                                      status,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                      setFieldValue
                                  }) => (

                                    <Grid
                                        container
                                        direction={"row"}
                                        justifyContent="center"
                                        columns={2}
                                    >
                                        <Grid sx={{p: 1}} size={{sm: 2, md: 1}}>
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                disabled={true}
                                                variant="outlined"
                                                margin="normal"
                                                name="PhoneNumber"
                                                type="text"
                                                aria-readonly
                                                value={values.PhoneNumber || ""}
                                                label={"شماره همراه*"}
                                            />
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                variant="outlined"
                                                margin="normal"
                                                name="Username"
                                                type="text"
                                                value={values.Username || ""}
                                                onChange={e => setFieldValue("Username", e.target.value)}
                                                label={"نام کاربری*"}
                                            />
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                variant="outlined"
                                                margin="normal"
                                                name="FullName"
                                                type="text"
                                                value={values.FullName || ""}
                                                onChange={handleChange}
                                                label={"نام و نام خانوادگی*"}
                                            />

                                            <FormControl sx={{mt: 2}} variant={"outlined"} fullWidth>
                                                <InputLabel id="demo-simple-select-label">جنسیت * </InputLabel>
                                                <Select
                                                    className="w-100"
                                                    name="Gender"
                                                    onChange={e => {
                                                        setFieldValue("Gender", e.target.value)
                                                    }}
                                                    value={values.Gender || ""}
                                                    input={<OutlinedInput label="جنسیت*"/>}
                                                >
                                                    <MenuItem value={"FEMALE"}>خانم</MenuItem>
                                                    <MenuItem value={"MALE"}>آقا</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid sx={{p: 1}} size={{sm: 2, md: 1}}>
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                variant="outlined"
                                                margin="normal"
                                                name="NationalCode"
                                                type="text"
                                                value={values.NationalCode || ""}
                                                onChange={handleChange}
                                                label={"کد ملی*"}
                                            />

                                            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                                                <DatePicker
                                                    disableFuture
                                                    sx={{mt:2,mb:1}}
                                                    label={"تاریخ تولد*"}
                                                    value={new Date(values.Birthday)}
                                                    className="w-100"
                                                    onChange={(e, w) => {
                                                        setFieldValue('Birthday', format(Date.parse(e), "yyyy-MM-dd"))
                                                    }}
                                                />
                                            </LocalizationProvider>
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                variant="outlined"
                                                margin="normal"
                                                name="Email"
                                                type="text"
                                                value={values.Email || ""}
                                                onChange={handleChange}
                                                label={"ایمیل"}
                                            />
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-password"
                                                className="w-100"
                                                variant="outlined"
                                                multiline
                                                margin="normal"
                                                name="Bio"
                                                type="text"
                                                value={values.Bio || ""}
                                                onChange={handleChange}
                                                label={"درباره من (" + (220 - values?.Bio?.length || 0) + ")"}
                                            />

                                        </Grid>
                                        <Grid sx={{p: 1}} size={{sm: 2}} textAlign={"end"}>
                                            <Button sx={{px: 8}} variant={"contained"}
                                                    onClick={handleSubmit}>ثبت</Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Formik>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
            {renderModalCrop()}
        </>
    );
};

export default connect(null, sagaActions)(EditProfile);
