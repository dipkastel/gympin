import React, { useState } from "react";
import { SettingsPower } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { CircleStencil, FixedCropper } from "react-advanced-cropper";
import { connect } from "react-redux";
import { sagaActions } from "../../helper/redux/actions/SagaActions";
import { useNavigate } from "react-router";

const LogoutIcon = () => {
  const navigate = useNavigate();
  const [openModalExit, setOpenModalExit] = useState(false);

  function renderModalExit() {
    function exit() {
      navigate("/auth/logout");
    }

    return (
      <Dialog open={openModalExit} onClose={() => setOpenModalExit(null)}>
        <DialogContent>
          <Typography>از پنل مدیریتی جیم پین خارج می شوید؟ </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"contained"}
            color={"success"}
            onClick={() => setOpenModalExit(false)}
          >
            خیر
          </Button>
          <Button variant={"contained"} color={"error"} onClick={() => exit()}>
            بله
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <IconButton onClick={(e) => setOpenModalExit(true)}>
        <SettingsPower />
      </IconButton>
      {renderModalExit()}
    </>
  );
};

export default LogoutIcon;
