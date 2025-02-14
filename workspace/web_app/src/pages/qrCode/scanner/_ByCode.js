import React from 'react';
import {Button, Card, IconButton, InputAdornment, TextField} from "@mui/material";
import {Formik} from "formik";
import {Cameraswitch} from "@mui/icons-material";

const _ByCode = ({setCode,toCamera}) => {


    const AcceptLogin=(e, values)=> {
        e.preventDefault();
        setCode(values.code.toString())
    }

    return (<Formik
        initialValues={{
            code: "",
        }}
        validate={(values) => {
            const errors = {};
            if (!values.code) {
                errors.code = "ورود کد الزامی است";
                return errors;
            }
            return errors;

        }}
        onSubmit={(values, {setStatus, setSubmitting}) => {
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
                        type="text"
                        sx={{textAlign:"center",minWidth:"320px"}}
                        label={"کد زیر qr"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.code}
                        focused
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
                            endAdornment:(
                            <InputAdornment position="end">
                                <IconButton onClick={toCamera}>
                                    <Cameraswitch/>
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                </div>

            </form>
        )}
    </Formik>
    );
};

export default _ByCode;
