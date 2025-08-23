import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {corporate_getCorporateInviteCode} from "../../../../../network/api/corporate.api";

const CorporateInviteCode = ({corporate}) => {
    const error = useContext(ErrorContext);
    const [corporteInviteCode, SetCorporteInviteCode] = useState(null);

    useEffect(() => {
        corporate_getCorporateInviteCode({Id: corporate.Id})
            .then(data => {
                SetCorporteInviteCode(data.data.Data);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    return (
        <>
            {corporteInviteCode && <Portlet>
                <PortletHeader
                    title={"کد دعوت "}
                />

                <PortletBody>
                    <Typography variant={"body1"} textAlign={"center"} width={"100%"}>
                        {corporteInviteCode.code}
                    </Typography>
                </PortletBody>
            </Portlet>}

        </>
    );
};

export default CorporateInviteCode;
