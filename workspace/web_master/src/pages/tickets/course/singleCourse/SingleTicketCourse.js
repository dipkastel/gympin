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
import {getWizardComplete} from "../../../../helper/pocket";

const SingleTicketCourse = ({subId,introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const {courseId} = useParams()
    const [ticketCourse, setTicketCourse] = useState([]);
    const introMode=!getWizardComplete()
    useEffect(() => {
        document.title = 'مدیریت کلاس';
        getCourseData();
    }, [subId,courseId]);
    function getCourseData(){
        TicketCourses_getById({id:introMode?subId:courseId}).then(result=>{
            setTicketCourse(result.data.Data);
            try{introCanGoNext(result.data.Data.Enable);}catch (e) {}

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
            {!introMode&&<_CourseActive ticketCourse={ticketCourse} getCourseData={getCourseData}/>}
            <_CourseBaseData ticketCourse={ticketCourse} getCourseData={getCourseData}/>
            {/*<_CourseActiveTimes ticketCourse={ticketCourse} />*/}
            <_CourseCoaches ticketCourse={ticketCourse} />
            <_CourseSports ticketCourse={ticketCourse} />
            {introMode&&<_CourseActive ticketCourse={ticketCourse} getCourseData={getCourseData}/>}
            {!introMode&&<_CourseDelete ticketCourse={ticketCourse} getCourseData={getCourseData}/>}
        </>

    );
};

export default SingleTicketCourse;
