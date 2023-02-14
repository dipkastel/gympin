import React, {useState} from "react";
import {login} from "../../network/api/account.api";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Link, TextField} from "@mui/material";
import {Formik} from "formik";


export default function Register(props) {

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
                                setTimeout(() => {
                                    login({
                                        username: values.username,
                                        password: values.password,
                                    })
                                        .then((data) => {
                                            props.SetUser(data.data.Data);
                                            props.SetToken(data.data.Data.Token);
                                            props.SetRefreshToken(data.data.Data.RefreshToken);
                                        })
                                        .catch((ex) => {
                                            console.log(ex);
                                            setSubmitting(false);
                                            setStatus(
                                                "اطلاعات وارد شده معتبر نبست"
                                            );
                                        });
                                }, 1000);
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
                                            type="username"
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
