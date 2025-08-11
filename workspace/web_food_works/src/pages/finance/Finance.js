import React, { useEffect } from "react";
import _Wallet from "./_Wallet";
import _TotalCredits from "./_TotalCredits";
import {Button, Card, Container, Grid2 as Grid, Typography} from "@mui/material";
import { useNavigate } from "react-router";
import {useSelector} from "react-redux";
import _transactions from "./_Transactions";

export default function Finance() {

  const navigate = useNavigate();
    const catering = useSelector(({ catering }) => catering.catering);
  const currentUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    document.title = "مالی";
  }, []);

  return (
    <Container maxWidth>
      <title>صورت وضعیت</title>

      <Grid
          container
          direction={"row"}
          columns={12}
      >
        <Grid size={12}>
          <Card sx={{m: 2, p: 2}} variant={"outlined"}>
            <Grid container direction={"row"} justifyContent={"space-between"}>
              <Typography>مالی</Typography>
            </Grid>
          </Card>
        </Grid>
        <Grid size={12}>
          <_Wallet place={catering} user={currentUser} />
        </Grid>
        <Grid size={12}>
          <_transactions place={catering}/>
        </Grid>
        </Grid>
    </Container>
  );
}
