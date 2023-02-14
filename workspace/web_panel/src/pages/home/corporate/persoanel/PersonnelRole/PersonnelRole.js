import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {corporatePersonnel_getById, corporatePersonnel_update} from "../../../../../network/api/CorporatePersonnel.api";

const PersonnelRole = ({personnelId}) => {
    const [personnel,SetPersonnel] = useState(null)

    useEffect(() => {
            getPerson();
    }, []);
    function getPerson(){
        corporatePersonnel_getById({id:personnelId}).then(result=>{
            console.log(result)
            SetPersonnel(result.data.Data)
        }).catch(e=>console.log(e))
    }


    function getRoleOptions(){
        return [{label:"مدیر",value:"ADMIN"},{label:"پرسنل",value:"PERSONEL"}]
    }
    function updateUserRole(e){
        console.log(e)
        corporatePersonnel_update({Id:personnelId,Role:e.value}).then(result=>{
            getPerson();

        }).catch(e=>console.log(e));
    }

    return (
        <>

            {personnel&& <Portlet>
                <PortletHeader
                    title={"مدیریت دسترسی"}
                />

                <PortletBody>

                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={getRoleOptions()}
                            value={getRoleOptions().filter(p=>p.value===personnel.Role)}
                            onChange={e => updateUserRole(e)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>}
        </>
    );
};

export default PersonnelRole;
