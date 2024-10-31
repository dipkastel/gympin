import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {user_GetUserSettings, user_SetUserSettings} from "../../../../../network/api/user.api";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {FormControlLabel, FormGroup, FormLabel, Switch} from "@mui/material";

const PlaceContract = ({place,updatePlace}) =>{

const error = useContext(ErrorContext);
const [wizard,SetWizard] = useState({Value:false})


function changeHasContract(checked){
    place.HasContract = checked;
    updatePlace(place);
}

return (
    <>
        <Portlet>
            <PortletHeader title="قرارداد" />
            <PortletBody>

                <FormGroup>
                    <FormControlLabel
                        checked={place?.HasContract}
                        onChange={(e)=>changeHasContract(e.target.checked)}
                        control={<Switch
                            value="gilad" />}
                        label={place?.HasContract?"قرارداد وجود دارد":"قرارداد وجود ندارد"}
                    />
                </FormGroup>
            </PortletBody>
        </Portlet>
    </>
);
};

export default PlaceContract;
