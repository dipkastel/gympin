import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "./components/HomeSlider";
import HomeTitle from "./components/HomeTitle";
import HomeUserList from "./components/HomeUserList";
import HomeBanner from "./components/HomeBanner";
import { HomePage_getHome } from "../../network/api/homePage.api";
import { connect, useSelector } from "react-redux";
import { getHomeId } from "../../helper/serverSettingsHelper";
import { ErrorContext } from "../../components/GympinPagesProvider";
import HomeClickableTitle from "./components/HomeClickableTitle";
import HomeSingleUser from "./components/HomeSingleUser";
import HomeClickableBanner from "./components/HomeClickableBanner";
import HomeDiscountList from "./components/HomeDiscountList";
import HomeSingleDiscount from "./components/HomeSingleDiscount";
import HomeContentList from "./components/HomeContentList";
import HomeSingleContent from "./components/HomeSingleContent";
import { sagaActions } from "../../helper/redux/actions/SagaActions";
import { CircularProgress, Grid2 as Grid } from "@mui/material";

function Home(props) {
  const error = useContext(ErrorContext);
  const [data, setData] = useState(null);
  const [serverSettings, setServerSettings] = useState(
    useSelector((settings) => settings),
  );
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      props.RequestServerSettings(currentUser);
    }
    HomePage_getHome({ id: getHomeId(serverSettings) })
      .then((result) => {
        setData(result.data.Data);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
    if (getHomeId(serverSettings) == 2) {
      setTimeout(() => {
        if (currentUser) props.RequestServerSettings(currentUser);
      }, 4000);
    }
  }, [serverSettings]);
  var classe = { sm: 12, md: 6 };
  var sxx = { p: 1 };
  return (
    <Grid container>
      {data ? (
        data.Items &&
        data.Items.sort((a, b) => a.Priority - b.Priority).map(
          (item, index) => {
            switch (item.Type) {
              case "SLIDER":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeSlider key={item.Id} item={item} />
                  </Grid>
                );
              case "TITLE":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeTitle key={item.Id} item={item} />
                  </Grid>
                );
              case "CLICKABLE_TITLE":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeClickableTitle key={item.Id} item={item} />
                  </Grid>
                );
              case "USER_LIST":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeUserList key={item.Id} item={item} />
                  </Grid>
                );
              case "SINGLE_USER":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeSingleUser key={item.Id} item={item} />
                  </Grid>
                );
              case "BANNER":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeBanner key={item.Id} item={item} />
                  </Grid>
                );
              case "CLICKABLE_BANNER":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeClickableBanner key={item.Id} item={item} />
                  </Grid>
                );
              case "DISCOUNT_LIST":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeDiscountList key={item.Id} item={item} />
                  </Grid>
                );
              case "SINGLE_DISCOUNT":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeSingleDiscount key={item.Id} item={item} />
                  </Grid>
                );
              case "CONTENT_LIST":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeContentList key={item.Id} item={item} />
                  </Grid>
                );
              case "SINGLE_CONTENT":
                return (
                  <Grid sx={sxx} size={classe}>
                    <HomeSingleContent key={item.Id} item={item} />
                  </Grid>
                );
              default:
                return item.Type + "\n\r\n\r\t";
            }
          },
        )
      ) : (
        <>
          <Grid
            container
            sx={{ width: "100%", height: "80vh" }}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default connect(null, sagaActions)(Home);
