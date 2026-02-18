import React from "react";
import AnalyticsBox from "../../components/AnalyticsBox";
import { toPriceWithComma } from "../../helper/utils";
import {CircularProgress} from "@mui/material";

const _DashTotalCredit = ({ currentUser,wallet, navigate }) => {

  function getTotalBalance(){
    return wallet?.CreditDetails?.map(w=>w.CreditPayableAmount).reduce((a, b) => a + b, 0) ||0
  }

  return (
    <AnalyticsBox
      icon={<img alt="icon" src="/assets/images/icons/ic-glass-mob.svg" />}
      title={"مجموع کیف پول های "+currentUser.FullName||"من"}
      color={"tertiary"}
      total={wallet?toPriceWithComma(getTotalBalance()) + " تومان":<CircularProgress size={20} />}
    />
  );
};

export default _DashTotalCredit;
