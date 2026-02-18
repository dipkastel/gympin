import React from "react";
import { Button, Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { BarChart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import _RViews from "./reports/_RViews";

const GeneralReport = () => {
  const place = useSelector(({ place }) => place?.place);

  return (
    <Container>
      <title>گزارشات مرکز</title>
      <Grid sx={{ mx: 2, mt: 2 }}>
        <Card sx={{ p: 2, width: "100%" }} variant={"outlined"}>
          <Grid container direction={"row"}>
            <BarChart />
            <Typography sx={{ px: 1 }}>{"گزارشات مرکز"}</Typography>
          </Grid>
        </Card>
      </Grid>
      <Grid container columns={2} alignItems={"start"}>
        <Grid size={{ xs: 2, md: 2, lg: 2, xl: 2 }}>
            <_RViews />
        </Grid>
        <Grid size={{ xs: 2, md: 1, lg: 1, xl: 1 }}>
        </Grid>
        <Grid size={{ xs: 2, md: 1, lg: 1, xl: 1 }}>
        </Grid>
      </Grid>
      <Grid size={{ xs: 2, md: 2, lg: 2, xl: 2 }}>
      </Grid>
    </Container>
  );
};

export default GeneralReport;
