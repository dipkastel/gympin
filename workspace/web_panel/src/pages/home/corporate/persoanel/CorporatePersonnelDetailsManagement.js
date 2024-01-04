import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {useHistory, useParams} from "react-router-dom";
import {
    corporatePersonnel_ByCorporate,
    corporatePersonnel_getById
} from "../../../../network/api/CorporatePersonnel.api";
import PersonnelCredit from "./personnelCredits/PersonnelCredit";
import {Avatar, Button, Grid, TableCell, Tooltip} from "@mui/material";
import PersonnelRole from "./PersonnelRole/PersonnelRole";
import {toPriceWithComma} from "../../../../helper";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import PersonnelGroup from "./PersonnelGroup/PersonnelGroup";
const CorporatePersonnelDetailsManagement = () => {
    const error = useContext(ErrorContext);
    let history = useHistory();
    const {personnelId} = useParams();
    const [corporatePersonnel,SetCorporatePersonnel] = useState(null);
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

    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
        else
            getPerson();
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }
    return (
        <>
            {corporatePersonnel&&corporatePersonnel.User&&<Notice icon="flaticon-warning kt-font-primary">
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems="center">
                    <p>{"مدیریت پرسنل "}</p>
                    <div>
                        <Button variant={"contained"} color={"warning"}
                                 onClick={()=>{history.push("/corporate/details/"+corporatePersonnel.Corporate.Id)}}
                        >{corporatePersonnel.Corporate.Name}</Button>
                    </div>

                </Grid>
            </Notice>}
            {!updatePageP&&corporatePersonnel && <div className="row">
                <div className="col-md-6">
                    <PersonnelCredit corporatePersonnel={corporatePersonnel} getPerson={getPerson}/>
                    <PersonnelRole personnelId={personnelId} />
                </div>
                <div className="col-md-6">
                    <Portlet>
                        <PortletBody>
                            <Grid
                                container
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems="center">
                                <div>
                                    <p>{("نام و نام خانوادگی : "+corporatePersonnel.User.FullName)}</p>
                                    <p>{("نام کاربری : "+corporatePersonnel.User.Username)}</p>
                                    <p>{("تلفن : "+corporatePersonnel.User.PhoneNumber)}</p>
                                    <p>{("اعتبار : "+toPriceWithComma(corporatePersonnel.CreditBalance))}</p>
                                </div>

                                <Avatar alt="userImage" src={(corporatePersonnel.User.Avatar)?(corporatePersonnel.User.Avatar.Url||""):""}  sx={{width:170,height:170}} />
                            </Grid>
                        </PortletBody>
                    </Portlet>

                    <PersonnelGroup personnel={corporatePersonnel} updatePage={updatePage} />
                </div>
            </div>}
        </>
    );
};

export default CorporatePersonnelDetailsManagement;
