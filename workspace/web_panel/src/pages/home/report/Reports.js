import React from "react";
import Notice from "../../partials/content/Notice";
import "leaflet/dist/leaflet.css";
import _reportSettings from "./reportSettings/_reportSettings";

const Reports = () => {
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">گزارشات</Notice>
            <div className="row">
                <div className="col-md-6">
                    <_reportSettings/>
                </div>
                <div className="col-md-6">
                </div>
            </div>
        </>
    );
};

export default Reports;
