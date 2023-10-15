import React from "react";
import _ListItem from "../../components/_ListItem";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import _OurTraffic from "../report/_OurTraffic";
import _SportRadar from "../report/_SportRadar";
import _GenderEnter from "../report/_GenderEnter";
import _GenderIncome from "../report/_GenderIncome";
import _Income from "../report/_Income";
import _IncomeSport from "../report/_IncomeSport";


function Management(props) {
    return (
        <>
            <_ListItem title="مشخصات سازمان" destination="/management/details"/>
            <_ListItem title="گروه ها" destination="/management/categories"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
            {/*<_GenderEnter/>*/}
            {/*<_GenderIncome/>*/}
            {/*<_Income/>*/}
            {/*<_IncomeSport/>*/}
            {/*<_OurTraffic/>*/}
            {/*<_SportRadar/>*/}
        </>
    );
};
export default connect(null,authActions)(Management);
