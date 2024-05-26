import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import Hall from "../../halls/singleHall/Hall";
import SingleSubscribe from "../../purchased/subscribe/single/SingleSubscribe";
import SingleTicketSubscribe from "../../tickets/subscribe/singleSubscribe/SingleTicketSubscribe";
import SingleTicketCourse from "../../tickets/course/singleCourse/SingleTicketCourse";

const WPageCourses = ({onNext,ParamId}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    return (
        <div>
            <SingleTicketCourse subId={ParamId} introCanGoNext={setIntroCanGoNext}/>
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} fullWidth disabled={!introCanGoNext} variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageCourses;
