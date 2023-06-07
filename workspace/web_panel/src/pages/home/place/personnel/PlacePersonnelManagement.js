import React, {useState, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";
import _placePersonelDetails from "./baseData/_placePersonelDetails";
import _placePersonelAccess from "./access/_placePersonelAccess";
import {placePersonnel_getById} from "../../../../network/api/placePersonnel.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import _placePersonelStatus from "./status/_placePersonelStatus";
import PersonnelRole from "../../corporate/persoanel/PersonnelRole/PersonnelRole";
import PersonnelCredit from "../../corporate/persoanel/personnelCredits/PersonnelCredit";
import _placePersonelGateAccess from "./access/_placePersonelGateAccess";

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
            {person&&<_placePersonelDetails personel={person} />}

            {person && <div className="row">
                <div className="col-md-6 kt-mt-20">
                    {(person.UserRole=="PLACE_PERSONNEL")&&<_placePersonelAccess personel={person} getPerson={getPerson}/>}
                    {(person.UserRole=="PLACE_PERSONNEL")&&<_placePersonelGateAccess personel={person} getPerson={getPerson}/>}

                </div>
                <div className="col-md-6 kt-mt-20">
                    <_placePersonelStatus personel={person} getPerson={getPerson}/>
                </div>
            </div>}
        </>
    );
};

export default PlacePersonnelManagement;
