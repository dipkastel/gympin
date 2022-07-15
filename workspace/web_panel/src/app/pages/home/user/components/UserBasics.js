import React from "react";
import {
  Portlet,
  PortletBody,
  PortletFooter,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../../partials/content/Portlet";
import { TextField } from "@mui/material";

export default function UserBasics({ currentUser }) {
  console.log(currentUser);
  const [values, setValues] = React.useState(currentUser);
  const handleChange = (name) => (event) => {
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
  };

  function ChangeUserBaseData() {}

  return (
    <Portlet>
      <PortletHeader title="اطلاعات اولیه" />

      <PortletBody>
        <form className="container" noValidate autoComplete="off">
          <TextField
            label="نام"
            className="textField"
            value={values.Name}
            onChange={handleChange("Name")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="نام خانوادگی"
            className="textField"
            value={values.LastName}
            onChange={handleChange("LastName")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="نام کاربری"
            className="textField"
            value={values.Username}
            onChange={handleChange("Username")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="تلفن همراه"
            className="textField"
            value={values.PhoneNumber}
            onChange={handleChange("PhoneNumber")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="ایمیل"
            className="textField"
            value={values.Email}
            onChange={handleChange("Email")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Multiline"
            multiline
            rows="4"
            defaultValue={values.Bio}
            onChange={handleChange("Bio")}
            className="textField"
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="کد ملی"
            className="textField"
            value={values.NationalCode}
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
