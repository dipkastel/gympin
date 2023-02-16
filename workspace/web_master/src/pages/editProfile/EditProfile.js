import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Card, Grid, Input, TextField} from "@mui/material";
import {compareObjs} from "../../helper/utils";
import {connect, useSelector} from "react-redux";
import {media_AddImage} from "../../network/api/multimedia.api";
import {Formik} from "formik";
import AdapterJalaali from '@date-io/jalaali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {user_updateAvatar, user_updateMe} from "../../network/api/user.api";
import {format} from "date-fns";
import 'date-fns/locale/fa-IR';
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";

const EditProfile = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [imageUrl, SetImageUrl] = useState("")
    const currentUser = useSelector(state => state.auth.user)
    const [user, setUser] = useState(currentUser)
    useEffect(() => {
        props.RequestUser(user)
    }, []);
    useEffect(() => {
        SetImageUrl(user.Avatar ? user.Avatar.Url : "")
    }, [currentUser]);

    function ChangeAvatar(e) {
        if (e.type === "change") {
            const formData = new FormData();
            formData.append("MediaType", "IMAGE");
            formData.append("File", e.target.files[0]);
            formData.append("CategoryId", "2");
            formData.append("Title", user.Username);
            formData.append("Description", user.Id);
            //
            media_AddImage(formData)
                .then(data => {
                    user_updateAvatar({UserId: currentUser.Id, MultimediaId: data.data.Data.Id}).then(result => {
                        SetImageUrl(result.data.Data.Avatar ? (result.data.Data.Avatar.Url || "") : "")
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
            })


        }
    }

    return (

        <Card elevation={3} sx={{margin: 1}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                <label htmlFor="raised-button-file">
                    <Avatar
                        sx={{width: 120, height: 120, marginTop: 3}}
                        alt="Remy Sharp"
                        src={imageUrl}
                    />
                </label>
                <Input
                    accept="image/*"
                    className={"input"}
                    style={{display: 'none'}}
                    id="raised-button-file"
                    onChange={ChangeAvatar}
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
                        NationalCode: user.NationalCode,
                        PhoneNumber: user.PhoneNumber,
                        Username: user.Username,

                    }}
                    onSubmit={(values, {setStatus, setSubmitting}) => {
                        user_updateMe(values).then(result => {
                            setUser(result.data.Data);
                            props.RequestUser(values)
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
                                    value={values.PhoneNumber||""}
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
                                    value={values.Username||""}
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
                                    value={values.FullName||""}
                                    onChange={handleChange}
                                    label={"نام و نام خانوادگی"}
                                />

                                <LocalizationProvider
                                    dateAdapter={AdapterJalaali} adapterLocale={"fa-IR"}>
                                    <DatePicker
                                        variant="outlined"
                                        onChange={(e, w) => {
                                            setFieldValue('Birthday', format(Date.parse(e), "yyyy-MM-dd"))
                                        }}
                                        toolbarFormat={"jYYYY/jMM/jDD"}
                                        inputFormat={"jYYYY/jMM/jDD"}
                                        value={values.Birthday||""}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                fullWidth
                                                className="w-100"
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
                                    value={values.NationalCode||""}
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
                                    value={values.Email||""}
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
                                    value={values.Bio||""}
                                    onChange={handleChange}
                                    label={"درباره من"}
                                />
                                <Button className="mt-4" variant={"contained"} fullWidth
                                        onClick={handleSubmit}>ثبت</Button>
                            </div>

                        </>
                    )}
                </Formik>

            </Grid>
        </Card>
    );
};

export default connect(null, sagaActions)(EditProfile);
