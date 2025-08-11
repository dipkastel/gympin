import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete, DinnerDining } from "@mui/icons-material";
import { toPriceWithComma } from "../../../helper/utils";
import _ProInvoiceItemCount from "./_ProInvoiceItemCount";
import _ProinvoiceBill from "./_ProinvoiceBill";
import _SideMenuHeader from "./_SideMenuHeader";

const SideMenu = ({
  CurrentBasket,
  addBuyable,
  removeOrder,
  setOrderCount,
  catering,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function getItemCount() {
    return CurrentBasket.InvoiceFoods.reduce(function (a, b) {
      return b.IsCount ? a + b.Count : a;
    }, 0);
  }

  return (
    <>
      {CurrentBasket && (
        <>
          <Card sx={{ py: 4 }} onClick={toggleDrawer(true)}>
            <Grid container justifyContent={"center"}>
              <Badge
                badgeContent={CurrentBasket.InvoiceBuyables.length}
                color="error"
              >
                <DinnerDining sx={{ m: 1 }} fontSize={"large"} />
              </Badge>
            </Grid>
          </Card>
          <Drawer open={open} anchor={"right"} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 520, mt: 8 }}>
              <_SideMenuHeader
                CurrentBasket={CurrentBasket}
                catering={catering}
              />
              {!!CurrentBasket?.InvoiceBuyables?.length > 0 ? (
                <Card sx={{ m: 1 }}>
                  <CardHeader title={"سفارشات"} />

                  <CardContent>
                    <Grid container direction={"row"}>
                      {CurrentBasket?.InvoiceBuyables?.map((item) => (
                        <Grid
                          container
                          key={item.Id}
                          size={12}
                          sx={{ width: "100%" }}
                          justifyContent={"space-between"}
                        >
                          <Grid>
                            <ListItemText
                              primary={item.Name}
                              secondary={
                                toPriceWithComma(item.UnitPrice) + " تومان"
                              }
                            />
                          </Grid>
                          <Grid>
                            <_ProInvoiceItemCount
                              item={item}
                              setOrderCount={setOrderCount}
                              removeOrder={removeOrder}
                              addBuyable={addBuyable}
                            />
                          </Grid>
                          <Divider
                            variant="inset"
                            sx={{
                              marginLeft: 0,
                              marginRight: 0,
                              width: "100%",
                            }}
                            component="div"
                          />
                        </Grid>
                      ))}
                      <Typography sx={{ mt: 2 }} variant={"h6"} fullWidth>
                        {"مجموع " + getItemCount() + " غذا"}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Card sx={{ m: 1, p: 2, textAlign: "center" }}>
                  <Typography variant={"body2"}>آیتمی انتخاب نشده</Typography>
                </Card>
              )}
              <_ProinvoiceBill
                catering={catering}
                CurrentBasket={CurrentBasket}
                getItemCount={() => getItemCount()}
              />
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default SideMenu;
