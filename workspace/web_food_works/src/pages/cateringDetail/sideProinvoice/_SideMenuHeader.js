import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Form } from "react-bootstrap";

const _SideMenuHeader = ({ CurrentBasket, catering }) => {
  const [openModalCancel, setOpenModalCancel] = useState(false);

  function renderModalCancel() {
    function invoiceChangeStatus(e) {
      e.preventDefault();
      // Invoice_cancel({Id: CurrentBasket.Id}).then(result => {
      //
      // }).catch(e => {
      //     try {
      //         error.showError({message: e.response.data.Message,});
      //     } catch (f) {
      //         error.showError({message: "خطا نا مشخص",});
      //     }
      // })
      // setItemToDelete(null)
      // setGroups([]);
    }

    return (
      <Dialog open={openModalCancel} onClose={() => setOpenModalCancel(null)}>
        <Form onSubmit={(e) => invoiceChangeStatus(e)}>
          <DialogTitle>حذف سبد خرید</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant={"body2"}>
                {"آیا از حذف این سبد خرید اطمینان دارید؟"}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant={"contained"}
              color={"error"}
              onClick={() => setOpenModalCancel(null)}
            >
              لغو
            </Button>
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              حذف
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    );
  }

  return (
    <>
      <Card sx={{ m: 1, textAlign: "center" }}>
        <Grid sx={{ p: 2 }} container justifyContent={"center"}>
          <Grid size={11}>
            <Typography variant={"h5"}>صورت حساب</Typography>
            {CurrentBasket?.InvoiceFoods[0]?.Date && (
              <Typography variant={"body2"}>
                {new Date(
                  CurrentBasket?.InvoiceFoods[0]?.Date,
                ).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            )}
          </Grid>
          {!!CurrentBasket?.InvoiceBuyables?.length > 0 && (
            <Grid size={1}>
              <IconButton>
                <Delete
                  color={"error"}
                  onClick={(e) => setOpenModalCancel(true)}
                />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Card>
      {renderModalCancel()}
    </>
  );
};

export default _SideMenuHeader;
