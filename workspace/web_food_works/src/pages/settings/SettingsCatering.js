import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Card, Chip, Grid2 as Grid, ListItemText, Typography,} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {cateringActions} from "../../helper/redux/actions/CateringActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../helper/utils";
import {useNavigate} from "react-router-dom";
import {placePersonnel_CateringPersonnelByUser} from "../../network/api/placePersonnel.api";

const SettingsCatering = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const [selectedCatring, SetSelectedCatring] = useState(null);
    const {catering} = useSelector(({catering}) => catering);
    const [personCatering, SetPersonCatering] = useState([]);
    useEffect(() => {
        getUserCaterings();
    }, []);

    useEffect(() => {
        SetSelectedCatring(catering);
    }, [catering]);

    function getUserCaterings() {
        placePersonnel_CateringPersonnelByUser({id: user.Id})
            .then((result) => {
                SetPersonCatering(result.data.Data);
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    function selectedPlaceChanged(cateringId) {
        const catering = personCatering.find(
            (r) => r.Catering?.Id == cateringId,
        ).Catering;
        console.log(catering);
        if (catering) {
            props.SetCatering(catering);
            window.location = "/";
        }
    }

    return (
        <>
            <title>رستوران های من</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}>
                    <Typography sx={{m: 4}} variant={"h4"}>
                        رستوران های من
                    </Typography>
                </Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>

            <Grid container columns={4}>
                {personCatering.map((item, number) => (
                    <Grid size={{xs: 4, sm: 2, md: 1}} key={number}>
                        <Card
                            elevation={3}
                            sx={{
                                margin: 1,
                                p: 1,
                                border: "2px solid",
                                borderColor:
                                    selectedCatring?.Id === item?.Catering?.Id
                                        ? "secondary.otherText"
                                        : "quaternary.otherText",
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
                                    alt="cateringImage"
                                    src={item?.Catering?.Logo?.Url}
                                />

                                <ListItemText
                                    primary={
                                        item.Catering.Name
                                    }
                                    secondary={
                                        item?.Catering?.FinanceCatering?.TotalDeposit > 0 &&
                                        toPriceWithComma(
                                            item?.Catering?.FinanceCatering?.TotalDeposit,
                                        )
                                    }
                                />
                                <Chip
                                    variant={"filled"}
                                    color={"success"}
                                    size={"small"}
                                    label={item?.Catering?.Status}
                                    sx={{mx: 1}}
                                />
                                <Grid container justifyContent={"space-around"} spacing={2}>
                                    <Button
                                        hidden={!(selectedCatring?.Id === item?.Catering?.Id)}
                                        variant={"outlined"}
                                        sx={{
                                            my: 1,
                                            color: "secondary.otherText",
                                            borderColor: "secondary.otherText",
                                        }}
                                        size={"large"}
                                    >
                                        فعال
                                    </Button>
                                    <Button
                                        hidden={selectedCatring?.Id === item?.Catering?.Id}
                                        variant={"outlined"}
                                        sx={{
                                            my: 1,
                                            color: "quaternary.otherText",
                                            borderColor: "quaternary.otherText",
                                        }}
                                        size={"large"}
                                        onClick={() => selectedPlaceChanged(item?.Catering?.Id)}
                                    >
                                        فعالسازی مرکز
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default connect(null, cateringActions)(SettingsCatering);
