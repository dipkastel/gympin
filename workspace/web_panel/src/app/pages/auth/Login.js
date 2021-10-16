import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../api/auth.api";
import LanguageSelector from "../../partials/layout/LanguageSelector";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  return (
    <>
      <div className="kt-login__head" >
          <LanguageSelector iconType=""  />
      </div>

      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validate={values => {
              const errors = {};

              if (!values.username) {
                errors.username = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                login({
                  "username":values.username,
                  "password":values.password
                })
                  .then(data => {
                    disableLoading();
                    props.login(data.data.Data.token);
                  })
                  .catch((ex) => {
                    console.log(ex);
                    disableLoading();
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_LOGIN"
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
                ) : (""
                )}

                <div className="form-group">
                  <TextField
                    type="username"
                    label={intl.formatMessage({id: "AUTH.INPUT.USERNAME"})}
                    margin="normal"
                    className="kt-width-full"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    helperText={touched.username && errors.username}
                    error={Boolean(touched.username && errors.username)}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    type="password"
                    margin="normal"
                    label={intl.formatMessage({id: "AUTH.INPUT.PASSWORD"})}
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
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}
                    style={loadingButtonStyle}
                  >
                    {intl.formatMessage({id: "AUTH.GENERAL.SUBMIT_BUTTON"})}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}


export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);
