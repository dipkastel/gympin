import React, { useEffect } from "react";
import { Alert, Card, CardContent, Stack, Typography } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { toPriceWithComma } from "../../helper/utils";
import { sagaActions } from "../../helper/redux/actions/SagaActions";

const _TotalCredits = (props) => {
    const catering = useSelector(({ catering }) => catering.catering);

    useEffect(() => {
    if (!catering) return;
        console.log("---4");
    props.RequestCatering(catering);
  }, []);

  return (
    <div className={"col-md-6"}>
      <Alert
        variant={"outlined"}
        severity={"info"}
        sx={{ m: 1, borderRadius: 3 }}
      >
        {" مجموع اعتبار پرسنل : " +
          toPriceWithComma(catering?.FinanceCatering?.TotalCredits || 0) +
          " تومان"}
      </Alert>
    </div>
  );
};

export default connect(null, sagaActions)(_TotalCredits);
