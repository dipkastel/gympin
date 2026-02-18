import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Card, Chip, Container, Grid2 as Grid, ListItemText, Typography,} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../helper/utils";
import {PlaceStatusType} from "../../helper/enums/PlaceStatusType";
import {useNavigate} from "react-router-dom";
import {placePersonnel_ByUser} from "../../network/api/placePersonnel.api";
import {Edit} from "@mui/icons-material";

const SettingsPlace = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const [selectedPlace, SetSelectedPlace] = useState(
        useSelector(({place}) => place?.place),
    );
    const [personPlace, SetPersonPlace] = useState([]);
    useEffect(() => {
        getUserPlaces();
    }, []);

    function getUserPlaces() {
        placePersonnel_ByUser({id: user?.Id})
            .then((result) => {
                SetPersonPlace(result.data.Data);
                if (
                    result.data.Data.length === 1 &&
                    selectedPlace?.Id !== result.data.Data[0]?.Place?.Id
                ) {
                    SetSelectedPlace(result.data.Data[0]?.Place);
                    props.SetPlace(result.data.Data[0]?.Place);
                    window.location = window.location;
                }
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    function selectedPlaceChanged(placeId) {
        const place = personPlace.find(
            (r) => r.Place?.Id == placeId,
        )?.Place;
        if (place) {
            SetSelectedPlace(place);
            props.SetPlace(place);
            window.location = "/";
        }
    }

    return (
        <>
            <title>مراکز من</title>

            <Container maxWidth>
                <Grid sx={{m:2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <Edit/>
                            <Typography sx={{px: 1}}>{"مراکز ورزشی من"}</Typography>
                        </Grid>
                    </Card>
                </Grid>

                <Grid sx={{m:1}} container columns={4}>
                    {personPlace.map((item, number) => (
                        <Grid size={{xs: 4, sm: 2, md: 1}} key={number}>
                            <Card
                                variant={"outlined"}
                                sx={{
                                    margin: 1,
                                    p: 1,
                                    border: selectedPlace?.Id === item?.Place?.Id ?"2px solid":"",
                                    borderColor:
                                        selectedPlace?.Id === item?.Place?.Id ? "secondary.otherText": "",
                                    borderRadius: 4,
                                }}
                            >
                                <Grid
                                    container
                                    direction={"column"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <Avatar
                                        sx={{width: 120, height: 120, marginTop: 3}}
                                        alt="placeImage"
                                        src={item?.Place?.Logo?.Url}
                                    />

                                    <ListItemText
                                        primary={item.Place.Name}
                                        secondary={
                                            item?.Place?.FinancePlace?.TotalDeposit > 0 &&
                                            toPriceWithComma(
                                                item?.Place?.FinancePlace?.TotalDeposit,
                                            )
                                        }
                                    />
                                    <Chip
                                        variant={"filled"}
                                        color={"success"}
                                        size={"small"}
                                        label={PlaceStatusType[item?.Place?.Status]}
                                        sx={{mx: 1}}
                                    />
                                    <Grid container justifyContent={"space-around"} spacing={2}>
                                        <Button
                                            hidden={!(selectedPlace?.Id === item?.Place?.Id)}
                                            variant={"outlined"}
                                            sx={{
                                                my: 1,
                                                color:selectedPlace?.Id === item?.Place?.Id ? "secondary.otherText": "",
                                                borderColor: "secondary.otherText",
                                            }}
                                            size={"large"}
                                            onClick={() => {
                                                navigate("/settings/editPlace");
                                            }}
                                        >
                                            ویرایش
                                        </Button>
                                        <Button
                                            hidden={selectedPlace?.Id === item?.Place?.Id}
                                            variant={"outlined"}
                                            sx={{
                                                my: 1,
                                                color: "gray",
                                                borderColor: "gray",
                                            }}
                                            size={"large"}
                                            onClick={() => selectedPlaceChanged(item.Place?.Id)}
                                        >
                                            انتخاب مرکز
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default connect(null, placeActions)(SettingsPlace);
