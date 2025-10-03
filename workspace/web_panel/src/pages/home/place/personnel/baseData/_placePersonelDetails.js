import React from 'react';
import {Avatar, Grid} from "@mui/material";
import {Portlet, PortletBody} from "../../../../partials/content/Portlet";

const _placePersonelDetails = ({personel}) => {
    return (
        <>

            <Portlet >

                <PortletBody>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"space-around"}
                        alignItems="center">
                        <div>
                            <p>{("نام و نام خانوادگی : "+(personel?.User?.FullName||"ثبت نشده"))}</p>
                            <p>{("نام کاربری : "+personel?.User?.Username)}</p>
                            <p>{("تلفن : "+personel?.User?.PhoneNumber)}</p>
                        </div>

                        <Avatar  alt="userImage" src={(personel?.User?.Avatar||"")}  sx={{width:130,height:130}} />
                    </Grid>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelDetails;
