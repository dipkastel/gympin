import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import Hall from "../../halls/singleHall/Hall";
import SingleSubscribe from "../../purchased/subscribe/single/SingleSubscribe";
import SingleTicketSubscribe from "../../tickets/subscribe/singleSubscribe/SingleTicketSubscribe";

const WPageSubscribes = ({onNext,ParamId}) => {
    const [introCanGoNext,setIntroCanGoNext] = useState(false);

    return (
        <div>
            <SingleTicketSubscribe subId={ParamId} introCanGoNext={setIntroCanGoNext} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageSubscribes;
