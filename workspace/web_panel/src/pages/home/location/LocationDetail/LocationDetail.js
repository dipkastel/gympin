import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory, useParams} from "react-router-dom";
import {Location_getById} from "../../../../network/api/location.api";
import _LocationDetailMap from "./_LocationDetailMap";
import Notice from "../../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";

const LocationDetail = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const {locationId} = useParams();
    const [location,setLocation]=useState(null);

    useEffect(() => {
        Location_getById({id:locationId}).then(result=>{
            setLocation(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [locationId]);


    return (
        <div>

            <div>
                <Notice icon="flaticon-warning kt-font-primary">
                    <p>جزئیات منطقه استفاده های متعددی دارد لطفا در تکمیل اطلاعات دقت فرمایید</p>
                </Notice>

                <Portlet>
                    {location&&<PortletHeader
                        title={location.Name}
                    />}
                    <PortletBody>
                        {location&&<_LocationDetailMap centerLat={location.CenterLat} centerLng={location.CenterLng}
                                                       mapPolygon={location.MapPolygon}/>}
                    </PortletBody>
                </Portlet>
            </div>
        </div>
    );
};

export default LocationDetail;
