import React, {useContext} from 'react';
import {Avatar, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {user_update} from "../../../network/api/user.api";

const _UserBaseData = ({corporatePersonnel, getCorporatePerson}) => {

    const error = useContext(ErrorContext);
    const [values, setValues] = React.useState(corporatePersonnel.User);
    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    function ChangeUserBaseData(e) {
        e.preventDefault();
        user_update(values).then(result => {
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                {corporatePersonnel.User && <CardContent>
                    <Grid container alignItems={"center"}
                          direction="column"
                          justifyContent={"center"}>
                        <Avatar alt={"userImage"}
                                src={(corporatePersonnel.User.Avatar) ? (corporatePersonnel.User.Avatar.Url || "") : ""}
                                sx={{width: 150, height: 150}}/>

                    </Grid>

                    <form className="container" noValidate autoComplete="off" onSubmit={(e)=>ChangeUserBaseData(e)}>
                        <TextField
                            label="تلفن همراه"
                            className="textField"
                            value={values.PhoneNumber || ""}
                            disabled
                            onChange={handleChange("PhoneNumber")}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            label="نام و نام خانوادگی"
                            className="textField"
                            value={values.FullName || ""}
                            onChange={handleChange("FullName")}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                        <Button sx={{mt:2}} fullWidth variant={"contained"} type={"submit"}>ثبت</Button>
                    </form>
                </CardContent>}
            </Card>
        </>
    );
};

export default _UserBaseData;
