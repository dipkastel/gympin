import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import { user_getById } from "../../../api/user.api";
import { Avatar, Grid } from "@mui/material";
import "./userCss.css";

import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import UserBasics from "./components/UserBasics";
import UserAccess from "./components/UserAccess";
import UserTransActions from "./components/UserTransActions";

const UserDetailManagement = () => {
  const location = useLocation();
  const [currentUser, SetCurrentUser] = useState(null);
  useEffect(() => {
    user_getById({ id: location.state })
      .then((data) => {
        SetCurrentUser(data.data.Data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Notice>
        {currentUser && (
          <Grid container justify="start" alignItems="start">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className="bigAvatar"
            />

            {currentUser.Username}
            <br />
            {currentUser.PhoneNumber}
            <br />
            {currentUser.UserStatus}
          </Grid>
        )}
      </Notice>
      <div className="row">
        <div className="col-md-6">
          {currentUser && <UserBasics currentUser={currentUser} />}
        </div>
        <div className="col-md-6">
          {currentUser && <UserAccess currentUser={currentUser} />}
          {currentUser && <UserTransActions currentUser={currentUser} />}
        </div>
      </div>
    </>
  );
};

export default UserDetailManagement;
