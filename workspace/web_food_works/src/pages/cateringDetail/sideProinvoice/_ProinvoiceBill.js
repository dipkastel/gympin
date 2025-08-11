import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { toPriceWithComma } from "../../../helper/utils";

const _ProinvoiceBill = ({ CurrentBasket, catering, getItemCount }) => {
  const [openModalConfirm, setOpenModalConfirm] = React.useState(false);
  const [freeDelivery, setFreeDelivery] = React.useState(false);

  useEffect(() => {
    setFreeDelivery(catering.FreeDeliveryPrice < getCalculatedBill());
  }, [CurrentBasket]);

  function getCalculatedBill() {
    return CurrentBasket.InvoiceBuyables.reduce(function (a, b) {
      return a + b.Count * b.Buyable.Price;
    }, 0);
  }

  function getCalculatedBillTax() {
    return getCalculatedBill() * 0.1;
  }

  return (
    <>
      {!!CurrentBasket?.InvoiceBuyables?.length > 0 && (
        <Card sx={{ m: 1 }}>
          <CardHeader title={"صورت حساب"} />
          <CardContent>
            <Typography variant={"body2"}>
              {"جمع سفارش " + toPriceWithComma(getCalculatedBill()) + " تومان"}
            </Typography>
            <Divider
              variant="inset"
              sx={{ marginLeft: 0, marginRight: 0, my: 1, width: "100%" }}
              component="div"
            />
            <Typography variant={"body2"}>
              {"ارزش افزوده " +
                toPriceWithComma(getCalculatedBillTax()) +
                " تومان"}
            </Typography>
            {catering.HasDishesPrice && (
              <>
                <Divider
                  variant="inset"
                  sx={{ marginLeft: 0, marginRight: 0, my: 1, width: "100%" }}
                  component="div"
                />
                <Typography variant={"body2"}>
                  {"هزینه ظروف اضافه خواهد شد"}
                </Typography>
              </>
            )}

            {!freeDelivery && (
              <>
                <Divider
                  variant="inset"
                  sx={{ marginLeft: 0, marginRight: 0, my: 1, width: "100%" }}
                  component="div"
                />
                <Typography variant={"body2"}>
                  {"هزینه ارسال اضافه خواهد شد"}
                </Typography>
              </>
            )}
            {freeDelivery && (
              <>
                <Divider
                  variant="inset"
                  sx={{ marginLeft: 0, marginRight: 0, my: 1, width: "100%" }}
                  component="div"
                />
                <Typography variant={"body2"}>
                  {"ارسال رایگان توسط " + catering.Name}
                </Typography>
              </>
            )}
            <Divider
              variant="inset"
              sx={{ marginLeft: 0, marginRight: 0, my: 1, width: "100%" }}
              component="div"
            />
            <Button
              size={"large"}
              fullWidth
              variant={"contained"}
              disabled={getItemCount() < catering.MinOrderCount}
              sx={{ mt: 2 }}
              onClick={(e) => setOpenModalConfirm(e)}
            >
              {"ارسال به " + catering.Name}
              {getItemCount() < catering.MinOrderCount &&
                " با " +
                  (catering.MinOrderCount - getItemCount()) +
                  " آیتم دیگر"}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default _ProinvoiceBill;
