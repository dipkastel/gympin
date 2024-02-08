import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Switch} from "@mui/material";
import {Form} from "react-bootstrap";
import {TicketCourses_ChangeTicketCoursesStatus} from "../../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _CourseActive = ({ticketCourse, getCourseData}) => {
    const error = useContext(ErrorContext);
    const [inCourse, setInCourse] = useState(ticketCourse)

    useEffect(() => {
        setInCourse(ticketCourse);
    }, [ticketCourse]);

    function updateStatus(e,course) {
        e.preventDefault();
        TicketCourses_ChangeTicketCoursesStatus(course).then(result => {
            getCourseData();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Form onSubmit={(e) => updateStatus(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        title={inCourse.Enable ? "غیر فعالسازی" : "فعالسازی"}
                        action={(
                            <Switch
                                checked={!!inCourse.Enable}
                                onChange={(e) => updateStatus(e,{...inCourse, Enable: e.target.checked})}
                            />
                        )}
                    />
                </Card>
            </Form>
        </>
    );
};

export default _CourseActive;
