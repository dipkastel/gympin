import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SideMenu from "./sideProinvoice/SideMenu";
import _CateringSelectDate from "./partials/_CateringSelectDate";
import _CateringMenu from "./partials/_CateringMenu";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  invoice_addFood,
  invoice_changeInvoiceBuyableCount,
  invoice_deleteBuyable,
  invoice_getBasketByUserId,
} from "../../network/api/invoice.api";
import { ErrorContext } from "../../components/GympinPagesProvider";
import { useNavigate } from "react-router";
import { Catering_getById } from "../../network/api/catering.api";
import _CateringAbout from "./partials/_CateringAbout";

const CateringDetail = () => {
  const error = useContext(ErrorContext);
  let { cateringId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [CurrentBasket, SetCurrentBasket] = useState(null);
  const [catering, SetCatering] = useState(null);

  useEffect(() => {
    getBasket();
    getCatering();
  }, []);

  function getCatering() {
    Catering_getById({ id: cateringId })
      .then((result) => {
        SetCatering(result.data.Data);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function getBasket() {
    invoice_getBasketByUserId(currentUser.Id)
      .then((result) => {
        SetCurrentBasket(result.data.Data);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function AddFood(itemId) {
    invoice_addFood({
      Invoice: { Id: CurrentBasket?.Id || null },
      MenuItem: { Id: itemId },
      Count: 1,
    })
      .then((result) => {
        error.showError({ message: "به سبد خرید اضافه شد" });
        getBasket();
      })
      .catch((e) => {
        getBasket();
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function RemoveOrder(item) {
    if (item.Count < 2) {
      invoice_deleteBuyable({ id: item.Id })
        .then((data) => {
          error.showError({ message: "عملیات موفق" });
          getBasket();
        })
        .catch((e) => {
          getBasket();
          try {
            error.showError({ message: e.response.data.Message });
          } catch (f) {
            error.showError({ message: "خطا نا مشخص" });
          }
        });
    } else {
      updateCount("minus", item);
    }
  }

  function updateOrderCount(item, Count) {
    if (Count < 1) {
      error.showError({ message: "تعداد آیتم ها نمی‌تواند کمتر از 1 باشد!" });
      getBasket();
      return;
    }
    updateCount("update", item, Count);
  }

  function updateCount(action, item, _newCount) {
    let newCount = item.Count;
    if (action === "plus") {
      newCount++;
    }

    if (action === "minus") {
      newCount--;
    }
    if (action === "update") {
      newCount = _newCount;
    }
    invoice_changeInvoiceBuyableCount({
      Id: item.Id,
      Count: newCount,
    })
      .then((result) => {
        error.showError({ message: "عملیات موفق" });
        getBasket();
      })
      .catch((e) => {
        getBasket();
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  return (
    <>
      <Grid columns={120} container>
        <Grid
          sx={{ p: 1 }}
          size={{ xs: 90, sm: 96, md: 102, lg: 104, xl: 108 }}
        >
          <Card>
            <CardContent sx={{ p: 2 }}>
              <_CateringAbout Catering={catering} />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          sx={{ p: 1, alignContent: "top" }}
          size={{ xs: 30, sm: 24, md: 18, lg: 16, xl: 12 }}
        >
          <Button sx={{ my: 1 }} variant={"contained"} fullWidth size={"small"}>
            تاریخچه و پیگیری
          </Button>
          <SideMenu
            CurrentBasket={CurrentBasket}
            catering={catering}
            addBuyable={AddFood}
            setOrderCount={updateOrderCount}
            removeOrder={RemoveOrder}
          />
        </Grid>
        {catering && (
          <Grid size={{ xs: 120, sm: 120, md: 120, lg: 120, xl: 120 }}>
            <_CateringSelectDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              catering={catering}
            />
          </Grid>
        )}
        <Grid size={{ xs: 120, sm: 120, md: 120, lg: 120, xl: 120 }}>
          {selectedDate && (
            <_CateringMenu
              selectedDate={selectedDate}
              catering={cateringId}
              orders={CurrentBasket}
              addOrder={AddFood}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CateringDetail;
