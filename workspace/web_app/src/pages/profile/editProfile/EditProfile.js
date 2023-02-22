import React, {useEffect, useState} from 'react';
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
import {compareObjs, getImagePath} from "../../../helper/utils";
import {connect, useSelector} from "react-redux";
import {media_AddImage} from "../../../network/api/multimedia.api";
import {Formik} from "formik";

import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {user_updateAvatar, user_updateMe} from "../../../network/api/user.api";
import {useNavigate} from "react-router-dom";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const EditProfile = (props) => {
    const navigation = useNavigate()
    const currentUser = useSelector(state=>state.auth.user)
    const [imageUrl,SetImageUrl] = useState("")
    const [user,setUser] = useState(currentUser)
    useEffect(() => {
        console.log(currentUser)
        props.RequestUser(user)
    }, []);

    useEffect(() => {
        if(!compareObjs(currentUser,user))
            navigation.reload()
        SetImageUrl(user.Avatar?user.Avatar.Url:"")
    }, []);

    function ChangeAvatar(e) {
        if(e.type==="change"){
            const formData = new FormData();
            formData.append("MediaType", "IMAGE");
            formData.append("File", e.target.files[0]);
            formData.append("CategoryId", "2");
            formData.append("Title", user.Username);
            formData.append("Description", user.Id);
            //
            media_AddImage(formData)
                .then(data => {
                    user_updateAvatar({UserId:currentUser.Id,MultimediaId:data.data.Data.Id}).then(result=>{
                        SetImageUrl(result.data.Data.Avatar?result.data.Data.Avatar.Url:"")
                    }).catch(e=>console.log(e));
                }).catch(e => console.log(e))


        }
    }


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
                        Birthday: user.Birthday,
                        Email: user.Email,
                        Gender: user.Gender,
                        FullName: user.FullName,
                        NationalCode: user.NationalCode,
                        PhoneNumber: user.PhoneNumber,
                        Username: user.Username,

                    }}
                    onSubmit={(values, {setStatus, setSubmitting}) => {
                        console.log("values",JSON.stringify(values));
                        user_updateMe(values).then(result=>{
                            props.RequestUser(values)
                            setUser(result.data.Data);
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
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="PhoneNumber"
                                      type="text"
                                      aria-readonly
                                      value={values.PhoneNumber||""}
                                      label={"شماره همراه"}
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
                                      label={"نام کاربری"}
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
                                      label={"نام و نام خانوادگی"}
                                  />
                                  <FormControl sx={{mt:2}} variant={"outlined"} fullWidth>
                                      <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
                                      <Select
                                          className="w-100"
                                          name="Gender"
                                          onChange={handleChange}
                                          value={values.Gender||""}
                                          input={<OutlinedInput label="جنسیت" />}
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
                                              console.log("e:",e.toString())
                                              setFieldValue('Birthday', Date.parse(e))
                                          }}
                                          renderInput={(params) =>

                                              <TextField
                                                  {...params}
                                                  fullWidth
                                                  sx={{mt:3}}
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
                                      className="w-100"
                                      variant="outlined"
                                      margin="normal"
                                      name="NationalCode"
                                      type="text"
                                      value={values.NationalCode||""}
                                      onChange={handleChange}
                                      label={"کد ملی"}
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
                                      label={"ایمیل"}
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

export default connect(null, sagaActions)(EditProfile);
