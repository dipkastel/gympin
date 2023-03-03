import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {user_getById} from "../../../../network/api/user.api";
import {Avatar, Grid} from "@mui/material";
import UserBasics from "./Base/UserBasics";
import UserAccess from "./Access/UserAccess";
import UserTransActions from "./TransActions/UserTransActions";
import "./userCss.css";
import UserAvatar from "./Avatar/UserAvatar";
import UserStatus from "./Status/UserStatus";
import UserPlaces from "./places/UserPlaces";
import UserCorporates from "./corporates/UserCorporates";
import Notes from "../../../partials/content/notes/Notes";
import UserCredit from "./credit/UserCredit";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import UserTransActionRequests from "./TransActionRequests/UserTransActionRequests";

const UserDetailManagement = () => {
    const error = useContext(ErrorContext);
  const {userId} = useParams();
  const [currentUser, SetCurrentUser] = useState(null);
  useEffect(() => {
    user_getById({ id: userId })
      .then((data) => {
        SetCurrentUser(data.data.Data);
      })
      .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
  }, [userId]);
  return (
    <>
        <Notice icon="flaticon-warning kt-font-primary">
            <p>تمامی افراد در مجموعه کاربر محسوب میشوند</p>
            <p>این کاربران میتوانند ورزشکار ، مدیر مجموعه ، پرسنل جیم پین و ... باشند</p>
        </Notice>
      <div className="row">
        <div className="col-md-5">
          {currentUser && <UserAvatar currentUser={currentUser} />}
          {currentUser && <UserBasics currentUser={currentUser} />}
            {currentUser && <UserAccess currentUser={currentUser} />}
        </div>
        <div className="col-md-5">
          {currentUser && <UserStatus currentUser={currentUser} />}
          {currentUser && <UserTransActionRequests currentUser={currentUser} />}
          {currentUser && <UserCredit currentUser={currentUser} />}
          {currentUser && <UserPlaces currentUser={currentUser} />}
          {currentUser && <UserCorporates currentUser={currentUser} />}
          {currentUser && <UserTransActions currentUser={currentUser} />}
        </div>
        <div className="col-md-2">
            {currentUser && <Notes source={{User:{Id:currentUser.Id}}} />}
        </div>
      </div>
    </>
  );
};

export default UserDetailManagement;
