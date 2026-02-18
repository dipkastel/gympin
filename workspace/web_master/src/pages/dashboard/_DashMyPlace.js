import React from "react";
import AnalyticsBox from "../../components/AnalyticsBox";
import {fixTextToSlug, toPriceWithComma} from "../../helper/utils";
import {CircularProgress} from "@mui/material";

const _DashMyPlace = ({ place,wallet, navigate }) => {

  function getTotalBalance(){
    return wallet?.CreditDetails?.map(w=>w.CreditPayableAmount).reduce((a, b) => a + b, 0) ||0
  }

  return (
    <AnalyticsBox
        onClick={(e)=>window.open("https://web.gympin.ir/place/" + place.Id + "-" + fixTextToSlug(place?.Name),'_blank')}
      icon={<img alt="icon" src="/assets/images/icons/ic-glass-mob.svg" />}
      title={place?.Name+" از دید کاربر"}
      color={"tertiary"}
      total={"کلیک کنید"}
    />
  );
};

export default _DashMyPlace;
