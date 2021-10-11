import React from "react";
import LanguageSelector from "../../../app/partials/layout/LanguageSelector";

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">
          <LanguageSelector iconType="" />
      </div>
    );
  }
}
