import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {purchasedCourse_exitRequest} from "../../../network/api/purchasedCourse.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _CourseEnterList = ({course,getCourse,setUserCanEnter}) => {
    const error = useContext(ErrorContext);
    const [entryList,setEntryList] = useState([]);
    useEffect(() => {
        if(course.EntryList)
            setEntryList(course.EntryList)
    }, [course]);

    useEffect(() => {
        setUserCanEnter(!entryList.some(entry=>entry.ExitDate==null))
    }, [entryList]);

    function submitExit(item) {
        purchasedCourse_exitRequest({id:item.Id}).then(result=>{
            getCourse();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
    <>
        {entryList.map((item,number)=>(

            <Card key={"entry"+number} elevation={3} sx={{margin:1}}>
                <CardContent>
                    <Grid
                        container
                        sx={{width:"100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography variant={"body1"}>
                            {item.EnterDate&&("ورود : "+new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            }))}
                        </Typography>
                        {item.CourseEntryStatus=="ACCEPTED"&&<Typography  variant={"body1"}>
                            {(item.ExitDate)?( "خروج : "+new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })):<><Button onClick={(event)=>submitExit(item)} variant={"contained"} color={"primary"}>خروج</Button> </>}
                        </Typography>}

                        {item.CourseEntryStatus=="REQUESTED"&&<Typography sx={{width:"100%"}} variant={"subtitle1"}>
                            درخواست ورود به مجموعه ارسال شده است.
                        </Typography>}
                    </Grid>
                </CardContent>
            </Card>
        ))}
    </>
    );
};

export default _CourseEnterList;
