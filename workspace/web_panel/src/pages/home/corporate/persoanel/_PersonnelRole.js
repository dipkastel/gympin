import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletHeader} from "../../../partials/content/Portlet";
import Select from "react-select";
import {corporatePersonnel_getById, corporatePersonnel_update} from "../../../../network/api/CorporatePersonnel.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _PersonnelRole = ({personnelId}) => {
    const error = useContext(ErrorContext);
    const [personnel,SetPersonnel] = useState(null)

    useEffect(() => {
            getPerson();
    }, []);
    function getPerson(){
        corporatePersonnel_getById({id:personnelId}).then(result=>{
            SetPersonnel(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function getRoleOptions(){
        return [{label:"مدیر",value:"ADMIN"},{label:"پرسنل",value:"PERSONEL"}]
    }
    function updateUserRole(e){
        corporatePersonnel_update({Id:personnelId,Role:e.value}).then(result=>{
            getPerson();
            error.showError({message: "با موفقیت ثبت شد",});

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

            {personnel&& <Portlet>
                <PortletHeader
                    title={"دسترسی"}
                />

                <Select
                    className={"dropdown"}
                    options={getRoleOptions()}
                    value={getRoleOptions().filter(p=>p.value===personnel.Role)}
                    onChange={e => updateUserRole(e)}
                />
            </Portlet>}
        </>
    );
};

export default _PersonnelRole;
