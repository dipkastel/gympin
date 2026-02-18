import React, { useContext, useEffect, useState } from "react";
import { Chip, CircularProgress, Typography } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { placeActions } from "../redux/actions/PlaceActions";
import { ErrorContext } from "../../components/GympinPagesProvider";
import {placePersonnel_ByUser, placePersonnel_getUserPlaceBuyableAccess} from "../../network/api/placePersonnel.api";

const SelectPlace = (props) => {
  const error = useContext(ErrorContext);
  const user = useSelector(({ auth }) => auth.user);
  const [loading, setLoding] = useState(false);
  const [selectedPlace, SetSelectedPlace] = useState(
    useSelector(({ place }) => place?.place),
  );
  const [personPlaces, SetPersonPlaces] = useState([]);
  useEffect(() => {
    getUserPlaces();
  }, []);

  function getUserPlaces() {
    if (selectedPlace) return;
    if (personPlaces.length > 0) return;
    setLoding(true);
    placePersonnel_ByUser({ id: user?.Id })
      .then((result) => {
        setLoding(false);
        SetPersonPlaces(result.data.Data);
        if (result.data.Data.length < 1)
          error.showError({ message: "مرکزی برای کاربر وجود ندارد" });
        if (!selectedPlace) {
          setPlaceForUser(result.data.Data[0].Place);
        }
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function setPlaceForUser(place) {
    if (!place) return;
    SetSelectedPlace(place);
    props.SetPlace(place);
  }

  return (
    <>
      {loading && <CircularProgress size="1.5rem" />}
      {!loading && selectedPlace && (
        <Chip
          component={"a"}
          sx={{ cursor: "pointer" }}
          href={"/settings/places"}
          label={
            <Typography variant={"subtitle"}>
              {selectedPlace?.Name}
            </Typography>
          }
        />
      )}
    </>
  );
};

export default connect(null, placeActions)(SelectPlace);
