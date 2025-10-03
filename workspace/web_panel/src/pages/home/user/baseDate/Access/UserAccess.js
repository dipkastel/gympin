import React, {useContext, useEffect, useState} from "react";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {user_getById,} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Chip} from "@mui/material";
import {userRoles_add, userRoles_delete, userRoles_getAllRoles} from "../../../../../network/api/userRoles.api";

const UserAccess = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const [userRoles, SetUserRoles] = useState(null)
    const [rules, SetRules] = useState([])

    useEffect(() => {
        getUser();
        userRoles_getAllRoles().then(data => {
            SetRules(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function getUser() {
        user_getById({id: currentUser.Id})
            .then((data) => {
                SetUserRoles(data.data.Data.UserRole);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function changeUserAccess(role) {
        if (userHasRole(role)) {
            userRoles_delete({User:{Id: currentUser.Id}, Role: role.Role}).then(response => {
                getUser()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        } else {

            userRoles_add({User:{Id: currentUser.Id}, Role: role.Role}).then(response => {
                getUser()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
    }

    function userHasRole(role) {
        return userRoles.includes(role.Role);
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="نقش های کاربر"/>
                <PortletBody>
                    {userRoles&&<div className={"row"}>
                        {rules.map(role => (
                            <Chip sx={{p: 1, m: 1}} key={"role" + role.RoleName}
                                  color={userHasRole(role) ? "success" : "default"} size={"medium"} label={role.RoleName}
                                  onClick={(e) => changeUserAccess(role)}
                            />
                        ))}
                    </div>}
                    {/*<Form.Group>*/}
                    {/*  <Select*/}
                    {/*      className={"dropdown"}*/}
                    {/*      options={rules.map(item => {*/}
                    {/*        return {label: item.Name, value: item.Value}*/}
                    {/*      })}*/}
                    {/*      value={rules.filter(f=>f.Value===inUser.Role).map(m=>{ return {label:m.Name,value:m.value}})[0]}*/}
                    {/*      onChange={e => changeUserAccess( e.value)}*/}
                    {/*  />*/}
                    {/*</Form.Group>*/}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default UserAccess;
