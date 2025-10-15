import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { sagaActions } from "../../helper/redux/actions/SagaActions";
import { connect, useSelector } from "react-redux";
import {
  media_AddImage,
  media_getCatById,
} from "../../network/api/multimedia.api";
import { Form } from "react-bootstrap";
import { ErrorContext } from "../../components/GympinPagesProvider";
import { CircleStencil, FixedCropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { resizeCanvas } from "../../helper/utils";
import {Catering_update, catering_UpdateLogo} from "../../network/api/catering.api";

const EditCatering = (props) => {
  const error = useContext(ErrorContext);
  const catering = useSelector(({ catering }) => catering.catering);
  const [imageUrl, SetImageUrl] = useState("");
  const [inCatering, SetInCatering] = useState(catering);
  const [imageToCrop, SetImageToCrop] = useState(null);
  const [ratio, setRatio] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    SetImageUrl(catering.Logo ? catering.Logo.Url : "");
    SetInCatering(catering);

    try {
      if (
        catering?.Address &&
        catering?.Email &&
        catering?.Tel &&
        catering?.Name
      )
        props?.introCanGoNext(true);
    } catch (e) {}
  }, [catering]);
  useEffect(() => {
    document.title = "ویرایش مشخصات سازمان";
    console.log("---2");
    props.RequestCatering(catering);
    getratio();
  }, []);

  function getratio() {
    media_getCatById({ id: 5 })
      .then((result) => {
        setRatio(result.data.Data);
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function updateCatering(e) {
    e.preventDefault();
    Catering_update({
      Id: catering.Id,
      Name: inCatering.Name,
      Address: inCatering.Address,
      Email: inCatering.Email,
      Tel: inCatering.Tel,
    })
      .then((result) => {
        console.log("---3");
        props.RequestCatering(catering);
        error.showError({ message: "ثبت موفق" });
      })
      .catch((e) => {
        try {
          error.showError({ message: e.response.data.Message });
        } catch (f) {
          error.showError({ message: "خطا نا مشخص" });
        }
      });
  }

  function uploadImage(e) {
    let canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      if (canvas.height < ratio.MINH) {
        error.showError({ message: "تصویر کوچک است" });
        return;
      }
      if (canvas.height > ratio.MAXH) {
        canvas = resizeCanvas(canvas, ratio.MAXH, null);
      }
      canvas.toBlob((blob) => {
        if (blob) {
          error.showError({ message: "لطفا تا ارسال کامل تصویر صبر کنید." });
          SetImageToCrop(null);
          const formData = new FormData();
          formData.append("MediaType", "IMAGE");
          formData.append("File", blob);
          formData.append("CategoryId", ratio.Id);
          formData.append("Title", catering.Name);
          formData.append("Description", catering.Id);
          //
          media_AddImage(formData)
            .then((data) => {
              catering_UpdateLogo({
                CateringId: catering.Id,
                MultimediaId: data.data.Data.Id,
              })
                .then((result) => {
                  console.log("---4");
                  props.RequestCatering(catering);

                  SetImageUrl(
                    result.data.Data.Avatar
                      ? result.data.Data.Avatar.Url + "&width=200"
                      : "",
                  );
                  error.showError({ message: "با موفقیت ثبت شد" });
                })
                .catch((e) => {
                  try {
                    error.showError({ message: e.response.data.Message });
                  } catch (f) {
                    error.showError({ message: "خطا نا مشخص" });
                  }
                });
            })
            .catch((e) => {
              try {
                error.showError({ message: e.response.data.Message });
              } catch (f) {
                error.showError({ message: "خطا نا مشخص" });
              }
            });
        }
      });
    }
  }

  function renderModalCrop() {
    const onChange = (cropper) => {
      console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    return (
      <>
        <Dialog
          className={"w-100"}
          open={!!imageToCrop}
          onClose={() => SetImageToCrop(null)}
        >
          <DialogContent>
            <FixedCropper
              ref={cropperRef}
              src={imageToCrop}
              stencilComponent={CircleStencil}
              stencilProps={{
                aspectRatio: 1,
                handlers: false,
                lines: false,
                movable: false,
                resizable: false,
              }}
              stencilSize={{
                width: ratio ? ratio.MAXW : 1000,
                height: ratio ? ratio.MAXH : 1000,
              }}
              onChange={onChange}
              className={"cropper"}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => uploadImage()}
            >
              تایید
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <title>مشخصات سازمان</title>
      <Grid container columns={9} alignItems={"center"}>
        <Grid size={{ md: 6, lg: 6, xl: 6 }}>
          <Typography sx={{ m: 4 }} variant={"h4"}>
            مشخصات سازمان
          </Typography>
        </Grid>
        <Grid textAlign={"end"} size={{ md: 3, lg: 3, xl: 3 }}>
          {" "}
        </Grid>
      </Grid>
      <Card elevation={3} sx={{ margin: 1 }}>
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <label htmlFor="raised-button-file">
              <Avatar
                sx={{ width: 120, height: 120, marginTop: 3 }}
                alt="catering logo"
                src={imageUrl}
              />
            </label>
            <Input
              accept="image/*"
              className={"input"}
              style={{ display: "none" }}
              id="raised-button-file"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onload = () => {
                  SetImageToCrop(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
              type="file"
            />
          </Grid>
          <Form onSubmit={(e) => updateCatering(e)}>
            <FormControl sx={{ p: 1 }} fullWidth>
              <TextField
                autoFocus
                value={inCatering.Name}
                label="نام سازمان*"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  SetInCatering({ ...inCatering, Name: e.target.value })
                }
              />
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth>
              <TextField
                autoFocus
                value={inCatering.Email}
                label="ایمیل*"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  SetInCatering({ ...inCatering, Email: e.target.value })
                }
              />
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth>
              <TextField
                autoFocus
                value={inCatering.Tel}
                label="تلفن*"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  SetInCatering({ ...inCatering, Tel: e.target.value })
                }
              />
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth>
              <TextField
                label="آدرس*"
                type="text"
                variant="outlined"
                value={inCatering.Address}
                onChange={(e) =>
                  SetInCatering({ ...inCatering, Address: e.target.value })
                }
                multiline
                minRows={3}
              />
            </FormControl>
            <FormControl sx={{ p: 1 }} fullWidth>
              <Button variant={"contained"} type={"submit"}>
                ثبت
              </Button>
            </FormControl>
          </Form>
        </CardContent>
      </Card>
      {renderModalCrop()}
    </>
  );
};

export default connect(null, sagaActions)(EditCatering);
