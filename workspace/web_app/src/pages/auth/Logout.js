import React from "react";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/authActions";

function Logout(props) {
    console.log("log out page")
    props.Logout();
    return ""
}

export default connect(null, authActions)(Logout)
