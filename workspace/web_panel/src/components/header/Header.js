import React from "react";
import {connect} from "react-redux";
import objectPath from "object-path";
import Topbar from "./Topbar";
import HMenu from "./HMenu/HMenu";
import AnimateLoading from "../../pages/partials/layout/AnimateLoading";
import KTHeader from "../../assets/js/header";
import {builderSelectors} from "../../helper/redux/selector/builderSelector";

class Header extends React.Component {
  headerCommonRef = React.createRef();

  componentDidMount() {
    let options = {};
    if (
      this.headerCommonRef.current.getAttribute("data-ktheader-minimize") ===
      "1"
    ) {
      options["minimize.desktop.on"] = "kt-header--minimize";
      options["offset.desktop"] = 130;
    }

    new KTHeader(this.headerCommonRef.current, options);
  }

  render() {
    const { menuHeaderDisplay, headerAttributes, headerClasses } = this.props;
    return (
      <div
        className={`kt-header kt-grid__item ${headerClasses}`}
        id="kt_header"
        ref={this.headerCommonRef}
        {...headerAttributes}
      >
        <AnimateLoading />
        {menuHeaderDisplay && <HMenu />}
        {!menuHeaderDisplay && <div />}
        <Topbar />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  headerClasses: builderSelectors.getClasses(store, {
    path: "header",
    toString: true,
  }),
  headerAttributes: builderSelectors.getAttributes(store, { path: "header" }),
  menuHeaderDisplay: objectPath.get(
    store.builder.layoutConfig,
    "header.menu.self.display"
  ),
  fluid:
    objectPath.get(store.builder.layoutConfig, "header.self.width") === "fluid",
});

export default connect(mapStateToProps)(Header);
