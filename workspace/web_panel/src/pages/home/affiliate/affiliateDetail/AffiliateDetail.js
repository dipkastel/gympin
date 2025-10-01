import React, {useContext} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Grid} from "@mui/material";
import AffiliatorData from "../baseData/AffiliatorData";
import AffiliateCorporates from "../baseData/AffiliateCorporates";
import AffiliatePlaces from "../baseData/AffiliatePlaces";

const AffiliateDetail = () => {

    const error = useContext(ErrorContext);
    const {affiliatorId} = useParams();


    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">جزئیات همکاران فروش</Notice>


            <Grid container spacing={3}>
                <Grid item size={{xs:12,md:12}}>
                    <AffiliatorData affiliateId={affiliatorId} />
                </Grid>
                <Grid item size={{xs:12,md:6}}>
                    <AffiliateCorporates  affiliateId={affiliatorId} />
                </Grid>
                <Grid item size={{xs:12,md:6}}>
                    <AffiliatePlaces  affiliateId={affiliatorId} />
                </Grid>
            </Grid>
        </>
    );
};

export default AffiliateDetail;
