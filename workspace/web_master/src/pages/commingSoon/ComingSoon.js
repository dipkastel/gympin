import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

const ComingSoon = () => {
  return (
    <>
      <Grid
        alignContent={"center"}
        textAlign={"center"}
        sx={{ height: "30vh" }}
      >
        <Typography variant={"h3"}>این بخش به زودی فعال می‌شود</Typography>
      </Grid>
    </>
  );
};

export default ComingSoon;
