import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {toPriceWithComma} from "../../../../../../helper";

const _CourseInfo = ({course}) => {
    return (
        <Portlet>
            <PortletHeader title="اطلاعات اولیه" />

            <PortletBody>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"خریدار : "}</Typography></div>
                    <div className={"col-8"}>
                        {course?.User&&<Typography variant={"h6"} component="p">{`${course?.User?.FullName} (${course?.User?.Username})`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"فروشنده : "}</Typography></div>
                    <div className={"col-8"}>
                        {course?.TicketCourse&&<Typography variant={"h6"} component="p">{`${course?.TicketCourse?.Place?.Name}`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"نام عضویت : "}</Typography></div>
                    <div className={"col-8"}>
                        <Typography variant={"h6"} component="p">{course?.Name}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود های مجاز : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course.ClassCapacity}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"هدف یا مدرک انتهایی کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course.TargetOfCourse}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"سطح کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course.CourseLevel}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"محدوده سنی کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course.AgeLimit}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"ظرفیت کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course.EntryTotalCount}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود ها تا کنون : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course?.EntryList?course?.EntryList?.length:0}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ شروع کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(course?.StartDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ اتمام کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(course?.EndDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"قیمت کلاس : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{toPriceWithComma(course?.Price)}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"توضیح : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{course?.Description}</Typography></div>
                </div>
            </PortletBody>
        </Portlet>
    );
};

export default _CourseInfo;
