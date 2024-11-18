import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip} from "@mui/material";
import {
    TicketCourses_addSport, TicketCourses_deleteSport,
    TicketCourses_getTicketCoursesSports
} from "../../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {placeSport_getSportsByPlace} from "../../../../network/api/placeSport.api";
import {useSelector} from "react-redux";

const _CourseSport = ({ticketCourse}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [itemToProgress,SetItemToProgress] = useState(null);
    const [ticketCourseSports, SetTicketCourseSports] = useState([])
    const [sportsPlace, SetSportsPlace] = useState([])

    useEffect(() => {
        if(ticketCourse.Id)
            getPlaceSports();
    }, [ticketCourse]);

    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: place.Id}).then(data => {
            SetSportsPlace(data.data.Data);
            getTicketCourseSports();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getTicketCourseSports() {
        TicketCourses_getTicketCoursesSports({ticketId: ticketCourse.Id}).then(data => {
            SetTicketCourseSports(data.data.Data);
            SetItemToProgress(null);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addPlaceSport(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);
        TicketCourses_addSport({TicketCourse: {Id: ticketCourse.Id}, PlaceSport: [{Id:item.Id}]})
            .then(data => {
                getTicketCourseSports()
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
                getTicketCourseSports()
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
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"ورزش های این بلیط"}
                />
                <CardContent>

                    <div className={"container"}>
                        <div className={"row"}>
                            {ticketCourseSports.map(sport=>sport.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={sport.sport.Name}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>deletePlaceSport(e,sport)} />
                            ))}
                            {sportsPlace.filter(sp=>!ticketCourseSports.map(tss=>tss.Id).includes(sp.Id)).map(sport=>sport.Id==itemToProgress?(
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

export default _CourseSport;
