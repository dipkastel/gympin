import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { Support_add } from "../network/api/support.api";
import { useSelector } from "react-redux";
import { ErrorContext } from "./GympinPagesProvider";

const _NeedNewService = ({ category }) => {
  const error = useContext(ErrorContext);
    const catering = useSelector(({ catering }) => catering.catering);
    const [openModalAdd, setOpenModalAdd] = useState(false);

  function renderModalAdd() {
    function submitRequest(e) {
      e.preventDefault();

      Support_add({
        Title: "درخواست خدمات در دسته " + category,
        Message: {
          Status: "AWAITING_EXPERT",
          Message: e.target.Request.value,
          IsRead: "true",
        }, CateringId: catering.Id,
      })
        .then((result) => {
          setOpenModalAdd(false);
          error.showError({ message: "درخواست شما با موفقیت ثبت شد" });
        })
        .catch((e) => {
          try {
            error.showError({ message: e.response.data.Message });
          } catch (f) {
            error.showError({ message: "خطا نا مشخص" });
          }
        });
    }

    return (
      <Dialog
        open={openModalAdd}
        maxWidth={"sm"}
        onClose={() => setOpenModalAdd(false)}
      >
        <Form onSubmit={(e) => submitRequest(e)}>
          <DialogTitle>{"درخواست خدمات در دسته " + category}</DialogTitle>
          <DialogContent>
            <Typography
              sx={{ textAlign: "justify", mb: 2 }}
              variant={"subtitle2"}
            >
              ما در جیم پین آماده‌ایم تا خدمات مورد نیاز شما را متناسب با
              سازمان‌تان ارائه دهیم. اگر خدماتی مد نظر دارید، با ما در میان
              بگذارید؛ لطفاً بدون نگرانی از محدودیت‌ها، درخواست خود را ثبت کنید
              و بررسی و اجرای آن را به تیم حرفه‌ای ما بسپارید.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              name="Request"
              label="خدمات درخواستی خود را شرح دهید"
              multiline={true}
              rows={5}
              type="text"
              fullWidth
              variant={"outlined"}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ px: 7, mb: 2, mx: 2 }}
              type={"submit"}
              variant={"outlined"}
              color={"success"}
            >
              ثبت
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    );
  }

  return (
    <>
      <Box
        sx={{ zIndex: 900, ml: 4 }}
        onClick={() => {
          setOpenModalAdd(true);
        }}
      >
        <img width={100} alt="icon" src={"/assets/images/btn/add.png"} />
      </Box>
      <Card sx={{ mt: -8, mb: 2, mx: 2 }} elevation={10}>
        <CardActionArea
          sx={{
            px: 4,
            pt: 4,
            pb: 2,
            textAlign: "center",
            alignContent: "center",
            justifyItems: "center",
            borderRadius: 0,
          }}
          onClick={() => setOpenModalAdd(true)}
        >
          {/*<Typography sx={{mb: 4}} variant={"h4"}>*/}
          {/*    ثبت درخواست*/}
          {/*</Typography>*/}

          <Typography
            sx={{
              mb: 1,
              mt: 4,
              width: "100%",
              textAlign: "justify",
              lineHeight: "1.5rem",
            }}
            color={"info"}
            variant={"body2"}
          >
            در صورتی که درخواستی دارید، تیم ما آماده‌ی ارائه خدمات به شما است.
            کافی است درخواست خود را ثبت کنید تا در اسرع وقت پیگیری‌های لازم
            انجام شود.
          </Typography>
          <Button variant={"contained"} size={"large"} sx={{ py: 1, px: 8 }}>
            درخواست شما
          </Button>
        </CardActionArea>
      </Card>
      {renderModalAdd()}
    </>
  );
};

export default _NeedNewService;
