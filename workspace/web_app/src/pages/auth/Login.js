import React, {useContext, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    Grid,
    Hidden,
    TextField,
    Typography
} from "@mui/material";
import {Formik} from "formik";
import {checkMobileValid, fixMobile} from "../../helper/utils";
import {Spinner} from "react-bootstrap";
import {login, registerWithInviteCode, sendSms} from "../../network/api/account.api";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/authActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

function Login(props) {

    const error = useContext(ErrorContext);
    const [resend, setResend] = useState(-3);
    const [notRegisterd, setNotRegisterd] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [mobileNumber, setMobileNumber] = useState(searchParams.get("u")?searchParams.get("u"):"");
    const [userInviteCode,SetUserInviteCode] = useState(searchParams.get("p"));
    const [fullName,setFullName] = useState("");

    function sendMessage(phoneNumber) {
        setMobileNumber(phoneNumber)
        if (checkMobileValid(mobileNumber)) {
            var count = 120;
            setResend(count);
            sendSms({
                "phoneNumber": mobileNumber.toString(),
                Application: "WEBAPP"
            })
                .then((data) => {
                    let interval = setInterval(() => {
                        if (count > 0) {
                            count--;
                            setResend(count);
                        } else clearInterval(interval);
                    }, 1000);
                }).catch((err) => {
                console.log(err)
                setResend(-3);
                try {
                    try {
                        if (err.response.data.Error.code == 1102)
                            setNotRegisterd(true);
                    } catch (error) {

                    }
                    if (err.response.data.Error.code != 1102)
                        error.showError({message: err.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا در برقراری ارتباط با سرور و یا شما اجازه دسترسی به این بخش را ندارید",});
                }
            })
        }
    }

    function RegisterPopup() {

        const submit = () => {
            setNotRegisterd(false);
            registerWithInviteCode({
                PhoneNumber:mobileNumber,
                FullName:fullName,
                InvitedBy:userInviteCode
            }).then((data) => {
                sendMessage(mobileNumber);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        };


        return (<>
            <Dialog
                className={"w-100"}
                open={notRegisterd}
                onClose={() => setNotRegisterd(false)}
            >
                <DialogTitle sx={{backgroundColor:"primary.main",color:"white"}}>{"ثبت نام"}</DialogTitle>
                <DialogContent>
                    <TextField
                        type="text"
                        margin="normal"
                        label={"نام و نام خانوادگی *"}
                        className="w-100"
                        name="FullName"
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        margin="normal"
                        label={"کد دعوت *"}
                        className="w-100"
                        name="inviteCode"
                        disabled={false}
                        value={userInviteCode}
                        onChange={(e)=>SetUserInviteCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={() => submit()}>ثبت</Button>
                </DialogActions>
            </Dialog>
        </>)
    }

    return (
        <>
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

                    }}>
                        <CardHeader
                            sx={{
                                backgroundColor: "primary.main",
                                color: "#fff"
                            }}
                            title="ورود"
                        />
                        <CardContent>

                            <Formik
                                initialValues={{
                                    username: mobileNumber,
                                    password: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.username.toString()) {
                                        errors.username = "شماره همراه الزامی است";
                                    }
                                    if (!checkMobileValid(values.username.toString())) {
                                        errors.username = "شماره همراه صحیح نیست";
                                    }

                                    if (!values.password) {
                                        errors.password = "کد پیامک شده الزامی است";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, {setStatus, setSubmitting}) => {
                                    setTimeout(() => {
                                        login({
                                            username: fixMobile(values.username),
                                            password: values.password,
                                            Application: "WEBAPP"
                                        })
                                            .then((data) => {
                                                props.SetUser(data.data.Data);
                                                props.SetToken(data.data.Data.Token);
                                                props.SetRefreshToken(data.data.Data.RefreshToken);
                                            })
                                            .catch((ex) => {
                                                setSubmitting(false);
                                                setStatus(
                                                    "اطلاعات وارد شده معتبر نیست"
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
                                                className="kt-width-full"
                                                variant="outlined"
                                                margin="normal"
                                                name="username"
                                                type="number"
                                                label={"شماره همراه"}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={fixMobile(values.username)}
                                                helperText={touched.username && errors.username}
                                                error={Boolean(touched.username && errors.username)}
                                            />
                                        </div>

                                        {(checkMobileValid(values.username.toString())) && (
                                            (resend > 0) ? (
                                                <div>
                                                    <Spinner animation="border" size="sm"/>
                                                    <Typography variant="body1" display="block"
                                                                gutterBottom>
                                                        {resend}
                                                    </Typography>
                                                </div>
                                            ) : <Button onClick={(e) => sendMessage(values.username.toString())} disabled={(resend > 0)}
                                                        variant={"contained"}>ارسال کد</Button>
                                        )
                                        }

                                        <Hidden lgDown={(resend < -1)} lgUp={(resend < -1)}>
                                            <div className="form-group"
                                            >
                                                <TextField
                                                    type="number"
                                                    margin="normal"
                                                    label={"کد پیامک"}
                                                    className="kt-width-full"
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    helperText={touched.password && errors.password}
                                                    error={Boolean(touched.password && errors.password)}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting}
                                            >ورود</Button>
                                        </Hidden>
                                    </form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
            {RegisterPopup()}
        </>
    );
}

export default connect(null, authActions)(Login)
