import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sagaActions } from "../../helper/redux/actions/SagaActions";
import _DashSlider from "./_DashSlider";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const catering = useSelector(({ catering }) => catering.catering);

  useEffect(() => {
    if(catering)
      props.RequestCatering(catering);
  }, []);

  return (
    <>
      <title>پیشخوان</title>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <_DashSlider />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        </Grid>
      </Grid>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
        </Grid>
      </Grid>
      <Grid container columns={12}></Grid>
    </>
  );
};

export default connect(null, sagaActions)(Dashboard);
