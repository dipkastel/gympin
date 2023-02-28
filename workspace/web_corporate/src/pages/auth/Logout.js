import React from "react";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";


function Logout(props) {
    props.Logout();
    return ""
}

export default connect(null, authActions)(Logout)
