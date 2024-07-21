import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {checkNationalCode, checkUsername, compareObjs} from "../../../helper/utils";
import {connect, useSelector} from "react-redux";
import {Formik} from "formik";
import {user_checkUsernameAvailable, user_updateMe} from "../../../network/api/user.api";
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useNavigate} from "react-router-dom";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _EditImage from "./_EditImage";
import {Form} from "react-bootstrap";

const EditProfile = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(useSelector(state => state.auth.user))
    const [user, setUser] = useState(useSelector(state => state.auth.user))
    const [canSubmit, setCanSubmit] = useState(true);
    const [username, setUsername] = useState(user.Username);
    const [usernameAvalableError, setUsernameAvalableError] = useState();

    useEffect(() => {
        document.title = 'ویرایش پروفایل';
        props.RequestUser()
        if (!compareObjs(currentUser, user))
            window.location = window.location
    }, []);

    useEffect(() => {
        var can = true;
            if (!currentUser.FullName) can=false;
            if (!currentUser.Gender) can=false;
            if (!currentUser.Birthday) can=false;
            if (!checkNationalCode(currentUser.NationalCode)) can=false;
            if(!!usernameAvalableError) can=false;
            if(currentUser?.Bio?.length>220) can=false;
            setCanSubmit(can);
    }, [currentUser,usernameAvalableError]);

    useEffect(() => {
        setUsernameAvalableError("درحال بررسی ....");
        setFieldValue("Username",username);

        const delayDebounceFn = setTimeout(() => {
            checkUsernameAvalable()
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [username])


    function submitForm(el) {
        el.preventDefault();

        user_updateMe(currentUser).then(result => {
            props.RequestUser()
            setUser(result.data.Data);
            navigate(-1);
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setFieldValue(name, value) {
        setCurrentUser(lastUser => {
            return {...lastUser, [name]: value}
        })
    }

    function checkUsernameAvalable() {
        if(username==user.Username) {
            setUsernameAvalableError(null);
            return;
        }
        if(checkUsername(username)) {
            setUsernameAvalableError( "حروف ، اعداد و _ و - مجاز است");
            return;
        }
            new Promise(resolve => user_checkUsernameAvailable(username).then((result) => {
                if (!result.data.Data) {
                    setUsernameAvalableError( "نام کاربری قبلا توسط کاربر دیگری دریافت شده.");
                } else {
                    setUsernameAvalableError(null);
                }
            }).catch(e => {
                try {
                    setUsernameAvalableError( e.response.data.Message);
                } catch (f) {
                    setUsernameAvalableError( "خطا نا مشخص");
                }
            }));
    }


    function getValidation(name, value) {
        switch (name) {
                case "FullName": {
                    if (!value) {
                        return  "نام و نام خانوادگی الزامی است";
                    }
                    break
                }
                case "Gender": {
                    if (!value) {
                        return  "جنسیت الزامی است";
                    }
                    break
                }

                case "Birthday": {
                    if (!value) {
                        return  "تاریخ تولد الزامی است";
                    }
                    break
                }
                case "NationalCode": {
                    if (!value || !value.toString()) {
                        return  "کد ملی الزامی است";
                    }
                    if (!checkNationalCode(value.toString())) {
                        return  "کد ملی صحیح نیست";
                    }
                    break
                }
                case "Email": {
                    return ;
                }
                case "Bio": {
                    if(value.length>220){
                        return "درباره من طولانی است.";
                    }
                    break;
                }
            }

    }

    return (

        <Card elevation={3} sx={{margin: 1}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {user && <_EditImage user={user} RequestUser={() => props.RequestUser()}/>}
                <form onSubmit={e => submitForm(e)}>
                    <div className="form-group p-4">
                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="PhoneNumber"
                            type="text"
                            aria-readonly
                            value={currentUser.PhoneNumber || ""}
                            color={(currentUser.PhoneNumber) ? "error" : "success"}
                            label={"شماره همراه * "}
                        />
                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="Username"
                            type="text"
                            value={username || ""}
                            onChange={e => setUsername(e.target.value)}
                            label={"نام کاربری * "}
                            helpertext={currentUser.Username}
                            color={!!usernameAvalableError ? "error" : "success"}
                            error={!!usernameAvalableError}
                            helperText={usernameAvalableError}
                        />
                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="FullName"
                            type="text"
                            value={currentUser.FullName||""}
                            onChange={e => {
                                setFieldValue("FullName", e.target.value)
                            }}
                            label={"نام و نام خانوادگی * "}
                            color={!!getValidation("FullName",currentUser.FullName)?"error":"success"}
                            error={!!getValidation("FullName",currentUser.FullName)}
                            helperText={getValidation("FullName",currentUser.FullName)}
                        />
                        <FormControl sx={{mt:2}} variant={"outlined"} fullWidth error={!!getValidation("Gender",currentUser.Gender)}>
                            <InputLabel
                                color={!!getValidation("Gender",currentUser.Gender)?"error":"success"} id="demo-simple-select-label">جنسیت * </InputLabel>
                            <Select
                                className="w-100"
                                name="Gender"
                                onChange={e => {
                                    setFieldValue("Gender", e.target.value)
                                }}
                                value={currentUser.Gender||""}
                                input={<OutlinedInput label="جنسیت * " />}
                                color={!!getValidation("Gender",currentUser.Gender)?"error":"success"}
                            >
                                <MenuItem value={"FEMALE"} >خانم</MenuItem>
                                <MenuItem value={"MALE"}>آقا</MenuItem>
                            </Select>
                            <FormHelperText
                                color={!!getValidation("Gender",currentUser.Gender)?"error":"success"}
                            >{getValidation("Gender",currentUser.Gender)}</FormHelperText>
                        </FormControl>
                        <LocalizationProvider
                            dateAdapter={AdapterJalali}>
                            <DatePicker

                                variant="outlined"
                                mask="____/__/__"
                                value={currentUser.Birthday||""}
                                onChange={(e,w)=>{
                                    setFieldValue('Birthday', Date.parse(e))
                                }}
                                renderInput={(params) =>

                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{mt:3,direction:"ltr"}}
                                        id="outlined-adornment-password"
                                        className="w-100"
                                        variant="outlined"
                                        margin="normal"
                                        label={"تاریخ تولد * "}
                                        color={!!getValidation("Birthday",currentUser.Birthday)?"error":"success"}
                                        error={!!getValidation("Birthday",currentUser.Birthday)}
                                        helperText={getValidation("Birthday",currentUser.Birthday)}
                                    />
                                }
                            />
                        </LocalizationProvider>

                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="NationalCode"
                            type="text"
                            value={currentUser.NationalCode||""}
                            onChange={e => {
                                setFieldValue("NationalCode", e.target.value)
                            }}
                            label={"کد ملی * "}
                            color={!!getValidation("NationalCode",currentUser.NationalCode)?"error":"success"}
                            error={!!getValidation("NationalCode",currentUser.NationalCode)}
                            helperText={getValidation("NationalCode",currentUser.NationalCode)}
                        />
                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="Email"
                            type="text"
                            value={currentUser.Email||""}
                            onChange={e => {
                                setFieldValue("Email", e.target.value)
                            }}
                            label={"ایمیل (اختیاری)"}
                            color={!!getValidation("Email",currentUser.Email)?"error":"success"}
                            error={!!getValidation("Email",currentUser.Email)}
                            helperText={getValidation("Email",currentUser.Email)}
                        />
                        <TextField
                            fullWidth
                            className="w-100"
                            variant="outlined"
                            multiline
                            margin="normal"
                            name="Bio"
                            type="text"
                            value={currentUser.Bio||""}
                            onChange={e => {
                                setFieldValue("Bio", e.target.value)
                            }}
                            label={"درباره من (اختیاری)"}
                            color={!!getValidation("Bio",currentUser.Bio)?"error":"success"}
                            error={!!getValidation("Bio",currentUser.Bio)}
                            helperText={getValidation("Bio",currentUser.Bio)}
                        />
                        <Button disabled={!canSubmit} className="mt-4" variant={"contained"} fullWidth type={"submit"}>ثبت</Button>
                    </div>
                </form>

            </Grid>
        </Card>
    );
};

export default connect(null, sagaActions)(EditProfile);
