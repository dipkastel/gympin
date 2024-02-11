import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    placePersonnel_addRole,
    placePersonnel_deleteRole
} from "../../../../../network/api/placePersonnel.api";
import {Chip} from "@mui/material";

const _placePersonelStatus = ({personel,getPerson}) => {
    const error = useContext(ErrorContext);
    function getRoleOptions(){
        return [
            {label:"مدیر مرکز",value:"PLACE_OWNER"},
            {label:"پرسنل مرکز",value:"PLACE_PERSONNEL"},
            {label:"مربی",value:"PLACE_COACH"},
        ]
    }


    function deleteUserRole(role) {
        placePersonnel_deleteRole({...personel,UserRole:role.value}).then(result=>{
            getPerson();
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function addUserRole(role) {
        placePersonnel_addRole({...personel,UserRole:role.value}).then(result=>{
            getPerson();
            error.showError({message: "عملیات موفق",});
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
            <Portlet >
                <PortletHeader
                    title={"وضعیت"}
                />

                <PortletBody>


                    <div className={"row"}>
                        {getRoleOptions().map(role => (
                            <Chip sx={{p: 1, m: 1}} key={"role" + role.value}
                                  color={personel.UserRole.includes(role.value) ? "success" : "default"}
                                  size={"medium"}
                                  label={role.label}
                                   onClick={(e) => personel.UserRole.includes(role.value)?deleteUserRole(role):addUserRole(role)}
                            />
                        ))}
                    </div>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelStatus;
