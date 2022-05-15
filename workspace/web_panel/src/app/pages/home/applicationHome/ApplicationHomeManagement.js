import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import "../applicationHome/ApplicationHomeManagement.css"
import ListApplicationHomeCollections from "./main/ListApplicationHomeCollections";


class ApplicationHomeManagement extends Component {


    render() {
        return (
            <>
                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        صفحه جیم پین در اپلیکیشن موبایل از طریق این قسمت چیدمان می شود
                    </p>
                    <p>
                        میتوان از ویجت های قراردادی برای ساخت صفحه اصلی اپلیکیشن موبایل استفاده کرد که در این قسمت آنها
                        را مدیریت میکنیم
                    </p>
                </Notice>


                <Portlet>

                    <PortletHeader
                        title="صفحاتی که قبلا ساخته شده اند"
                        toolbar={
                            <PortletHeaderToolbar>
                                <button
                                    type="button"
                                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted">
                                    <AddIcon/>
                                </button>
                            </PortletHeaderToolbar>
                        }
                    />

                    <div className="row">
                        <div className="col-xl-12">
                            <ListApplicationHomeCollections/>
                        </div>
                    </div>

                </Portlet>

            </>
        )
    }
}

export default ApplicationHomeManagement;
