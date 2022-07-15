import React from "react";
import {
  Portlet,
  PortletBody,
  PortletFooter,
  PortletHeader,
} from "../../../../partials/content/Portlet";

import { FormControl, MenuItem, Select } from "@mui/material";

function UserAccess({ currentUser }) {
  const [userRole, setUserRole] = React.useState(currentUser.UserRole[0]);

  function handleChange() {}

  function ChangeUserAccessData() {}

  return (
    <Portlet>
      <PortletHeader title="دسترسی کاربر" />

      <PortletBody>
        <FormControl variant="outlined">
          <Select value={userRole.Role} onChange={handleChange}>
            <MenuItem value={"SUPER_ADMIN"}>SUPER_ADMIN</MenuItem>
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          </Select>
        </FormControl>
      </PortletBody>

      <PortletFooter>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-primary btn-sm "
            onClick={ChangeUserAccessData}
          >
            ویرایش
          </button>
        </div>
      </PortletFooter>
    </Portlet>
  );
}

export default UserAccess;
