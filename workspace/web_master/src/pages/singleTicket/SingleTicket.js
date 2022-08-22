import React from 'react';
import {Grid} from "@mui/material";
import _TicketAddForm from "./_TicketAddForm";
import _TicketMessages from "./_TicketMessages";
import _TicketClose from "./_TicketClose";

const SingleTicket = () => {
    return (
        <Grid height={"100%"}>
            <_TicketClose/>
            <_TicketAddForm/>
            <_TicketMessages/>
        </Grid>
    );
};

export default SingleTicket;
