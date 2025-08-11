import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Chip,
  Grid2 as Grid,
  Link,
  List,
  Typography,
} from "@mui/material";
import { SupportStatus } from "../../helper/enums/SupportStatus";
import { ErrorContext } from "../../components/GympinPagesProvider";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Support_query } from "../../network/api/support.api";
import { Image } from "react-bootstrap";

const _SupportList = () => {
  const error = useContext(ErrorContext);
  const navigate = useNavigate();
  const [support, SetSupport] = useState(null);
  const catering = useSelector(({ catering }) => catering.catering);

  useEffect(() => {
    document.title = "پشتیبانی";
    getAllSupport();
  }, [catering]);

  function getAllSupport() {
    if(!catering) return;
    Support_query({
      queryType: "FILTER",
      PlaceId: catering.Id,
      paging: { Page: 0, Size: 50, orderBy: "Id", Desc: true },
    })
      .then((result) => {
        SetSupport(result.data.Data);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function getCollorByStatus(Status) {
    switch (Status) {
      case "COMPLETE":
        return "quinary.boxBg";
      case "CANCEL":
        return "primary.boxBg";
      case "AWAITING_EXPERT":
        return "tertiary.boxBg";
      case "AWAITING_USER":
        return "quaternary.boxBg";
      case "PROCESSING":
        return "quinary.boxBg";
    }
  }

  return (
    <>
      {support?.content && (
        <>
          <List sx={{ width: "100%" }}>
            {support?.content.map((item) => (
              <div key={item.Id}>
                <Link
                  href={"/Support/detail/" + item.Id}
                  sx={{ width: "100%", textDecoration: "none" }}
                >
                  <Card
                    elevation={3}
                    sx={{ marginX: 1, mt: 1, borderRadius: 3 }}
                  >
                    <CardHeader
                      title={item.Title}
                      titleTypographyProps={{ variant: "body1" }}
                      action={
                        item.UnreadCount > 0 && (
                          <Chip
                            sx={{ pt: "3px" }}
                            size="small"
                            color={"error"}
                            label={item.UnreadCount}
                          />
                        )
                      }
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems={"top"}
                      sx={{
                        px: 2,
                        borderTop: "2px solid",
                        borderColor: getCollorByStatus(item.Status),
                      }}
                    >
                      <Typography sx={{ color: "gray" }} variant={"overline"}>
                        {SupportStatus[item.Status]}
                      </Typography>
                      <Typography sx={{ color: "gray" }} variant={"overline"}>
                        {new Date(item.CreatedDate).toLocaleDateString(
                          "fa-IR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </Typography>
                    </Grid>
                  </Card>
                </Link>
              </div>
            ))}
          </List>
        </>
      )}
      {!(support?.content?.length > 0) && (
        <Grid
          container
          sx={{ width: "100%", height: "80vh" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={"/assets/images/icons/ic-empty-support.svg"}
            width={"30%"}
          />
          <Typography variant={"body"} sx={{ m: 2 }}>
            درخواست پشتیبانی وجود ندارد
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default _SupportList;
