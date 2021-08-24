import React from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import StatesManagement from "./states/statesManagement";
import CitiesManagement from "./cities/citiesManagement";
import RegionsManagement from "./regions/regionsManagement";



export default function PlaceManagement() {

  return (
    <>
      <Notice icon="flaticon-warning kt-font-primary">
        <p>
          مدیریت مناطق در این قسمت انجام میشود
        </p>
        <p>
            برای وارد کزدن منطقه باید شهر آن وارد شده باشد
        </p>
        <p>
            برای وارد کردن شهر باید استان آن وارد شده باشد
        </p>
      </Notice>

    <StatesManagement/>

    </>
  );
}
