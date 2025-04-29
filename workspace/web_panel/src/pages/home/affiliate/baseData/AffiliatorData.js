import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {CircularProgress, ListItemText} from "@mui/material";
import {userGenders} from "../../../../helper/enums/genders";
import {affiliate_getById} from "../../../../network/api/affiliate.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const AffiliatorData = ({affiliateId}) => {

    const error = useContext(ErrorContext);
    const [affiliator,setAffiliator] = useState(null)

    useEffect(() => {
        getAffiliator();
    }, []);

    function getAffiliator(){

        affiliate_getById({id:affiliateId}).then(result=>{
            setAffiliator(result.data.Data);
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
                <PortletHeader
                    title={"کاربر"}
                />
                <PortletBody>
                    {affiliator?<>
                    <ListItemText
                        primary={"نام و نام خانوادگی"}
                        secondary={affiliator?.User?.FullName}
                        sx={{ textAlign:"right" }}/>
                    <ListItemText
                        primary={"تلفن کاربر"}
                        secondary={affiliator?.User?.PhoneNumber}
                        sx={{ textAlign:"right" }}/>
                    <ListItemText
                        primary={"نام کاربری"}
                        secondary={affiliator?.Username}
                        sx={{ textAlign:"right" }}/>
                    <ListItemText
                        primary={"جنسیت"}
                        secondary={userGenders[affiliator?.User?.Gender]||"ثبت نشده"}
                        sx={{ textAlign:"right" }}/>
                    <ListItemText
                        primary={"وضعیت همکاری"}
                        secondary={affiliator?.AffiliatorStatus}
                        sx={{ textAlign:"right" }}/>
</>:<CircularProgress />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default AffiliatorData;
