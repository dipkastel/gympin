import React, {useContext, useEffect, useState} from 'react';
import {Card, Container, Grid2 as Grid, Typography} from "@mui/material";
import _AboutItem from "./_AboutItem";
import {PlaceAbout_getByPlace} from "../../network/api/placeAbout.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import {ErrorContext} from "../../components/GympinPagesProvider";
import AccessDenied from "../../components/AccessDenied";
import SupportIcon from "@mui/icons-material/Support";
import _AddAbout from "./_AddAbout";


const About = ({introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const [placeAbouts, SetPlaceAbouts] = useState([])
    const place = useSelector(({place}) => place.place)
    useEffect(() => {
        document.title = 'مدیریت قوانین و درباره';
        getPlaceAbouts();
    }, []);

    function getPlaceAbouts() {
        PlaceAbout_getByPlace({id: place?.Id}).then(result => {
            SetPlaceAbouts(result.data.Data)
            try {
                introCanGoNext(result.data.Data.length > 0)
            } catch (e) {
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!getAccessOf(personnelAccessEnumT.ManagementAbout))
        return <AccessDenied/>;

    return (
        <>


            <Container>
                <title>مدیریت اطلاعات و قوانین</title>
                <Grid container direction={"column"}>
                    <Grid sx={{p: 2}}>
                        <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                            <Grid container justifyContent={"space-between"}>
                                <Grid container direction={"row"}>
                                    <SupportIcon/>
                                    <Typography sx={{px: 1}}>{"مدیریت اطلاعات و قوانین"}</Typography>
                                </Grid>
                                <Grid>
                                    <_AddAbout place={place} renewList={getPlaceAbouts}/>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid container columns={2} alignItems={"start"} sx={{p: 1}}>
                        {placeAbouts.map(item => (
                            <Grid key={"About" + item.Id} sx={{p: 1}} size={{xs: 2, md: 1, lg: 1, xl: 1}}>
                                <div>
                                    <_AboutItem placeAbout={item} onChange={() => getPlaceAbouts()}/>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>

    );
};

export default About;
