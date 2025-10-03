import React from "react";
import {connect} from "react-redux";
import objectPath from "object-path";
import {builderSelectors} from "../../helper/redux/selector/builderSelector";

class Footer extends React.Component {
  render() {
    const today = new Date().getFullYear();
    return (
      <div
        className={`kt-footer ${this.props.footerClasses} kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop`}
        id="kt_footer"
      >
        <div className={`kt-container ${this.props.footerContainerClasses}`}>
          <div className="kt-footer__copyright">
            {today.toString()}&nbsp;&copy;&nbsp;
            <a
              href="http://gympin.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="kt-link"
            >
              Gympin
            </a>
          </div>
          <div className="kt-footer__menu">
            <a
              href="http://gympin.ir/about"
              target="_blank"
              rel="noopener noreferrer"
              className="kt-footer__menu-link kt-link"
            >
              About
            </a>
            <a
              href="http://gympin.ir/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="kt-footer__menu-link kt-link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  fluid:
    objectPath.get(store.builder.layoutConfig, "footer.self.width") === "fluid",
  footerClasses: builderSelectors.getClasses(store, {
    path: "footer",
    toString: true,
  }),
  footerContainerClasses: builderSelectors.getClasses(store, {
    path: "footer_container",
    toString: true,
  }),
});

export default connect(mapStateToProps)(Footer);
