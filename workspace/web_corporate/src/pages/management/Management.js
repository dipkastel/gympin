import React from "react";
import _ListItem from "../../components/_ListItem";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";


function Management(props) {
    return (
        <>
            {/*<_OurTraffic/>*/}
            {/*<_SportRadar/>*/}
            <_ListItem title="مشخصات سازمان" destination="/management/details"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
        </>
    );
};
export default connect(null,authActions)(Management);
