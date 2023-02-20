import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {user_GetStatuses, user_UpdateUserStatus} from "../../../../../network/api/user.api";

const Userstatus = ({currentUser}) => {
    const [inUser,SetInUser] = useState(currentUser)
    const [statuses,SetStatuses] = useState([])

    useEffect(() => {
        user_GetStatuses().then(data=>{
            SetStatuses(data.data.Data)
        }).catch(e=>console.log(e))
    }, []);

    function changeUserStatus(data){
        user_UpdateUserStatus({...inUser,UserStatus:data}).then(response=>{
            SetInUser({...inUser,UserStatus:data})
        }).catch(e=>console.log(e))
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="وضعیت کاربر" />
                <PortletBody>
                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={statuses.map(data => {
                                return {label: data, value: data}
                            })}
                            value={{label: inUser.UserStatus, value: inUser.UserStatus}}
                            onChange={e => changeUserStatus( e.value)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default Userstatus;