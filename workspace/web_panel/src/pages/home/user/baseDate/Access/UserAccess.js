import React, {useEffect, useState} from "react";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import Select from "react-select";
import {user_getUserRoles, user_updateUserRoles, user_UpdateUserStatus} from "../../../../../network/api/user.api";
import {Form} from "react-bootstrap";

const UserAccess = ({currentUser}) => {
  const [inUser,SetInUser] = useState(currentUser.UserRole)
  const [rules,SetRules] = useState([])

  useEffect(() => {
    user_getUserRoles().then(data=>{
      console.log(data.data.Data)
      SetRules(data.data.Data)
    }).catch(e=>console.log(e))
  }, []);

  function changeUserAccess(data){
    user_updateUserRoles({UserId:currentUser.Id,Role:data}).then(response=>{
      console.log(response)
      SetInUser(response.data.Data.UserRole)
    }).catch(e=>console.log(e))
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
