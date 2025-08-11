import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { placeAbout_getByPlace } from "../../../network/api/placeAbout.api";
import { ErrorContext } from "../../../components/GympinPagesProvider";

const _CateringAbout = ({ Catering }) => {
  const error = useContext(ErrorContext);
  const [About, setAbout] = useState(null);

  useEffect(() => {
    placeAbout_getByPlace({ id: Catering?.Id })
      .then((result) => {
        setAbout(result?.data?.Data[0]);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }, [Catering]);

  return About ? (
    <>
      <Typography variant={"h4"}>{About?.Name}</Typography>
      <Typography sx={{ mt: 2, lineHeight: 1.9 }} variant={"body1"}>
        {About?.Description}
      </Typography>
    </>
  ) : (
    <>
      <CircularProgress size={120} />
    </>
  );
};

export default _CateringAbout;
