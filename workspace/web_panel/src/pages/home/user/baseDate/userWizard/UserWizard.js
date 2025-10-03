import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {user_GetUserSettings, user_SetUserSettings,} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {FormControlLabel, FormGroup, FormLabel, Switch} from "@mui/material";

const UserWizard = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const [wizard,SetWizard] = useState({Value:false})

    useEffect(() => {
        user_GetUserSettings({Id:currentUser.Id}).then(data=>{

            SetWizard(data.data.Data?.filter(s=>s.Key=="USER_WIZARD_COMPLETE")?.[0]);

        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);

    function changeUserWizard(checked){
        user_SetUserSettings({Id:wizard?.Id,Value:!checked,Key:"USER_WIZARD_COMPLETE",User:{Id:currentUser.Id}}).then(result=>{
            SetWizard(result.data.Data);
            error.showError({message: "ثبت موفق",});
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
                <PortletHeader title="ویزارد" />
                <PortletBody>

                    <FormGroup>

                        <FormLabel component="legend">وضعیت :</FormLabel>
                        <FormControlLabel
                            checked={!(wizard?.Value?.toLowerCase?.()=="true")}
                            onChange={(e)=>changeUserWizard(e.target.checked)}
                            control={<Switch
                                value="gilad" />}
                            label="فعال"
                        />
                    </FormGroup>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default UserWizard;
