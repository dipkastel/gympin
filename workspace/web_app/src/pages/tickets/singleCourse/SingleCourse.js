import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {purchasedCourse_getById} from "../../../network/api/purchasedCourse.api";
import _CourseDetail from "./_CourseDetail";
import _UsageProgress from "../commonPartials/_UsageProgress";
import _QRcode from "../commonPartials/_QRcode";
import _CoursePhoneLessEnter from "./_CoursePhoneLessEnter";
import _CourseEnterList from "./_CourseEnterList";

const SingleCourse = () => {
    const {courseKey} = useParams();
    const [course, setCourse] = useState(null)
    const [userCanEnter, setUserCanEnter] = useState(null)
    const error = useContext(ErrorContext);

    useEffect(() => {
        document.title = 'بلیط کلاس';
        getCourse();
    }, []);

    function getCourse() {
        purchasedCourse_getById({id: courseKey}).then(result => {
            setCourse(result.data.Data);
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
            {course && <_CourseDetail course={course}/>}
            {course && <_UsageProgress setUserCanEnter={setUserCanEnter} ticket={course}/>}
            {course &&
            (course.Status == "ACTIVE"||course.Status == "READY_TO_ACTIVE")&&<_QRcode ticket={course} userCanEnter={userCanEnter} type={"COURSE"}/>}
            {course && userCanEnter &&
            course.Status == "ACTIVE"&&<_CoursePhoneLessEnter course={course} getCourse={getCourse}/>}
            {course && <_CourseEnterList course={course} getCourse={getCourse} setUserCanEnter={setUserCanEnter}/>}
        </>
    );
};

export default SingleCourse;
