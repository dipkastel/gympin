import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import Notice from "../../../../partials/content/Notice";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {serial_getBySerial} from "../../../../../network/api/serial.api";
import {purchasedCourse_getById} from "../../../../../network/api/purchasedCourses.api";
import Notes from "../../../../partials/content/notes/Notes";
import _Transactions from "../../subscribes/baseData/transactions/_Transaction";
import _CourseInfo from "./info/_CourseInfo";
import _CourseEntryList from "./entry/_CourseEntryList";
import _CourseStatus from "./info/_CourseStatus";
import _CourseSerial from "./info/_CourseSerial";
import _CourseActions from "./action/_CourseActions";

const CourseDataManagement = () => {
    const error = useContext(ErrorContext);
    const {courseId} = useParams();
    const [course, setCourse] = useState({})

    const [transactions, SetTransactions] = useState(null);

    useEffect(() => {
        if (course.Serial)
            getTransactionsBySerial()
    }, [course]);

    function getTransactionsBySerial() {
        serial_getBySerial({serial: course.Serial.Serial}).then((result) => {
            SetTransactions(result.data.Data);
            console.log("result", result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    useEffect(() => {
        getCourse();
    }, [courseId]);

    function getCourse() {
        purchasedCourse_getById({id: courseId}).then(result => {
            setCourse(result.data.Data)
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
                <p>جزئیات کلاس کاربر</p>
            </Notice>

            <div className="row">
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-8">
                            {course && <_CourseInfo course={course}/>}
                            {course && <_CourseEntryList course={course} updatePage={getCourse}/>}
                        </div>
                        <div className="col-md-4">
                            {course && <_CourseStatus course={course} updatePage={getCourse}/>}
                            {course && <_CourseSerial course={course}/>}
                            {course && transactions && <_CourseActions course={course} transactions={transactions}/>}

                        </div>
                        <div className="col-md-6">
                            {course &&transactions&& <_Transactions course={course} transactions={transactions} updatePage={getCourse}/>}
                        </div>

                    </div>
                </div>
                <div className="col-md-2">
                    {course && <Notes source={{Purchased: {Id: course.Id}}}/>}
                </div>
            </div>
        </>
    );
};

export default CourseDataManagement;
