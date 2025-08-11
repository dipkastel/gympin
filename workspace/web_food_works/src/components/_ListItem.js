import React from "react";
import { Card, CardHeader, Chip, Typography } from "@mui/material";

const _ListItem = ({ destination, title, onClick, badgeCount, className }) => {
  return (
    <div className={className}>
      <Card elevation={3} sx={{ margin: 1, borderRadius: 3 }}>
        <CardHeader
          component={"a"}
          sx={{ textDecoration: "none", color: "#000000" }}
          href={destination}
          onClick={onClick}
          title={
            <Typography
              width={"100%"}
              variant={"body2"}
              noWrap={true}
              textAlign={"right"}
              component="div"
              sx={{
                marginY: 0.1,
              }}
            >
              {title}
            </Typography>
          }
          action={
            badgeCount ? (
              <Chip
                label={badgeCount}
                size={"small"}
                sx={{ fontSize: 15, pt: "4px" }}
                color={"error"}
              />
            ) : (
              ""
            )
          }
        />
      </Card>
    </div>
  );
};

export default _ListItem;
