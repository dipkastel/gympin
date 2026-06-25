import React from 'react';
import {Done, DoneAll} from "@mui/icons-material";

const _DeliverySupportTicket = ({message, reloadList}) => {

    console.log(message)
    return (
        <>
            {message.Read ? <DoneAll sx={{mx: 1}}/> : <Done sx={{mx: 1}}/>}
        </>
    );
};

export default _DeliverySupportTicket;
