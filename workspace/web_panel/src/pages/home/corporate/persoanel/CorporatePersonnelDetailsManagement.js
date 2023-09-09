import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {useParams} from "react-router-dom";
import {
    corporatePersonnel_ByCorporate,
    corporatePersonnel_getById
} from "../../../../network/api/CorporatePersonnel.api";
import PersonnelCredit from "./personnelCredits/PersonnelCredit";
import {Avatar, Grid} from "@mui/material";
import PersonnelRole from "./PersonnelRole/PersonnelRole";
import {toPriceWithComma} from "../../../../helper";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
const CorporatePersonnelDetailsManagement = () => {
    const error = useContext(ErrorContext);
    const {personnelId} = useParams();
    const [corporatePersonnel,SetCorporatePersonnel] = useState(null);
    useEffect(() => {
        getPerson();
    }, []);
    function getPerson(){
        corporatePersonnel_getById({id:personnelId}).then(result=>{
            SetCorporatePersonnel(result.data.Data)
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
            {corporatePersonnel&&corporatePersonnel.User&&<Notice icon="flaticon-warning kt-font-primary">
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-around"}
                    alignItems="center">
                        <div>
                            <p>{"مدیریت پرسنل "}</p>
                            <p>{("نام و نام خانوادگی : "+corporatePersonnel.User.FullName)}</p>
                            <p>{("نام کاربری : "+corporatePersonnel.User.Username)}</p>
                            <p>{("تلفن : "+corporatePersonnel.User.PhoneNumber)}</p>
                            <p>{("اعتبار : "+toPriceWithComma(corporatePersonnel.CreditBalance))}</p>
                        </div>

                    <Avatar alt="userImage" src={(corporatePersonnel.User.Avatar)?(corporatePersonnel.User.Avatar.Url||""):""}  sx={{width:170,height:170}} />
                </Grid>
            </Notice>}

            {corporatePersonnel && <div className="row">
                <div className="col-md-6">
                    <PersonnelRole personnelId={personnelId} />
                </div>
                <div className="col-md-12">
                    <PersonnelCredit corporatePersonnel={corporatePersonnel} getPerson={getPerson}/>
                </div>
            </div>}
        </>
    );
};

export default CorporatePersonnelDetailsManagement;
