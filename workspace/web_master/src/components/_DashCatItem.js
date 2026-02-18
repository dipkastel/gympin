import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _DashCatItem = ({
  icon,
  bgColor,
  header,
  title,
  soon,
  description,
  onClick,
}) => {
  return (
    <Card elevation={10} sx={{ m: 2, bgcolor: bgColor }}>
      <CardActionArea
        sx={{
          pb: 1,
          textAlign: "center",
          alignContent: "center",
          justifyItems: "start",
        }}
        onClick={onClick}
      >
        <Box>{header}</Box>
        <Grid
          container
          sx={{ width: "100%", mt: header ? -5 : 3, px: 2 }}
          alignItems={"end"}
          alignContent={"end"}
          justifyContent={"space-between"}
        >
          <Typography variant={"h6"}>{title}</Typography>
          <Box>{icon}</Box>
        </Grid>
        <Grid container sx={{ width: "100%", p: 2 }}>
          <Typography variant={"caption"}>{description}</Typography>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default _DashCatItem;
