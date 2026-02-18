import React from "react";
import { useSelector } from "react-redux";

const PageAuthGate = (props) => {
  const place = useSelector(({ place }) => place?.place);
  //check demo
  //check wizard
  return (
    <>
      {/*{place?.Status === "PREREGISTER" && <WizardBody />}*/}
      {!(place?.Status === "PREREGISTER") && props.children}
    </>
  );
};

export default PageAuthGate;
