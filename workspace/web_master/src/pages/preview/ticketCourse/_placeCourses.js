import React, {useContext, useEffect, useState} from 'react';
import _PlaceSubscribeListItem from "../ticketSubscribe/_PlaceSubscribeListItem";
import {Collapse, Grid, Typography} from "@mui/material";
import {ExpandLessTwoTone} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {TicketCourses_getByPlace} from "../../../network/api/ticketCourse.api";
import _PlaceCourseListItem from "./_PlaceCourseListItem";

const _placeCourses = ({place}) => {

        const error = useContext(ErrorContext);
        const [courses, setCourses] = useState([])
        const [isExpanded, setIsExpanded] = useState(true)
        useEffect(() => {
            TicketCourses_getByPlace({Id: place.Id}).then(result => {
                setCourses(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }, []);


        return (
            <div>
                {courses.length>0 && <>
                    <Grid container onClick={(e) => setIsExpanded(!isExpanded)} direction={"row"} alignItems={"center"}
                          justifyContent={"space-between"} bgcolor={"#c7c7c7"}
                          sx={{width: "100%", p: 1, borderBottom: "#e7333e solid 2px", mt: 1}}>

                        <Typography variant={"subtitle1"} color={"white"}>کلاس ها</Typography>
                        {isExpanded ? <ExpandLessTwoTone/> : <ExpandMoreIcon/>}
                    </Grid>
                    <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
                        {courses?.filter(t => t.Enable).map((item, number) => (
                            <_PlaceCourseListItem key={"ac" + number} course={item} number={number}/>))}
                        {courses?.filter(t => !t.Enable).map((item, number) => (
                            <_PlaceCourseListItem key={"de" + number} course={item} number={number}/>))}
                    </Collapse></>}
            </div>
        );
    }
;

export default _placeCourses;
