import React, {useContext, useEffect, useState} from "react";
import {login, requestRegisterPlace} from "../../network/api/account.api";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Link, TextField} from "@mui/material";
import {Formik} from "formik";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";


function Register(props) {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);

    useEffect(() => {
        document.title = 'درخواست عضویت';
    }, []);


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item >
                <Card elevation={5} sx={{
                    borderRadius:3,
                    margin:1
                }}>
                    <CardHeader
                        sx={{
                            backgroundColor:"primary.main",
                            color:"#fff"
                        }}
                        title="ثبت مجموعه"
                    />
                    <CardContent>

                        <Formik
                            initialValues={{
                                username: "",
                                corporateName: "",
                                phoneNumber: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "نام و نام خانوادگی الزامی است";
                                }
                                if (!values.corporateName) {
                                    errors.corporateName = "نام مجموعه الزامی است";
                                }
                                if (!values.phoneNumber) {
                                    errors.phoneNumber = "شماره تماس الزامی است";
                                }

                                return errors;
                            }}
                            onSubmit={(values, {setStatus, setSubmitting}) => {
                                requestRegisterPlace({
                                    PhoneNumber: values.phoneNumber,
                                    fullName: values.username,
                                    placeName: values.corporateName
                                }).then(result => {
                                    if (result.data.Data) {
                                        alert("درخواست شما ثبت شد به زودی با شما تماس خواهیم گرفت")
                                        navigate('/auth/login', {replace: true});
                                    }
                                }).catch(e => {
                                    try {
                                        error.showError({message: e.response.data.Message,});
                                    } catch (f) {
                                        error.showError({message: "خطا نا مشخص",});
                                    }
                                })
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
                                  isSubmitting
                              }) => (
                                <form
                                    noValidate={true}
                                    autoComplete="off"
                                    className="kt-form"
                                    onSubmit={handleSubmit}
                                >
                                    {status ? (
                                        <div role="alert" className="alert alert-danger">
                                            <div className="alert-text">{status}</div>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    <div className="form-group">
                                        <TextField
                                            id="outlined-adornment-password"
                                            className="w-100"
                                            variant="outlined"
                                            margin="normal"
                                            name="username"
                                            type="username"
                                            label={"نام و نام خانوادگی"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(touched.username && errors.username)}
                                        />
                                        <TextField
                                            id="outlined-adornment-password"
                                            className="w-100"
                                            variant="outlined"
                                            margin="normal"
                                            name="corporateName"
                                            type="text"
                                            label={"نام مجموعه"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.corporateName}
                                            helperText={touched.corporateName && errors.corporateName}
                                            error={Boolean(touched.corporateName && errors.corporateName)}
                                        />
                                        <TextField
                                            id="outlined-adornment-password"
                                            className="w-100"
                                            variant="outlined"
                                            margin="normal"
                                            name="phoneNumber"
                                            type="tel"
                                            multiline={false}
                                            label={"شماره تماس"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                        />
                                    </div>

                                    <Button type={"submit"} variant={"contained"} >ثبت اطلاعات</Button>
                                </form>
                            )}
                        </Formik>
                    </CardContent>
                    <CardActions>
                        <Grid rowSpacing={1}>
                            <Link
                                variant="caption"  href="/auth/login">ورود کنید</Link>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}

export default connect(null, authActions)(Register)
