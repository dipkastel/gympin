import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip} from "@mui/material";
import {
    TicketCourses_addSport, TicketCourses_deleteSport
} from "../../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";

const _CourseCoaches = ({ticketCourse}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [itemToProgress,SetItemToProgress] = useState(null);
    const [ticketCourseCoaches, SetTicketCourseCoaches] = useState([])
    const [sportsPlace, SetCoachesPlace] = useState([])

    useEffect(() => {
        if(ticketCourse.Id)
            getPlaceCoaches();
    }, [ticketCourse]);

    function getPlaceCoaches() {
        // placeSport_getCoachesByPlace({Id: place.Id}).then(data => {
        //     SetCoachesPlace(data.data.Data);
        //     getTicketCourseCoaches();
        // }).catch(e => {
        //     try {
        //         error.showError({message: e.response.data.Message,});
        //     } catch (f) {
        //         error.showError({message: "خطا نا مشخص",});
        //     }
        // });
    }
    function getTicketCourseCoaches() {
        // TicketCourses_getTicketCoursesCoaches({ticketId: ticketCourse.Id}).then(data => {
        //     SetTicketCourseCoaches(data.data.Data);
        //     SetItemToProgress(null);
        // }).catch(e => {
        //     try {
        //         error.showError({message: e.response.data.Message,});
        //     } catch (f) {
        //         error.showError({message: "خطا نا مشخص",});
        //     }
        // });
    }

    function addPlaceSport(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);
        console.log({TicketCourse: {Id: ticketCourse.Id}, PlaceSport: {Id:item.Id}})
        TicketCourses_addSport({TicketCourse: {Id: ticketCourse.Id}, PlaceSport: [{Id:item.Id}]})
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
    function deletePlaceSport(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);

        TicketCourses_deleteSport({TicketCourse:{Id: ticketCourse.Id},PlaceSport:[{Id:item.Id}]})
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
                            {ticketCourseCoaches.map(sport=>sport.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={sport.sport.Name}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>deletePlaceSport(e,sport)} />
                            ))}
                            {sportsPlace.filter(sp=>!ticketCourseCoaches.map(tss=>tss.Id).includes(sp.Id)).map(sport=>sport.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={sport.sport.Name} key={"option"+sport.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceSport(e,sport)}} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default _CourseCoaches;
