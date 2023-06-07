import React from "react";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";


function Logout(props) {
    props.RequestLogout();
    return ""
}

export default connect(null, sagaActions)(Logout)
