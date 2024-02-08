import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import getAccessOf from "../../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../../../components/AccessDenied";
import {TicketCourses_getById} from "../../../../network/api/ticketCourse.api";
import _CourseActive from "./_CourseActive";
import _CourseBaseData from "./_CourseBaseData";
import _CourseActiveTimes from "./_CourseActiveTimes";
import _CourseSports from "./_CourseSports";
import _CourseDelete from "./_CourseDelete";
import _CourseCoaches from "./_CourseCoaches";

const SingleTicketCourse = () => {
    const error = useContext(ErrorContext);
    const {courseId} = useParams()
    const [ticketCourse, setTicketCourse] = useState([]);
    useEffect(() => {
        getCourseData();
    }, []);
    function getCourseData(){
        TicketCourses_getById({id:courseId}).then(result=>{
            console.log(result.data.Data)
            setTicketCourse(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementTicketCourse))
        return <AccessDenied/>;

    return (
        <>
            <_CourseActive ticketCourse={ticketCourse} getCourseData={getCourseData}/>
            <_CourseBaseData ticketCourse={ticketCourse} getCourseData={getCourseData}/>
            <_CourseActiveTimes ticketCourse={ticketCourse} />
            <_CourseCoaches ticketCourse={ticketCourse} />
            <_CourseSports ticketCourse={ticketCourse} />
            <_CourseDelete ticketCourse={ticketCourse} getCourseData={getCourseData}/>
        </>

    );
};

export default SingleTicketCourse;
