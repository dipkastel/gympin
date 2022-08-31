import React, {Component} from "react";
import * as auth from "../../helper/ducks/auth.duck";
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom';

function Logout(props) {
    console.log("log out page")

    props.logout();
    return ""
    // return <Navigate to="/auth" />;
}

export default connect(null, auth.actions)(Logout)
