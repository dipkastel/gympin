import React, { Component } from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import {
  Portlet,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../partials/content/Portlet";
import "../applicationHome/ApplicationHomeManagement.css";
import AndroidClientHomeCollections from "./AndroidClientMainPage/AndroidClientHomeCollections";

class ApplicationHomeManagement extends Component {
  render() {
    return (
      <>
        <Notice icon="flaticon-warning kt-font-primary">
          <p>صفحه جیم پین در اپلیکیشن موبایل از طریق این قسمت چیدمان می شود</p>
          <p>
            میتوان از ویجت های قراردادی برای ساخت صفحه اصلی اپلیکیشن موبایل
            استفاده کرد که در این قسمت آنها را مدیریت میکنیم
          </p>
        </Notice>

        <div className="row">
          <div className="col-xl-6">
              <AndroidClientHomeCollections />
          </div>
        </div>
      </>
    );
  }
}

export default ApplicationHomeManagement;
