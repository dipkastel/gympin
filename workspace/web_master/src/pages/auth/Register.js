import React, {useContext} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Link, TextField} from "@mui/material";
import {Formik} from "formik";
import {requestRegisterPlace} from "../../network/api/account.api";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";


export default function Register(props) {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item>
                <Card elevation={5} sx={{
                    borderRadius: 3,
                    margin: 2
                }}>
                    <CardHeader
                        sx={{
                            backgroundColor: "primary.main",
                            color: "#fff"
                        }}
                        title="ثبت مجموعه"
                    />
                    <CardContent>

                        <Formik
                            initialValues={{
                                username: "",
                                Name: "",
                                phoneNumber: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "نام و نام خانوادگی الزامی است";
                                }
                                if (!values.Name) {
                                    errors.Name = "نام مجموعه الزامی است";
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
                                    placeName: values.Name
                                }).then(result=>{
                                    if(result.data.Data){
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
                                            name="Name"
                                            type="username"
                                            label={"نام مجموعه"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.Name}
                                            helperText={touched.Name && errors.Name}
                                            error={Boolean(touched.Name && errors.Name)}
                                        />
                                        <TextField
                                            id="outlined-adornment-password"
                                            className="w-100"
                                            variant="outlined"
                                            margin="normal"
                                            name="phoneNumber"
                                            type="number"
                                            multiline={false}
                                            label={"شماره تماس"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                        />
                                    </div>

                                    <Button type={"submit"} variant={"contained"}>ثبت اطلاعات</Button>
                                </form>
                            )}
                        </Formik>
                    </CardContent>
                    <CardActions>
                        <Grid rowSpacing={1}>
                            <Link
                                variant="caption" href="/auth/login">ورود کنید</Link>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}
