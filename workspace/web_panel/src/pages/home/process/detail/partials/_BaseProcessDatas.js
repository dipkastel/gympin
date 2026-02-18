import React from 'react';
import {Avatar, Grid, LinearProgress, Typography} from "@mui/material";
import {ProcessTypeEnum} from "../../../../../helper/enums/ProcessTypeEnum";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import PopoverUser from "../../../../../components/popover/PopoverUser";

const _BaseProcessDatas = ({serial}) => {

    if(!serial) {
        return (<>
            <Portlet>
                <PortletHeader title={"اطلاعات پایه"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    }



    return (
        <>
            <Portlet>
                <PortletHeader title={"اطلاعات پایه"}/>
                <PortletBody>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"right"}
                        alignItems="center">
                        <Avatar alt="userImage" src={(serial?.CreatorUser?.Avatar)?(serial?.CreatorUser.Avatar.Url||""):""}  sx={{width:90,height:90,ml:1}} />
                        <div>
                            <Grid sx={{display:"inline-flex"}}>{"نام و نام خانوادگی : "}<PopoverUser user={serial?.CreatorUser} /></Grid>
                        </div>
                    </Grid>
                    <Typography variant={"h6"}>{" نوع فرایند : "+ProcessTypeEnum[serial?.ProcessType]}</Typography>
                    <Typography variant={"h6"}>{"ایجاد شده در : "+new Date(serial?.CreatedDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                    </Typography>

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _BaseProcessDatas;
