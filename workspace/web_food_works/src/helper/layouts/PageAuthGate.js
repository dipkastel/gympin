import React from "react";
import { useSelector } from "react-redux";

const PageAuthGate = (props) => {
  const catering = useSelector(({ catering }) => catering?.catering);
  //check demo
  //check wizard
  return (
    <>
      {props.children}
    </>
  );
};

export default PageAuthGate;
