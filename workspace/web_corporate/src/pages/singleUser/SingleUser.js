import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {corporatePersonnel_getById} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import _UserDelete from "./partials/_UserDelete";
import _UserGroup from "./partials/_UserGroup";
import _UserCredits from "./partials/_UserCredits";
import _UserBaseData from "./partials/_UserBaseData";
import {Container, Grid2 as Grid, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import _UserAddGroupCredit from "../sport/Gympin/Actions/_UserAddCredit";

const SingleUser = () => {

    const {PersonnelId} = useParams();
    const error = useContext(ErrorContext);
    const [corporatePersonnel, setCorporatePersonnel] = useState(null);

    useEffect(() => {
        getCorporatePerson();
    }, [PersonnelId]);


    function getCorporatePerson() {
        if (!PersonnelId) return;
        corporatePersonnel_getById({id: PersonnelId}).then(result => {
            setCorporatePersonnel(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (
        <>

            <Container>
                <title>مشخصات کارمند</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid sx={{p: 4}} textAlign={"start"} size={{md: 6, lg: 6, xl: 6}}>
                        <Typography variant={"h4"}>
                            {corporatePersonnel?.User?.FullName ? corporatePersonnel?.User?.FullName : corporatePersonnel?.User?.PhoneNumber}
                        </Typography>
                        <Typography variant={"body2"}>
                            {"اعتبار فعلی : " + toPriceWithComma(corporatePersonnel?.TotalCredit)}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid size={{md: 6}}>

                        <Grid container>
                            <Grid size={{md: 6}}>

                                {corporatePersonnel &&
                                <_UserBaseData corporatePersonnel={corporatePersonnel} getCorporatePerson={getCorporatePerson}/>}

                            </Grid>
                            <Grid size={{md: 6}}>
                                {corporatePersonnel && <_UserGroup corporatePersonnel={corporatePersonnel}/>}
                                {corporatePersonnel && <_UserDelete corporatePersonnel={corporatePersonnel}/>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className={"col-md-6"}>
                        {corporatePersonnel && <_UserCredits corporatePersonnel={corporatePersonnel} updatePage={getCorporatePerson}/>}
                    </div>
                </Grid>
            </Container>
        </>
    );
};

export default SingleUser;
