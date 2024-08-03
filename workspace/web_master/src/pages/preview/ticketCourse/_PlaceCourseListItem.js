import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, ListItem, ListItemButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {genders} from "../../../helper/enums/genders";
import _ticketInfo from "../partial/_ticketInfo";
import _ticketCourseActiveTimes from "./_ticketCourseActiveTimes";
import _ticketCoach from "../info/_ticketCoach";


const _PlaceCourseListItem = ({course, number, addToBasket}) => {
    console.log(course)
    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton disabled={!course.Enable}>
                    <Card sx={{width: "100%"}} elevation={6}>
                        <CardHeader
                            component={"a"}
                            sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                            title={course.Name}
                            subheader={<>

                            {course.StartDate && <Typography component={"span"} variant={"body1"}>
                                {"شروع کلاس : " + new Date(course.StartDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) }
                                <br/>
                            </Typography>}
                            {course.EndDate && <Typography component={"span"} variant={"body1"}>
                                {"پایان کلاس : " + new Date(course.EndDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) }
                                <br/>
                            </Typography>}
                            {course.AgeLimit && <Typography component={"span"} variant={"body1"}>
                                {"محدوده سنی : " + course.AgeLimit }
                                <br/>
                            </Typography>}
                            {course.CourseLevel && <Typography component={"span"} variant={"body1"}>
                                {"سطح کلاس : " + course.CourseLevel }
                                <br/>
                            </Typography>}

                            </>}
                            action={
                                <>
                                    {course?.Coaches?.length>0 && <_ticketCoach ticket={course}/>}
                                    {course.Description && <_ticketInfo ticket={course}/>}
                                    {course && <_ticketCourseActiveTimes Course={course}/>}

                                </>
                            }
                        />
                        <CardContent sx={{direction: "rtl", pt: 0}}>
                            <Grid sx={{mb: 1}} container justifyContent={"space-between"} direction={"row"}
                                  alignItems={"center"}>
                                <Grid item>
                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"start"}>
                                        <Grid item sx={{m: 0, p: 0}}>
                                            <Typography component={"span"}
                                                        color={"darkgreen"}
                                                        variant={"h5"}>{course.EntryTotalCount}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" جلسه"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt: "-8px", p: 0}}>
                                            <Typography component={"span"}
                                                        variant={"body1"}>{genders[course.Gender]}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"end"}>
                                        <Grid item sx={{m: 0, p: 0}}>
                                            <Typography component={"span"}
                                                        color={"darkgreen"}
                                                        variant={"h5"}>{toPriceWithComma(course.Price)}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" تومان"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt: "-8px", p: 0}}>
                                            {(course.Price < course.ValuePrice) && <>
                                                <Typography component={"span"}
                                                            sx={{textAlign: "start", textDecoration: "line-through"}}
                                                            color={"lightgray"}
                                                            variant={"h6"}> {toPriceWithComma(course.ValuePrice)}</Typography>
                                                <Typography component={"span"} color={"lightgray"}
                                                            variant={"body1"}> {" تومان"} </Typography>
                                            </>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button variant={"contained"} color={"primary"} onClick={() => addToBasket(course)}
                                    sx={{textAlign: "center"}} fullWidth>
                                <Typography variant={"h6"}>{" افزودن به سبد خرید"}</Typography>
                            </Button>
                        </CardContent>
                    </Card>
                </ListItemButton>
            </ListItem>

        </div>
    );
};

export default _PlaceCourseListItem;
