import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Button,
    Card, CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl, FormHelperText,
    Grid,
    Input, InputLabel, MenuItem, OutlinedInput, Select,
    TextField
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {media_AddImage, media_getCatById} from "../../network/api/multimedia.api";
import {Formik} from "formik";
import AdapterJalaali from '@date-io/jalaali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {user_updateAvatar, user_updateMe} from "../../network/api/user.api";
import {format} from "date-fns";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {CircleStencil, FixedCropper} from 'react-advanced-cropper'
import 'date-fns/locale/fa-IR';
import 'react-advanced-cropper/dist/style.css';
import {resizeCanvas} from "../../helper/utils";

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
        SetImageUrl(currentUser?.Avatar?.Url||"")
        if(currentUser.Username&&currentUser.FullName&&currentUser.Gender&&currentUser.Birthday&&currentUser.NationalCode)
            props?.introCanGoNext(true);
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
            console.log(cropper.getCoordinates(), cropper.getCanvas());

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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title="پروفایل من"/>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

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
                            if(values?.Bio?.length>220){
                                error.showError({message: "درباره من طولانی است.",});
                                return;
                            }

                            if(values?.FullName?.length>50){
                                error.showError({message: "نام و نام خانوادگی طولانی است.",});
                                return;
                            }
                            if(!values?.FullName){
                                error.showError({message: "نام و نام خانوادگی الزامی است.",});
                                return;
                            }
                            if(!values?.Gender){
                                error.showError({message: "جنسیت الزامی است.",});
                                return;
                            }
                            if(!values?.Birthday){
                                error.showError({message: "تاریخ تولد الزامی است.",});
                                return;
                            }
                            if(!values?.NationalCode){
                                error.showError({message: "کد ملی الزامی است.",});
                                return;
                            }
                            if(values?.Email?.length>50){
                                error.showError({message: "ایمیل طولانی است.",});
                                return;
                            }

                            if(values?.Username?.length>50){
                                error.showError({message: "نام کاربری طولانی است.",});
                                return;
                            }

                            user_updateMe(values).then(result => {
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
                            <>
                                <div className="form-group p-4">
                                    <TextField
                                        fullWidth
                                        id="outlined-adornment-password"
                                        className="w-100"
                                        variant="outlined"
                                        margin="normal"
                                        name="PhoneNumber"
                                        type="text"
                                        aria-readonly
                                        value={values.PhoneNumber || ""}
                                        label={"شماره همراه"}
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
                                        label={"نام کاربری"}
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
                                        label={"نام و نام خانوادگی"}
                                    />

                                    <FormControl sx={{mt:2}} variant={"outlined"} fullWidth >
                                        <InputLabel id="demo-simple-select-label">جنسیت * </InputLabel>
                                        <Select
                                            className="w-100"
                                            name="Gender"
                                            onChange={e => {
                                                setFieldValue("Gender", e.target.value)
                                            }}
                                            value={values.Gender||""}
                                            input={<OutlinedInput label="جنسیت * " />}
                                        >
                                            <MenuItem value={"FEMALE"} >خانم</MenuItem>
                                            <MenuItem value={"MALE"}>آقا</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <LocalizationProvider
                                        dateAdapter={AdapterJalaali} adapterLocale={"fa-IR"}>
                                        <DatePicker
                                            variant="outlined"
                                            onChange={(e, w) => {
                                                setFieldValue('Birthday', format(Date.parse(e), "yyyy-MM-dd"))
                                            }}
                                            toolbarFormat={"jYYYY/jMM/jDD"}
                                            inputFormat={"jYYYY/jMM/jDD"}
                                            value={values.Birthday || ""}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    className="w-100 ltr"
                                                    variant="outlined"
                                                    margin="normal"
                                                    label={"تاریخ تولد"}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>

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
                                        label={"کد ملی"}
                                    />
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
                                        label={"درباره من ("+(220-values?.Bio?.length||0)+")"}
                                    />
                                    <Button className="mt-4" variant={"contained"} fullWidth
                                            onClick={handleSubmit}>ثبت</Button>
                                </div>

                            </>
                        )}
                    </Formik>

                </Grid>
            </Card>
            {renderModalCrop()}
        </>
    );
};

export default connect(null, sagaActions)(EditProfile);
