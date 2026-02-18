import React, {useContext, useEffect, useState} from "react";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {connect, useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import "react-advanced-cropper/dist/style.css";
import {gym_getMyPlaceGymById, gym_update} from "../../network/api/place.api";
import _PlaceActivity from "../dashboard/alerts/__AlertPlaceActivity";
import _PlaceInfo from "./_PlaceInfo";
import _PlaceLocation from "./_placeLocation";
import __AlertPlaceActivity from "../dashboard/alerts/__AlertPlaceActivity";
import {Card, Container, Grid2 as Grid, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";

const EditPlace = (props) => {

    const error = useContext(ErrorContext);
    const [place, setPlace] = useState();

    const inplace = useSelector(({place}) => place?.place)
    useEffect(() => {
        getPlace();
    }, []);

    function getPlace() {
        gym_getMyPlaceGymById(inplace?.Id).then(result => {
            setPlace(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function submitEdit(data) {
        gym_update(data).then(result => {
            getPlace();
            error.showError({message: "با موفقیت ثبت شد.",});
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
            <title>مشخصات مرکز</title>

            <Container maxWidth>
                <Grid sx={{m:2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <Edit/>
                            <Typography sx={{px: 1}}>{"مشخصات مرکز"}</Typography>
                        </Grid>
                    </Card>
                </Grid>

                <Grid sx={{m: 1}} container alignContent={"center"} columns={12}>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                        <__AlertPlaceActivity ShowIfActive={true} />
                        {place && <_PlaceInfo place={place} SubmitForm={(e) => submitEdit(e)}/>}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                        {place && <_PlaceLocation place={place} SubmitForm={(e) => submitEdit(e)}/>}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default connect(null, sagaActions)(EditPlace);
