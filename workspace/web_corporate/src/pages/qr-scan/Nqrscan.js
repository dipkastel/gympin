import React, {useState} from 'react';
import QRScan from "./myScanner";
import {Avatar, Button, Card, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {Formik} from "formik";

let user = {
    userId: 1,
    gateName: "ورودی بدنسازی",
    sportName: "بدنسازی",
    image: "/assets/images/1.jpg",
    userName: "ابراهیم گلستان",
    enterCode: "55826654"
}

const Nqrscan = (props) => {
    const [LoginComplete, SetLoginComplete] = useState(false)
    const onFind = (value) => {
        console.log(value)
        if (value === user.enterCode) {
            SetLoginComplete(true)
        }
    }

    function AcceptLogin(e, values) {

    }

    return (
        <div>

            <Paper
                sx={{
                    padding: 1,
                    margin: 2,
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: () => LoginComplete ? '#d5f579' : '#ffffff',
                }}
            >
                <Grid wrap="nowrap" container>
                    <Grid item container>
                        <Typography variant="h5" display={"contents"}>
                            {user.userName}
                        </Typography>
                        <br/>
                        <Typography variant="body1" display={"contents"}>
                            {user.sportName}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="text.secondary" display={"contents"}>
                            {user.gateName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{width: "100%", height: "100%"}} alt="Remy Sharp" src={toAbsoluteUrl(user.image)}/>
                    </Grid>
                </Grid>
            </Paper>
            <Card elevation={3} sx={{
                margin: 2,
                height: "66vw"
            }}>
                <QRScan onFind={onFind}/>
            </Card>
            <Card elevation={3} sx={{
                margin: 2,
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
                        //             console.log(ex);
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
        </div>
    );
};

export default Nqrscan;
