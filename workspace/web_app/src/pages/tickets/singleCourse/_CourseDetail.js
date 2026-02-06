import React, {useContext, useEffect, useState} from 'react';
import {Alert, Card, CardContent, CardHeader, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ticketCourses_getActiveTimesByTicketCourse} from "../../../network/api/ticketCourses.api";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const _CourseDetail = ({course}) => {
    const error = useContext(ErrorContext);
    const [timing, setTiming] = useState(null)
    const [openTiming, setOpenTiming] = useState(false)
    const  [openDescription,SetOpenDescription]  = useState(false);
    useEffect(() => {
        getTiming(course);
    }, [course]);

    function getTiming(course) {
        ticketCourses_getActiveTimesByTicketCourse({ticketCourseId:course.TicketCourse.Id}).then(result=>{
            setTiming(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div>
            {course && <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={course.Name}/>
                <CardContent sx={{paddingY: 0}}>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Grid>
                            <Typography sx={{paddingY: 0.5}}
                                        variant={"subtitle1"}>{"مجموعه " + course?.TicketCourse?.Place?.Name}</Typography>
                        </Grid>
                        <IconButton hidden={(!course.Description)} aria-label="openDescription" color="info" onClick={()=>SetOpenDescription(!openDescription)}>
                            <HelpOutlineIcon/>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Grid>
                            <Typography sx={{paddingY: 0.5}}
                                        variant={"subtitle1"}>{toPriceWithComma(course.Price) + " تومان برای " + course.EntryTotalCount + " ورود"}</Typography>
                        </Grid>
                        <IconButton onClick={() => setOpenTiming(!openTiming)} color={"info"}>
                            <HistoryToggleOffIcon/>
                        </IconButton>
                    </Grid>
                    <Typography sx={{paddingY: 0.5}} variant={"subtitle1"}>
                        {"شروع کلاس " + new Date(course.StartDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</Typography>
                    <Typography sx={{paddingY: 0.5}} variant={"subtitle1"}>
                        {"پایان کلاس " + new Date(course.EndDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</Typography>
                    <Collapse in={openDescription} timeout="auto" sx={{my:1}} unmountOnExit>
                        <Alert severity="info">
                            {course.Description}
                        </Alert>
                    </Collapse>
                    <Collapse in={openTiming} timeout="auto" unmountOnExit>
                        <Divider variant="inset" sx={{mx: 0, my: 1}} component="div"/>
                        <Grid
                            container
                            sx={{width: "100%"}}
                            direction="row"
                            justifyContent={"right"}
                            alignItems={"center"}
                        >
                            <Typography width={"100%"} sx={{paddingY: 0.5}} color={"gray"}
                                        variant={"subtitle1"}>{"قابل استفاده در :"}</Typography>
                            {timing && timing.map(item => (
                                <Typography width={"100%"} key={item.Id} sx={{pr: 1, m: 1}} color={"gray"}
                                            variant={"subtitle2"}>
                                    {item.Hall.Name + " " + " " + dayOfWeekEnum[item.DayOfWeek] + " از " +
                                    item?.OpeningTime.substring(0, 5) + " تا " +
                                    item?.ClosingTime.substring(0, 5) + " "}
                                </Typography>
                            ))}
                        </Grid>
                    </Collapse>

                </CardContent>

            </Card>}

        </div>
    );
};

export default _CourseDetail;
