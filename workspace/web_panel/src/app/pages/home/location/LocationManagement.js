import React from "react";
import Notice from "../../../partials/content/Notice";
import StatesManagement from "./states/statesManagement";

export default function PlaceManagement() {
  return (
    <>
      <Notice icon="flaticon-warning kt-font-primary">
        <p>مدیریت مناطق در این قسمت انجام میشود</p>
        <p>برای وارد کزدن منطقه باید شهر آن وارد شده باشد</p>
        <p>برای وارد کردن شهر باید استان آن وارد شده باشد</p>
      </Notice>

      <StatesManagement />
    </>
  );
}
