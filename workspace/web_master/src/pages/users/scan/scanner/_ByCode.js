import React from 'react';
import {Button, Card, InputAdornment, TextField} from "@mui/material";
import {Formik} from "formik";

const _ByCode = (props) => {


    const AcceptLogin=(e, values)=> {

    }

    return (
        <>

            <Card elevation={3} sx={{
                marginX:2 ,marginTop:2,marginBottom:0.5
            }}>

                <Formik
                    initialValues={{
                        code: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.code) {
                            errors.code = "ورود کد الزامی است";
                            return errors;
                        }

                        if (values.code.toString().length < 7 || values.code.toString().length > 9) {
                            errors.code = "کد وارد شده صحیح نیست";
                            return errors;
                        }
                        return errors;

                    }}
                    onSubmit={(values, {setStatus, setSubmitting}) => {
                        // setTimeout(() => {
                        //     login({
                        //         username: values.username,
                        //         password: values.password,
                        //     })
                        //         .then((data) => {
                        //             props.login(data.data.Data.Token);
                        //         })
                        //         .catch((ex) => {
                        //             setSubmitting(false);
                        //             setStatus(
                        //                 "اطلاعات وارد شده معتبر نبست"
                        //             );
                        //         });
                        // }, 1000);
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
                            className="container"
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
                                    name="code"
                                    type="number"
                                    label={"کد زیر qr"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.code}
                                    helperText={touched.code && errors.code}
                                    error={Boolean(touched.code && errors.code)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Button
                                                    edge="start"
                                                    aria-label="Toggle password visibility"
                                                    onClick={(e) => AcceptLogin(e, values)}
                                                    variant={"contained"}
                                                > ثبت
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                        </form>
                    )}
                </Formik>
            </Card>
        </>
    );
};

export default _ByCode;
