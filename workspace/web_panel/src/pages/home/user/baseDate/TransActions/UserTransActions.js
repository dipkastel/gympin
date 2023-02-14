import React from "react";
import {
  Portlet,
  PortletBody,
  PortletFooter,
  PortletHeader,
} from "../../../../partials/content/Portlet";

function UserTransActions({ currentUser }) {
  // const [userRole, setUserRole] = React.useState(currentUser.UserRole[0]);

  return (
    <Portlet>
      <PortletHeader title="تراکنش های کاربر" />

      <PortletBody></PortletBody>

      <PortletFooter></PortletFooter>
    </Portlet>
  );
}

export default UserTransActions;
