import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Formik} from "formik";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import {Hidden, IconButton, InputAdornment, TextField, Typography,} from "@mui/material";
import clsx from "clsx";
import {account_login, account_sendSms} from "../../network/api/auth.api";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import {Spinner} from "react-bootstrap";
import {checkMobileValid} from "../../helper";
import {authActions} from "../../helper/redux/actions/authActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

function Login(props) {
  const error = useContext(ErrorContext);
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(-3);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  function sendMessage(e, value) {
    if (checkMobileValid(value.username)) {
      account_sendSms({ phoneNumber: value.username,Application:"WEBPANEL" })
        .then((data) => {
          var count = 120;
          setResend(count);
          let interval = setInterval(() => {
            if (count > 0) {
              count--;
              setResend(count);
            } else clearInterval(interval);
          }, 1000);
        })
        .catch((err) => {
          alert(
            "خطا در برقراری ارتباط با سرور و یا شما اجازه دسترسی به این بخش را ندارید"
          );
        });
    }
  }

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              }
              if (!checkMobileValid(values.username)) {
                errors.username = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD",
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                account_login({
                  username: values.username,
                  password: values.password,
                  Application:"WEBPANEL"
                })
                  .then((data) => {
                    disableLoading();
                    props.SetUser(data.data.Data);
                    props.SetToken(data.data.Data.Token);
                    props.SetRefreshToken(data.data.Data.RefreshToken);
                  })
                  .catch((e) => {
                      try {
                        error.showError({message: e.response.data.Message,});
                      } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                      }
                    disableLoading();
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_LOGIN",
                      })
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
              isSubmitting,
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
                    type="username"
                    label={intl.formatMessage({ id: "AUTH.INPUT.PHONENUMBER" })}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    helperText={touched.username && errors.username}
                    error={Boolean(touched.username && errors.username)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            edge="start"
                            aria-label="Toggle password visibility"
                            disabled={resend > 0}
                            onClick={(e) => sendMessage(e, values)}
                          >
                            {checkMobileValid(values.username) &&
                              (resend > 0 ? (
                                <div>
                                  <Spinner animation="border" size="sm" />
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {resend}
                                  </Typography>
                                </div>
                              ) : (
                                <SendToMobileIcon />
                              ))}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <Hidden lgDown={resend < -1} lgUp={resend < -1}>
                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      label={intl.formatMessage({ id: "AUTH.INPUT.PASSWORD" })}
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="kt-login__actions">
                    <Link
                      to="/auth/forgot-password"
                      className="kt-link kt-login__link-forgot"
                    >
                      {/*<FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />*/}
                    </Link>
                    <button
                      id="kt_login_signin_submit"
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                        {
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                            loading,
                        }
                      )}`}
                      style={loadingButtonStyle}
                    >
                      {intl.formatMessage({ id: "AUTH.GENERAL.SUBMIT_BUTTON" })}
                    </button>
                  </div>
                </Hidden>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default injectIntl(connect(null, authActions)(Login));
