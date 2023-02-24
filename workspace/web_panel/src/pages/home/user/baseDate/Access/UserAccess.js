import React, {useContext, useEffect, useState} from "react";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import Select from "react-select";
import {user_getUserRoles, user_updateUserRoles, user_UpdateUserStatus} from "../../../../../network/api/user.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const UserAccess = ({currentUser}) => {
    const error = useContext(ErrorContext);
  const [inUser,SetInUser] = useState(currentUser.UserRole)
  const [rules,SetRules] = useState([])

  useEffect(() => {
    user_getUserRoles().then(data=>{
      SetRules(data.data.Data)
    }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
  }, []);

  function changeUserAccess(data){
    user_updateUserRoles({UserId:currentUser.Id,Role:data}).then(response=>{
      SetInUser(response.data.Data.UserRole)
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
        <Portlet>
          <PortletHeader title="دسترسی کاربر" />
          <PortletBody>
            <Form.Group>
              <Select
                  className={"dropdown"}
                  options={rules.map(item => {
                    return {label: item.Name, value: item.Value}
                  })}
                  value={rules.filter(f=>f.Value===inUser.Role).map(m=>{ return {label:m.Name,value:m.value}})[0]}
                  onChange={e => changeUserAccess( e.value)}
              />
            </Form.Group>
          </PortletBody>
        </Portlet>
      </>
  );
};

export default UserAccess;
