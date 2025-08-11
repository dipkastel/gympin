import React, { useContext, useEffect } from "react";
import { Grid, Typography, useColorScheme } from "@mui/material";
import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
import { ErrorContext } from "./GympinPagesProvider";

const __SelectPersonnel = ({ hidden, onChange, value }) => {
  const error = useContext(ErrorContext);
  const catering = useSelector(({ catering }) => catering.catering);

  const { mode } = useColorScheme();

  useEffect(() => {
    if (hidden) onChange({ value: null });
  }, [hidden]);

  if (!mode) {
    return null;
  }

  const promiseUserOptions = (inputValue) => {
    return new Promise((resolve) => {
      function getLabelOfUser(itm) {
        return (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant={"body2"}>
              {itm?.User?.FullName ? `(${itm?.User?.FullName})` : "ثبت نشده"}
            </Typography>
            <Typography variant={"body2"}>{itm?.User?.Username}</Typography>
          </Grid>
        );
      }

      // placePersonnel_query({
      //   queryType: "FILTER",
      //   CateringId: catering.Id,
      //   FullName: inputValue,
      //   paging: { Page: 0, Size: 50, Desc: true },
      // })
      //   .then((data) => {
      //     resolve(
      //       data.data.Data.content.map((itm) => {
      //         return { label: getLabelOfUser(itm), value: itm.Id };
      //       }),
      //     );
      //   })
      //   .catch((e) => {
      //     try {
      //       error.showError({ message: e.response.data.Message });
      //     } catch (f) {
      //       error.showError({ message: "خطا نا مشخص" });
      //     }
      //   });
    });
  };

  return (
    <>
      {!hidden && (
        <AsyncSelect
          cacheOptions
          defaultOptions
          className={
            mode == "dark" ? "rselect-container" : "rdselect-container"
          }
          classNamePrefix="rselect"
          name={"Personnel"}
          label="پرسنل"
          placeholder="پرسنل"
          onChange={onChange}
          loadOptions={promiseUserOptions}
        />
      )}
    </>
  );
};

export default __SelectPersonnel;
