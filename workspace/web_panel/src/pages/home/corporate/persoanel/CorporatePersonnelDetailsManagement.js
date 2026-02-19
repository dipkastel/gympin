import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {useHistory, useParams} from "react-router-dom";
import {corporatePersonnel_getById} from "../../../../network/api/CorporatePersonnel.api";
import _PersonnelCredit from "./_PersonnelCredit";
import {Avatar, Button, Grid} from "@mui/material";
import _PersonnelRole from "./_PersonnelRole";
import {toPriceWithComma} from "../../../../helper";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Portlet, PortletBody} from "../../../partials/content/Portlet";
import _PersonnelGroup from "./_PersonnelGroup";
import PopoverUser from "../../../../components/popover/PopoverUser";

const CorporatePersonnelDetailsManagement = () => {
    const error = useContext(ErrorContext);
    let history = useHistory();
    const {personnelId} = useParams();
    const [corporatePersonnel, SetCorporatePersonnel] = useState(null);

    function getPerson() {
        corporatePersonnel_getById({id: personnelId}).then(result => {
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
            {corporatePersonnel && corporatePersonnel.User && <Notice icon="flaticon-warning kt-font-primary">
                <Grid
                    container
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems="center">
                    <p>{"مدیریت پرسنل "}</p>
                    <div>
                        <Button variant={"contained"} color={"warning"}
                                href={"/corporate/details/" + corporatePersonnel.Corporate.Id}
                        >{corporatePersonnel.Corporate.Name}</Button>
                    </div>

                </Grid>
            </Notice>}
            {!updatePageP && corporatePersonnel && <div className="row">
                <div className="col-md-6">
                    <Portlet>
                        <PortletBody>
                            <Grid
                                container
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems="center">
                                <div>
                                    <Grid sx={{display:"inline-flex"}}>{"نام و نام خانوادگی : "}<PopoverUser user={corporatePersonnel?.User} /></Grid>
                                    <p>{("تلفن : " + corporatePersonnel?.User?.PhoneNumber)}</p>
                                    <p>{("اعتبار : " + toPriceWithComma(corporatePersonnel?.TotalCredit))}</p>
                                </div>

                                <Avatar alt="userImage"
                                        src={(corporatePersonnel?.User?.Avatar) ? (corporatePersonnel?.User?.Avatar?.Url || "") : ""}
                                        sx={{width: 170, height: 170}}/>
                            </Grid>
                        </PortletBody>
                    </Portlet>

                </div>
                <div className="col-md-6">
                    <_PersonnelRole personnelId={personnelId}/>
                    <_PersonnelGroup personnel={corporatePersonnel} updatePage={updatePage}/>
                </div>
                <div className="col-md-12">
                    <_PersonnelCredit corporatePersonnel={corporatePersonnel} getPerson={getPerson}/>
                </div>
            </div>}
        </>
    );
};

export default CorporatePersonnelDetailsManagement;
