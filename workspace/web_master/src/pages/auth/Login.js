import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Hidden,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {Formik} from "formik";
import {checkMobileValid} from "../../helper/utils";
import {Spinner} from "react-bootstrap";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import {login, sendSms} from "../../network/api/account.api";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/authActions";

function Login(props) {

    const [loading, setLoading] = useState(false);
    const [resend, setResend] = useState(-3);
    const [loadingButtonStyle, setLoadingButtonStyle] = useState({
        paddingRight: "2.5rem",
    });

    const enableLoading = () => {
        setLoading(true);
        setLoadingButtonStyle({paddingRight: "3.5rem"});
    };

    const disableLoading = () => {
        setLoading(false);
        setLoadingButtonStyle({paddingRight: "2.5rem"});
    };

    function sendMessage(e, value) {
        if (checkMobileValid(value.username)) {
            var count = 120;
            setResend(count);
            sendSms({"phoneNumber":value.username})
                .then((data) => {
                    let interval = setInterval(() => {
                        if (count > 0) {
                            count--;
                            setResend(count);
                        } else clearInterval(interval);
                    }, 1000);
                }).catch((err)=>{
                setResend(-3);
                alert("خطا در برقراری ارتباط با سرور و یا شما اجازه دسترسی به این بخش را ندارید")
            })
        }
    }


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
                            color:"white"
                        }}
                        title="ورود"
                    />
                    <CardContent>

                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "شماره همراه الزامی است";
                                }
                                if (!checkMobileValid(values.username)) {
                                    errors.username = "شماره همراه صحیح نیست";
                                }

                                if (!values.password) {
                                    errors.password = "کد پیامک شده الزامی است";
                                }

                                return errors;
                            }}
                            onSubmit={(values, {setStatus, setSubmitting}) => {
                                enableLoading();
                                setTimeout(() => {
                                    login({
                                        username: values.username,
                                        password: values.password,
                                    })
                                        .then((data) => {
                                            disableLoading();
                                             props.SetUser(data.data.Data);
                                             props.SetToken(data.data.Data.Token);
                                             props.SetRefreshToken(data.data.Data.RefreshToken);
                                        })
                                        .catch((ex) => {
                                            disableLoading();
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
                                            className="kt-width-full"
                                            variant="outlined"
                                            margin="normal"
                                            name="username"
                                            type="number"
                                            label={"شماره همراه"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            disabled={resend>0}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(touched.username && errors.username)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                            {(checkMobileValid(values.username)) && (
                                                                (resend > 0)&&(
                                                                    <div>
                                                                        <Spinner animation="border" size="sm"/>
                                                                        <Typography variant="caption" display="block"
                                                                                    gutterBottom>
                                                                            {resend}
                                                                        </Typography>
                                                                    </div>
                                                                )
                                                            )
                                                            }
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div >
                                            {(checkMobileValid(values.username)) && (
                                                !(resend > 0)&&
                                                    <Button
                                                        disabled={resend > 0}
                                                        variant={"contained"}
                                                        onClick={(e) => sendMessage(e, values)}>ارسال کد</Button>
                                            )
                                            }

                                    </div>

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
                    <CardActions>
                        <Grid rowSpacing={1}>
                            <Link variant="caption"  href="/auth/register">مرکز را ثبت نام کنید</Link>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}
export default connect(null, authActions)(Login)
