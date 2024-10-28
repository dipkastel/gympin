import React, {useContext, useEffect, useState} from "react";
import _ListItem from "../../components/_ListItem";
import {connect, useSelector} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import {Support_getCorporateSupportCount} from "../../network/api/support.api";
import {ErrorContext} from "../../components/GympinPagesProvider";


function Management(props) {

    const error = useContext(ErrorContext);
    const [badgeCount, setBadgeCount] = useState(0);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    useEffect(() => {
        document.title = 'مدیریت';
        getSupportCount();
    }, []);

    function getSupportCount() {

        Support_getCorporateSupportCount({
            Id: corporate.Id
        }).then(result => {
            setBadgeCount(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })


    }

    function goToReports() {
        switch (corporate.Status) {
            case "DEMO":
                error.showError({message: "این بخش برای DEMO فعال نیست",});
                break;
            default:
                error.showError({message: "داده مورد نیاز برای این بخش وجود ندارد",});
                break;
        }
        // if(corporate.)
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <_ListItem  className={"col-md-6"} title="مشخصات سازمان" destination="/management/details"/>
                {/*<_ListItem title="پیام ها" destination="/management/notifs"/>*/}
                <_ListItem  className={"col-md-6"} title="گروه ها" destination="/management/categories"/>
                <_ListItem  className={"col-md-6"} title="پروفایل من" destination="/profile"/>
                <_ListItem  className={"col-md-6"} title="گزارشات" onClick={goToReports}/>
                <_ListItem  className={"col-md-6"} title="پشتیبانی" badgeCount={badgeCount} destination="/management/support"/>
                {/*<_ListItem title="گزارشات" destination="/management/report"/>*/}
                <_ListItem  className={"col-md-6"} title="تنظیمات" destination="/management/settings"/>
                {/*<_GenderEnter/>*/}
                {/*<_GenderIncome/>*/}
                {/*<_Income/>*/}
                {/*<_IncomeSport/>*/}
                {/*<_OurTraffic/>*/}
                {/*<_SportRadar/>*/}
            </div>
        </div>
    );
};
export default connect(null, authActions)(Management);
