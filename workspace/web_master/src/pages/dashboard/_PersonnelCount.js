import React, { useContext, useEffect, useState } from "react";
import AnalyticsBox from "../../components/AnalyticsBox";
import { ErrorContext } from "../../components/GympinPagesProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const _PersonnelCount = () => {
  const error = useContext(ErrorContext);
  const navigate = useNavigate();
  const place = useSelector(({ place }) => place?.place);
  const [personnel, setPersonnel] = useState(null);

  useEffect(() => {
    getPersonnel();
  }, [place]);

  function getPersonnel() {
    if (!place) return;
    // placePersonnel_query({
    //   queryType: "FILTER",
    //   PlaceId: place?.Id,
    //   paging: { Page: 0, Size: 1, Desc: true },
    // })
    //   .then((result) => {
    //     setPersonnel(result.data.Data);
    //   })
    //   .catch((e) => {
    //     try {
    //       error.showError({ message: e.response.data.Message });
    //     } catch (f) {
    //       error.showError({ message: "خطا نا مشخص" });
    //     }
    //   });
  }

  return (
    <div>
      <AnalyticsBox
        icon={<img alt="icon" src="/assets/images/icons/ic-glass-users.svg" />}
        title="تعداد کارمندان"
        color={"quinary"}
        total={
          personnel ? (
            personnel?.totalElements
          ) : (
            <>
              <CircularProgress size={20} />
            </>
          )
        }
        onClick={() => navigate("/personnel/list")}
      />
    </div>
  );
};

export default _PersonnelCount;
