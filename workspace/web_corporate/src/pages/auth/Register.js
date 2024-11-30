import React, {useContext, useEffect, useState} from "react";
import {requestRegisterPlace} from "../../network/api/account.api";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, CircularProgress,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {Formik} from "formik";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";


function Register(props) {
    const pageStates = {CL: 0, LO: 1, TX: 2}
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const [formStatus, setFormStatus] = useState(pageStates.CL);

    useEffect(() => {
        document.title = 'درخواست عضویت';
    }, []);


    function clearForm() {
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
                        margin: 1
                    }}>
                        <CardHeader
                            sx={{
                                backgroundColor: "primary.main",
                                color: "#fff"
                            }}
                            title="فرم درخواست ثبت سازمان"
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
                                        errors.corporateName = "نام شرکت یا سازمان الزامی است";
                                    }
                                    if (!values.phoneNumber) {
                                        errors.phoneNumber = "شماره تماس الزامی است";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, {setStatus, setSubmitting}) => {
                                    setFormStatus(pageStates.LO);
                                    requestRegisterPlace({
                                        PhoneNumber: values.phoneNumber,
                                        FullName: values.username,
                                        Text: values.corporateName
                                    }).then(result => {

                                        if (result.data.Data) {
                                            setFormStatus(pageStates.TX);
                                        }else {
                                            setFormStatus(pageStates.CL);
                                        }
                                    }).catch(e => {
                                        setFormStatus(pageStates.CL);
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
                                                label={"نام شرکت یا سازمان"}
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
        )

    }

    function loading() {
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
                            title="ثبت شرکت یا سازمان"
                        />
                        <CardContent sx={{textAlign: "center"}}>
                            <Typography variant={"body1"}>
                                لطفا کمی صبر کنید
                            </Typography>
                            <CircularProgress sx={{m: 3}}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    function thankyou(){
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
                            title="ثبت سازمان"
                        />
                        <CardContent sx={{textAlign:"center"}}>
                            <Alert severity="success" sx={{px:1}}>
                                <Typography variant={"body1"} sx={{px:1}} >درخواست شما ثبت شد به زودی با شما تماس خواهیم گرفت</Typography>
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>)
    }

    switch(formStatus){
        case pageStates.CL: return clearForm();
        case pageStates.LO: return loading();
        case pageStates.TX: return thankyou();
    }
}


export default connect(null, authActions)(Register)
