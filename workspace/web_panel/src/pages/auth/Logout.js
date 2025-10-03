import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {LayoutSplashScreen} from "../../helper";
import {authActions} from "../../helper/redux/actions/authActions";

class Logout extends Component {
  componentDidMount() {
    this.props.Logout();
  }

  render() {
    const { hasAuthToken } = this.props;

    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth" />;
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.token) }),
  authActions
)(Logout);
