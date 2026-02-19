import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Notice from "../../../../partials/content/Notice";
import {TicketCourses_getById, TicketCourses_update} from "../../../../../network/api/ticketCourses.api";
import {Button} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _ChangeTicketCourseStatus from "./changeStatus/_ChangeTicketCourseStatus";
import TicketCourseBase from "./Base/TicketCourseBase";
import TicketCourseActivityTimes from "./TicketActivityTimes/TicketCourseActivityTimes";
import TicketCourseSport from "./ticketCourseSports/TicketCourseSport";
import TicketCourseCoaches from "./ticketCourseCoaches/TicketCourseCoaches";

const TicketCourseDataManagement = () => {
    const error = useContext(ErrorContext);
    let {ticketCourseId} = useParams();
    let history = useHistory();
    const [ticketCourse,setTicketCourse] = useState(null);
    useEffect(() => {
        getTicketCourse();
    }, []);

    function getTicketCourse() {
        TicketCourses_getById({id: ticketCourseId}).then((result) => {
            setTicketCourse(result.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function updateTicketCourse(ticketCourse) {
        TicketCourses_update(ticketCourse).then(data => {
            setTicketCourse(data.data.Data)
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {ticketCourse && (
                    <>
                        <p>مدیریت مشخصات کلاس {ticketCourse.Name}</p>
                        <Button variant={"contained"} color={"warning"}
                                href={"/place/data/"+ticketCourse.Place.Id}>بازگشت</Button>
                    </>

                )}
            </Notice>
            {ticketCourse && <div className="row">
                <div className="col-md-6">
                    {ticketCourse&&<_ChangeTicketCourseStatus ticketCourse={ticketCourse} updateTicketCourse={updateTicketCourse}/>}
                    {ticketCourse&&<TicketCourseBase ticketCourse={ticketCourse} updateTicketCourse={updateTicketCourse}/>}
                </div>
                <div className="col-md-6">
                    {ticketCourse&&<TicketCourseActivityTimes ticketCourse={ticketCourse} />}
                    {ticketCourse&&<TicketCourseCoaches ticketCourse={ticketCourse} />}
                    {ticketCourse&&<TicketCourseSport ticketCourse={ticketCourse} />}
            {/*        {ticketCourse&&<_TicketCourseHistoryChart ticketCourse={ticketCourse} />}*/}
                </div>
            </div>}
        </>
    );
};

export default TicketCourseDataManagement;
