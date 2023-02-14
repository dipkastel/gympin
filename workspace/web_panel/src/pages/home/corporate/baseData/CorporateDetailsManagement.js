import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import "./corporateCss.css";
import CorporateBasics from "./Base/CorporateBasics";
import {corporate_getById} from "../../../../network/api/corporate.api";
import CorporatePersonnel from "./Personnel/CorporatePersonnel";
import CorporateStatus from "./Status/CorporateStatus";
import Notes from "../../../partials/content/notes/Notes";
import TotalCredit from "./TotalCredit/TotalCredit";
import TotalDeposit from "./TotalDeposit/TotalDeposit";
import DepositCharges from "./DepositCharges/DepositCharges";

const CorporateDetailsManagement = () => {
    const {corporateId} = useParams();
    const [currentCorporate, SetCurrentCorporate] = useState(null);
    useEffect(() => {
        corporate_getById({id: corporateId})
            .then((data) => {
                SetCurrentCorporate(data.data.Data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [corporateId]);
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تمامی شرکت ها در این قسمت مدیریت میشوند</p>
            </Notice>
            {currentCorporate&&<div className="row">
                <div className="col-md-5">
                    <CorporateStatus currentCorporate={currentCorporate} />
                    <CorporateBasics currentCorporate={currentCorporate} />
                </div>
                <div className="col-md-5">
                    <TotalCredit currentCorporate={currentCorporate} />
                    <TotalDeposit currentCorporate={currentCorporate} />
                    <DepositCharges currentCorporate={currentCorporate} />
                    <CorporatePersonnel currentCorporate={currentCorporate} />
                </div>
                <div className="col-md-2">
                     <Notes source={{Corporate:{Id:currentCorporate.Id}}} />
                </div>
            </div>}
        </>
    );
};

export default CorporateDetailsManagement;
