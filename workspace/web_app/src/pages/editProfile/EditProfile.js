import React, {useState} from 'react';
import {Avatar, Button, Card, Grid, Input, TextField} from "@mui/material";
import {getImagePath} from "../../helper/utils";
import {connect, useSelector} from "react-redux";
import {authActions} from "../../helper/redux/actions/authActions";
import {multimediaAddImage} from "../../network/api/multimedia.api";
import {Formik} from "formik";

import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {UpdateUser} from "../../network/api/user.api";

const EditProfile = (props) => {
    const [imageUrl,SetImageUrl] = useState("")

    const [user,setUser] = useState(useSelector(state=>state.auth.user))

    function ChangeAvatar(e) {
        if(e.type==="change"){
            multimediaAddImage(e.target.files[0]).then(result=>{
                SetImageUrl(getImagePath(result.data.Data))
            }).catch(e=>console.log(e))

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

                <label htmlFor="raised-button-file">
                    <Avatar
                        sx={{width: 120, height: 120, marginTop: 3}}
                        alt="Remy Sharp"
                        src={imageUrl}
                    />
                </label>
                <Input
                    accept="image/*"
                    className={"input"}
                    style={{display: 'none'}}
                    id="raised-button-file"
                    onChange={ChangeAvatar}
                    type="file"
                />
                <Formik
                    initialValues={{
                        Id: user.Id,
                        AvatarId: user.AvatarId,
                        Bio: user.Bio,
                        Birthday: user.Birthday?user.Birthday:"Thu Mar 21 1991 09:47:27 GMT+0330",
                        Email: user.Email,
                        LastName: user.LastName,
                        Name: user.Name,
                        NationalCode: user.NationalCode,
                        PhoneNumber: user.PhoneNumber,
                        Username: user.Username,

                    }}
                    onSubmit={(values, {setStatus, setSubmitting}) => {
                        console.log(values);
                        UpdateUser(values).then(result=>{
                            props.SagaRequestUser()
                            console.log(result)
                        }).catch(e=>console.log(e));
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
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="PhoneNumber"
                                      type="text"
                                      aria-readonly
                                      value={values.PhoneNumber}
                                      label={"شماره همراه"}
                                  />
                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="Username"
                                      type="text"
                                      value={values.Username}
                                      onChange={e=>setFieldValue("Username",e.target.value)}
                                      label={"نام کاربری"}
                                  />
                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="Name"
                                      type="text"
                                      value={values.Name}
                                      onChange={handleChange}
                                      label={"نام"}
                                  />
                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="LastName"
                                      type="text"
                                      value={values.LastName}
                                      onChange={handleChange}
                                      label={"نام خانوادگی"}
                                  />

                                  <LocalizationProvider
                                      dateAdapter={AdapterJalali}>
                                      <DatePicker
                                          variant="outlined"
                                          mask="____/__/__"
                                          value={values.Birthday}
                                          onChange={(e,w)=>{
                                              console.log("e:",e.toString())
                                              setFieldValue('Birthday', Date.parse(e))
                                          }}
                                          renderInput={(params) =>

                                              <TextField
                                                  {...params}
                                                  fullWidth
                                                  id="outlined-adornment-password"
                                                  className="w-100"
                                                  variant="outlined"
                                                  margin="normal"
                                                  label={"تاریخ تولد"}
                                              />
                                          }
                                      />
                                  </LocalizationProvider>

                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="NationalCode"
                                      type="text"
                                      value={values.NationalCode}
                                      onChange={handleChange}
                                      label={"کد ملی"}
                                  />
                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="Email"
                                      type="text"
                                      value={values.Email}
                                      onChange={handleChange}
                                      label={"ایمیل"}
                                  />
                                  <TextField
                                      fullWidth
                                      id="outlined-adornment-password"
                                      className="w-100"
                                      variant="outlined"
                                      multiline
                                      margin="normal"
                                      name="Bio"
                                      type="text"
                                      value={values.Bio}
                                      onChange={handleChange}
                                      label={"درباره من"}
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

export default connect(null, authActions)(EditProfile);
