import React, {useEffect} from "react";
import {connect} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

function Logout(props) {
    document.title = 'خروج';
    props.RequestLogout();
    return ""
}

export default connect(null, sagaActions)(Logout)
