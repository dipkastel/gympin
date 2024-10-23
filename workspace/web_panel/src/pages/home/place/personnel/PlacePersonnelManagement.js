import React, {useState, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";
import _placePersonelDetails from "./baseData/_placePersonelDetails";
import _placePersonelAccess from "./access/_placePersonelAccess";
import {placePersonnel_getById} from "../../../../network/api/placePersonnel.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import _placePersonelStatus from "./status/_placePersonelStatus";
import _PersonnelRole from "../../corporate/persoanel/_PersonnelRole";
import _PersonnelCredit from "../../corporate/persoanel/_PersonnelCredit";
import _placePersonelBuyableAccess from "./access/_placePersonelBuyableAccess";
import _placePersonnelCommitionFee from "./commissionFee/_placePersonnelCommitionFee";
import Notice from "../../../partials/content/Notice";

const PlacePersonnelManagement = () => {
    const error = useContext(ErrorContext);
    let {personnelId} = useParams();
    const [person,setPerson] = useState(null);

    useEffect(() => {
        getPerson();
    }, [personnelId]);

    function getPerson(){
        placePersonnel_getById({id:personnelId}).then(result=>{
            setPerson(result.data.Data);
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

            {person &&<Notice icon="flaticon-warning kt-font-primary"> {"مدیریت پرسنل "+person.User.Username+" از مرکز "+person.Place.Name}</Notice>}

            {person && <div className="row">
                <div className="col-md-6 kt-mt-20">
                    <_placePersonelDetails personel={person} />
                    <_placePersonelStatus personel={person} getPerson={getPerson}/>
                    <_placePersonnelCommitionFee personel={person} getPerson={getPerson}/>
                    {(person.UserRole=="PLACE_PERSONNEL")&&<_placePersonelBuyableAccess personel={person} getPerson={getPerson}/>}
                </div>
                <div className="col-md-6 kt-mt-20">
                    {(person.UserRole=="PLACE_PERSONNEL")&&<_placePersonelAccess personel={person} getPerson={getPerson}/>}
                </div>
            </div>}
        </>
    );
};

export default PlacePersonnelManagement;
