import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {builderSelectors} from "../helper/redux/selector/builderSelector";

function KtContent({ children, contentContainerClasses }) {
  let location = useLocation();
  const ref = useRef();
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    ref.current.classList.remove("kt-grid--animateContent-finished");
    setTimeout(() => {
      if (!ref || !ref.current) {
        return;
      }
      ref.current.classList.add("kt-grid--animateContent-finished");
    }, 1);
  }, [location]);

  return (
    <div
      ref={ref}
      className={`kt-grid--animateContent kt-container ${contentContainerClasses} kt-grid__item kt-grid__item--fluid kt-grid--animateContent-finished`}
    >
      {children}
    </div>
  );
}

const mapStateToProps = (store) => ({
  contentContainerClasses: builderSelectors.getClasses(store, {
    path: "content_container",
    toString: true,
  }),
});

export default connect(mapStateToProps)(KtContent);
