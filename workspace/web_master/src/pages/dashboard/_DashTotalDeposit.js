import React from "react";
import { toPriceWithComma } from "../../helper/utils";
import AnalyticsBox from "../../components/AnalyticsBox";
import {CircularProgress} from "@mui/material";

const _DashTotalDeposit = ({ place,wallet, navigate,currentUser }) => {

  function getPlaceBalance(){
    return wallet?.CreditDetails?.find(w=>w.Place?.Id==place?.Id)?.CreditPayableAmount||0
  }
  return (
    <AnalyticsBox
      icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />}
      title={"کیف پول "+currentUser.FullName+" ("+place?.Name+") "}
      onClick={() => navigate("/finance")}
      color={"quaternary"}
      total={wallet?toPriceWithComma(getPlaceBalance()) + " تومان":<CircularProgress size={20} />}
    />
  );
};

export default _DashTotalDeposit;
