import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip} from "@mui/material";
import {
    TicketCourses_addCoach, TicketCourses_deleteCoach, TicketCourses_getCoaches
} from "../../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {placePersonnel_ByPlace, placePersonnel_getAccess} from "../../../../network/api/placePersonnel.api";

const _CourseCoaches = ({ticketCourse}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [itemToProgress,SetItemToProgress] = useState(null);
    const [ticketCourseCoaches, SetTicketCourseCoaches] = useState([])
    const [placeCoaches, SetPlaceCoaches] = useState([])

    useEffect(() => {
        if(ticketCourse.Id)
            getPlaceCoaches();
    }, [ticketCourse]);

    function getPlaceCoaches() {
        placePersonnel_ByPlace({Id: place.Id}).then(data => {
             SetPlaceCoaches(data.data.Data?.filter(pp=>pp?.UserRole?.includes("PLACE_COACH")));
            getTicketCourseCoaches();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getTicketCourseCoaches() {
        TicketCourses_getCoaches({ticketId: ticketCourse.Id}).then(data => {
            SetTicketCourseCoaches(data.data.Data);
            SetItemToProgress(null);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addPlaceCoach(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);
        TicketCourses_addCoach({TicketCourse: {Id: ticketCourse.Id}, PlaceCoach: {Id:item.User.Id}})
            .then(data => {
                getTicketCourseCoaches()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function deletePlaceCoach(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);

        TicketCourses_deleteCoach({TicketCourse:{Id: ticketCourse.Id},PlaceCoach:{Id:item.Id}})
            .then(data => {
                getTicketCourseCoaches()
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مربیان این بلیط"}
                />
                <CardContent>

                    <div className={"container"}>
                        <div className={"row"}>
                            {ticketCourseCoaches.map(coach=>coach.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={coach.FullName||coach.Username||"ثبت نشده"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>deletePlaceCoach(e,coach)} />
                            ))}
                            {placeCoaches.filter(sp=>!ticketCourseCoaches.map(uc=>uc.Id).includes(sp.User.Id)).map(coach=>coach.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={coach.User.FullName||coach.User.Username||"ثبت نشده"} key={"option"+coach.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceCoach(e,coach)}} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default _CourseCoaches;
