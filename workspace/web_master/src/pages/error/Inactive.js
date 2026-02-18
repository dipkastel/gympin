import React, { useEffect } from "react";
import { sagaActions } from "../../helper/redux/actions/SagaActions";
import { useSelector } from "react-redux";
import store from "../../helper/redux/store";

const Inactive = () => {
  const place = useSelector(({ place }) => place.place);
  useEffect(() => {
    store.dispatch(sagaActions.RequestPlace(place));
  }, []);

  return (
    <div>
      این مجموعه غیر فعال می باشد
      {/*TODO set a button for check can go to home*/}
    </div>
  );
};

export default Inactive;
