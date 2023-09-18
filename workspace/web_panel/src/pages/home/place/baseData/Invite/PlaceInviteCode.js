import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Place_getPlacesInviteCode} from "../../../../../network/api/place.api";

const PlaceInviteCode = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeInviteCode, SetPlaceInviteCode] = useState(null);

    useEffect(() => {
        Place_getPlacesInviteCode({Id: place.Id})
            .then(data => {
                SetPlaceInviteCode(data.data.Data);
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
            {placeInviteCode && <Portlet>
                <PortletHeader
                    title={"کد دعوت "}
                />

                <PortletBody>
                    <Typography variant={"body1"} textAlign={"center"} width={"100%"}>
                        {placeInviteCode.code}
                    </Typography>
                </PortletBody>
            </Portlet>}

        </>
    );
};

export default PlaceInviteCode;
