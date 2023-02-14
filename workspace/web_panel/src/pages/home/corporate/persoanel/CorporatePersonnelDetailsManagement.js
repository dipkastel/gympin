import React, {useEffect, useState} from 'react';
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
const CorporatePersonnelDetailsManagement = () => {
    const {personnelId} = useParams();
    const [personnelCredit,SetPersonnelCredit] = useState({});
    useEffect(() => {
        getPerson();
    }, []);
    function getPerson(){
        corporatePersonnel_getById({id:personnelId}).then(result=>{
            console.log(result)
            SetPersonnelCredit(result.data.Data)
        }).catch(e=>console.log(e))
    }

    return (
        <>
            {personnelCredit.User&&<Notice icon="flaticon-warning kt-font-primary">
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-around"}
                    alignItems="center">
                        <div>
                            <p>{"مدیریت پرسنل "}</p>
                            <p>{("نام و نام خانوادگی : "+personnelCredit.User.FullName)}</p>
                            <p>{("نام کاربری : "+personnelCredit.User.Username)}</p>
                            <p>{("تلفن : "+personnelCredit.User.PhoneNumber)}</p>
                            <p>{("اعتبار : "+toPriceWithComma(personnelCredit.CreditBalance))}</p>
                        </div>

                    <Avatar alt="userImage" src={(personnelCredit.User.Avatar)?(personnelCredit.User.Avatar.Url||""):""}  sx={{width:170,height:170}} />
                </Grid>
            </Notice>}

            {personnelCredit && <div className="row">
                <div className="col-md-6">
                    <PersonnelRole personnelId={personnelId} />
                </div>
                <div className="col-md-12">
                    <PersonnelCredit personelCredit={personnelCredit}/>
                </div>
            </div>}
        </>
    );
};

export default CorporatePersonnelDetailsManagement;
