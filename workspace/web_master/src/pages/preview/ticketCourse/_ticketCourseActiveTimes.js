import React, {useContext, useEffect, useState} from 'react';
import {Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography} from "@mui/material";
import BallotIcon from '@mui/icons-material/Ballot';
import {dayOfWeekEnum} from "../../../helper/enums/dayOfWeekEnum";
import {TicketCourses_getActiveTimesByTicketCourse} from "../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _ticketCourseActiveTimes = ({Course}) => {
    const error = useContext(ErrorContext);
    const [openModalTimes,setOpenModalTimes]=useState(false)
    const [CourseTimes,SetCourseTimes] = useState([]);

    useEffect(() => {
        if(!openModalTimes) return;
        TicketCourses_getActiveTimesByTicketCourse({ticketCourseId: Course.Id}).then(result => {
            SetCourseTimes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    },[openModalTimes])


    function renderModalHallTime() {
        return (<>
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalTimes} onClose={() => setOpenModalTimes(false)}>
                <DialogTitle bgcolor={"#888888"} color={"white"} sx={{p:1,mb:1,borderBottom:"solid 2px #e7333e"}}>زمان ها و سالن های قابل استفاده</DialogTitle>
                {CourseTimes.map(item=>(
                    <div key={"ph-"+item.Id}>
                        <Typography component={"span"} color={"darkgray"} sx={{pr:1}}
                                    variant={"body1"}>{"سالن "+item?.Hall?.Name+" "+ dayOfWeekEnum[item.DayOfWeek]+" از "+ item.OpeningTime.substring(0,5) +" تا "+ item.ClosingTime.substring(0,5)}</Typography>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
                        {/*{CourseTimes[gateName].map((Time,ite2)=>(*/}
                        {/*    <Chip size={"small"}  key={Time.Id} sx={{padding:0,margin:0.5,fontSize:8}} label={dayOfWeekEnum[Time["gate-timing"]["Day-of-week"]]+" "+Time["gate-timing"]["Opening-time"].substring(0,5)+" تا "+*/}
                        {/*    Time["gate-timing"]["Closing-time"].substring(0,5)+" "} />*/}
                        {/*))}*/}

                    </div>
                ))}
            </Dialog>
        </>)
    }

    // return (
    //     <div >
    //         {Object.keys(CourseTimes).map((gateName,ite)=>(
    //             <div key={"ph-"+ite}>
    //                 <Typography component={"span"} color={"darkgray"}
    //                             variant={"body1"}>{gateName}</Typography>
    //                 <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
    //                 {CourseTimes[gateName].map((Time,ite2)=>(
    //                     <Chip size={"small"}  key={Time.Id} sx={{padding:0,margin:0.5,fontSize:8}} label={dayOfWeekEnum[Time["gate-timing"]["Day-of-week"]]+" "+Time["gate-timing"]["Opening-time"].substring(0,5)+" تا "+
    //                     Time["gate-timing"]["Closing-time"].substring(0,5)+" "} />
    //                 ))}
    //
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <>
            <IconButton
                onClick={() =>{setOpenModalTimes(true)}}
                color={"info"}>
                <BallotIcon />
            </IconButton>
            {renderModalHallTime()}
        </>
    );
};

export default _ticketCourseActiveTimes;
