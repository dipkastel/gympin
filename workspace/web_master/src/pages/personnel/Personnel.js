import React, {useContext, useEffect, useState} from 'react';
import _AddPersonnel from "./_AddPersonnel";
import _PersonnelList from "./_PersonnelList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../network/api/placePersonnel.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {Card, CardContent, CardHeader, Container, Grid2 as Grid, Typography} from "@mui/material";
import {getWizardComplete} from "../../helper/pocket";
import SupportIcon from "@mui/icons-material/Support";
import _AddImage from "../images/_AddImage";

const Personnel = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [personnelList, SetPersonnelList] = useState(null);

    useEffect(() => {
        getPersonnelList();
    }, []);

    function getPersonnelList() {
        SetPersonnelList(null);
        placePersonnel_ByPlace({Id: place?.Id}).then(result => {
            SetPersonnelList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return <AccessDenied/>;

    return (
        <>


            <Container>
                <title>پرسنل مجموعه ورزشی</title>
                <Grid container direction={"column"}>
                    <Grid sx={{p: 2}}>
                        <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                            <Grid container justifyContent={"space-between"}>
                                <Grid container direction={"row"}>
                                    <SupportIcon/>
                                    <Typography sx={{px: 1}}>{"پرسنل مجموعه ورزشی"}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid container columns={2} alignItems={"start"} sx={{p: 1}}>
                        <Grid sx={{p: 1}} size={{xs: 2, md: 1, lg: 1, xl: 1}}>
                            <Card sx={{width: "100%"}} variant={"outlined"}>
                                <CardHeader
                                    sx={{paddingBottom: 0}}
                                    title={"پرسنل"}
                                    action={personnelList && <_AddPersonnel renewList={getPersonnelList}/>}
                                />
                                <CardContent sx={{margin: 0}}>
                                    {personnelList && <_PersonnelList personnelList={personnelList} renewList={getPersonnelList}/>}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Personnel;
