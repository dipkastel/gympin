import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {corporatePersonnel_getById, corporatePersonnel_update} from "../../../../network/api/CorporatePersonnel.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../../../network/api/corporate.api";

const _PersonnelGroup = ({personnel,updatePage}) => {
    const error = useContext(ErrorContext);
    const [groups,setGroups] = useState(null);
    useEffect(() => {
            getPerson();
    }, []);
    function getPerson(){
        corporate_getCorporateGroups({id:personnel.Corporate.Id}).then(result=>{
            setGroups(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function updatePersonnelGroup(e){
        corporatePersonnel_update({Id:personnel.Id,PersonelGroup:{Id:e.value}}).then(result=>{
            updatePage();
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

            {personnel&&groups&& <Portlet>
                <PortletHeader
                    title={"گروه"}
                />
                <Select
                    className={"dropdown"}
                    options={groups.map(g=>{return {label:g.Name,value:g.Id}})}
                    value={{label:personnel.PersonnelGroup?.Name,value:personnel.PersonnelGroup?.Id}}
                    onChange={e => updatePersonnelGroup(e)}
                />
            </Portlet>}
        </>
    );
};

export default _PersonnelGroup;
