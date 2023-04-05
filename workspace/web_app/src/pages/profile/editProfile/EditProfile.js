import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {checkEmailValid, checkMobileValid, checkNationalCode, compareObjs} from "../../../helper/utils";
import {connect, useSelector} from "react-redux";
import {media_AddImage} from "../../../network/api/multimedia.api";
import {Formik} from "formik";

import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {user_updateAvatar, user_updateMe} from "../../../network/api/user.api";
import {useNavigate} from "react-router-dom";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _EditImage from "./_EditImage";

const EditProfile = (props) => {
    const error = useContext(ErrorContext);
    const navigation = useNavigate();
    const currentUser = useSelector(state=>state.auth.user)
    const [user,setUser] = useState(currentUser)
    useEffect(() => {
        props.RequestUser(user)
    }, []);

    useEffect(() => {
        if(!compareObjs(currentUser,user))
            navigation.reload()
    }, []);


    function getGenderOptions() {
        return [{label:"خانم",value:"FEMALE"},{label:"آقا",value:"MALE"}]
    }

    return (

        <Card elevation={3} sx={{margin: 1}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                {user&&<_EditImage user={user} />}
                <Formik
                    initialValues={{
                        Id: user.Id,
                        AvatarId: user.AvatarId,
                        Bio: user.Bio,
                        Birthday: user.Birthday,
                        Email: user.Email,
                        Gender: user.Gender,
                        FullName: user.FullName,
                        NationalCode: user.NationalCode,
                        PhoneNumber: user.PhoneNumber,
                        Username: user.Username,

                    }}
                    onSubmit={(values, {setStatus, setSubmitting}) => {
                        console.log("sssss");
                        user_updateMe(values).then(result=>{
                            props.RequestUser(values)
                            setUser(result.data.Data);
                            error.showError({message: "با موفقیت ثبت شد",});
                        }).catch(e => {
                            try {
                                error.showError({message: e.response.data.Message});
                            } catch (f) {
                                error.showError({message: "خطا نا مشخص",});
                            }
                        });
                    }}
                    validate={(values) => {

                        const errors = {};
                        try{
                            if (!values.Username) {
                                errors.Username = "نام کاربری الزامی است";
                            }
                            if (!values.FullName) {
                                errors.FullName = "نام و نام خانوادگی الزامی است";
                            }
                            if (values.Gender==null) {
                                errors.Gender = "جنسیت الزامی است";
                            }
                            if (!values.NationalCode||!values.NationalCode.toString()) {
                                errors.NationalCode = "کد ملی الزامی است";
                            }
                            if (!checkNationalCode(values.NationalCode.toString())) {
                                errors.NationalCode = "کد ملی صحیح نیست";
                            }
                            // if (!values.Email||!values.Email.toString()) {
                            //     errors.Email = "ایمیل الزامی است";
                            // }
                            // if (!checkEmailValid(values.Email.toString())) {
                            //     errors.Email = "ایمیل صحیح نیست";
                            // }
                        }catch (e) {}
                        return errors;
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
                          setFieldValue
                      }) => (
                          <>
                              <div className="form-group p-4">
                                  <TextField
                                      fullWidth
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="PhoneNumber"
                                      type="text"
                                      aria-readonly
                                      value={values.PhoneNumber||""}
                                      label={"شماره همراه * "}
                                  />
                                  <TextField
                                      fullWidth
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="Username"
                                      type="text"
                                      value={values.Username||""}
                                      onChange={e=>setFieldValue("Username",e.target.value)}
                                      label={"نام کاربری * "}
                                      helperText={errors.Username}
                                      error={Boolean(touched.Username && errors.Username)}
                                  />
                                  <TextField
                                      fullWidth
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="FullName"
                                      type="text"
                                      value={values.FullName||""}
                                      onChange={handleChange}
                                      label={"نام و نام خانوادگی * "}
                                      helperText={errors.FullName}
                                      error={Boolean(touched.FullName && errors.FullName)}
                                  />
                                  <FormControl sx={{mt:2}} variant={"outlined"} fullWidth>
                                      <InputLabel id="demo-simple-select-label">جنسیت * </InputLabel>
                                      <Select
                                          className="w-100"
                                          name="Gender"
                                          onChange={handleChange}
                                          value={values.Gender||""}
                                          input={<OutlinedInput label="جنسیت * " />}
                                          helperText={errors.Gender}
                                          error={Boolean(touched.Gender && errors.Gender)}
                                      >
                                          <MenuItem value={"FEMALE"} >خانم</MenuItem>
                                          <MenuItem value={"MALE"}>آقا</MenuItem>
                                      </Select>
                                  </FormControl>
                                  <LocalizationProvider
                                      dateAdapter={AdapterJalali}>
                                      <DatePicker

                                          variant="outlined"
                                          mask="____/__/__"
                                          value={values.Birthday||""}
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
                                      value={values.NationalCode||""}
                                      onChange={handleChange}
                                      label={"کد ملی * "}
                                      helperText={errors.NationalCode}
                                      error={Boolean(touched.NationalCode && errors.NationalCode)}
                                  />
                                  <TextField
                                      fullWidth
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="Email"
                                      type="text"
                                      value={values.Email||""}
                                      onChange={handleChange}
                                      label={"ایمیل (اختیاری)"}
                                      helperText={errors.Email}
                                      error={Boolean(touched.Email && errors.Email)}
                                  />
                                  <TextField
                                      fullWidth
                                      className="w-100"
                                      variant="outlined"
                                      multiline
                                      margin="normal"
                                      name="Bio"
                                      type="text"
                                      value={values.Bio||""}
                                      onChange={handleChange}
                                      label={"درباره من (اختیاری)"}
                                  />
                                  <Button className="mt-4" variant={"outlined"} fullWidth onClick={handleSubmit}>ثبت</Button>
                              </div>

                          </>
                    )}
                </Formik>

            </Grid>
        </Card>
    );
};

export default connect(null, sagaActions)(EditProfile);
