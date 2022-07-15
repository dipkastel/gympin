import React, { Component } from "react";
import Notice from "../../../partials/content/Notice";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import AddMedia from "./AddMedia";
import AllImages from "./AllImages";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";

class MediaManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesToUpload: [],
      addMode: false,
      selectedCatToDelete: [],
      categories: [],
    };
  }
  render() {
    return (
      <>
        <Notice icon="flaticon-warning kt-font-primary">
          <p>مدیریت رسانه ها</p>
          <p>
            <a className="btn btn-primary" href="/media-category">
              مدیریت دسته بندی
            </a>
          </p>
        </Notice>

        {this.state.addMode && <AddMedia />}

        <Portlet>
          <PortletHeader
            title="رسانه ها"
            toolbar={
              <PortletHeaderToolbar>
                <button
                  type="button"
                  className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                  onClick={(e) => this.toggleAddMode(e)}
                >
                  <AddIcon />
                </button>
              </PortletHeaderToolbar>
            }
          />

          <PortletBody>
            <div className="kt-section kt-margin-t-30">
              <div className="kt-section__body">
                <div className="row">
                  <AllImages />
                </div>
              </div>
            </div>
          </PortletBody>
        </Portlet>
      </>
    );
  }

  toggleAddMode(e) {
    e.preventDefault();
    this.setState(() => ({
      addMode: !this.state.addMode,
    }));
  }

  openModalDelete = (e, data) => {
    this.setState(() => ({
      selectedCatToDelete: data,
    }));
  };
  closeModalDelete = () => {
    this.setState(() => ({
      selectedCatToDelete: null,
    }));
  };
  renderModalDelete = (classes, UserToDelete) => {
    console.log(this.state.selectedAccess);
    return (
      <>
        <Modal show={UserToDelete} onHide={this.closeModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>حذف {UserToDelete && UserToDelete.username}</Modal.Body>
          <Modal.Footer>
            <Button
              className={classes.button_edit}
              onClick={this.closeModalDelete}
            >
              خیر
            </Button>
            <Button
              className={classes.button_danger}
              onClick={(e) => this.deleteUser(e, UserToDelete)}
            >
              حذف
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
}

export default MediaManagement;
