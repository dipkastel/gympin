import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

const _UsersActions = ({ icon, title, onClick }) => {
  return (
    <Card>
      <CardActionArea
        sx={{
          p: 4,
          textAlign: "center",
          alignContent: "center",
          justifyItems: "center",
        }}
        onClick={onClick}
      >
        <Box sx={{ mb: 1 }}>{icon}</Box>
        <Typography variant={"h6"}>{title}</Typography>
      </CardActionArea>
    </Card>
  );
};

export default _UsersActions;
