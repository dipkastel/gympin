import React from "react";
import {Portlet, PortletBody, PortletFooter, PortletHeader,} from "../../../../partials/content/Portlet";
import {TextField} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import adapterJalali from "@date-io/date-fns-jalali"
import {user_update} from "../../../../../network/api/user.api";

export default function UserBasics({ currentUser }) {
  console.log(currentUser);
  const [values, setValues] = React.useState(currentUser);
  const handleChange = (name) => (event) => {
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (name) => (event) => {
    setValues({ ...values, [name]: event });
  };

  function ChangeUserBaseData() {
    var data = values;
    user_update(values).then(result=>{
        console.log(result);
    }).catch(e=>console.log(e))
  }

  return (
    <Portlet>
      <PortletHeader title="اطلاعات اولیه" />

      <PortletBody>
        <form className="container" noValidate autoComplete="off">
          <TextField
            label="نام و نام خانوادگی"
            className="textField"
            value={values.FullName||""}
            onChange={handleChange("FullName")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="نام کاربری"
            className="textField"
            value={values.Username||""}
            onChange={handleChange("Username")}
            margin="normal"
            variant="outlined"
          />
          <LocalizationProvider
              dateAdapter={adapterJalali}>
            <DatePicker
                className={"ltr mt-4 mb-2"}
                label="تاریخ تولد"
                value={values.Birthday}
                onChange={handleDateChange("Birthday")}
                renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="تلفن همراه"
            className="textField"
            value={values.PhoneNumber||""}
            onChange={handleChange("PhoneNumber")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="ایمیل"
            className="textField"
            value={values.Email||""}
            onChange={handleChange("Email")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Multiline"
            multiline
            rows="4"
            defaultValue={values.Bio||""}
            onChange={handleChange("Bio")}
            className="textField"
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="کد ملی"
            className="textField"
            value={values.NationalCode||""}
            onChange={handleChange("NationalCode")}
            margin="normal"
            variant="outlined"
          />
        </form>
      </PortletBody>
      <PortletFooter>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-primary btn-sm "
            onClick={ChangeUserBaseData}
          >
            ویرایش
          </button>
        </div>
      </PortletFooter>
    </Portlet>
  );
}