import React from 'react';
import TicketAppointment from "../Tickets/Appointment/TicketAppointment";

const CounselingManagementTicketTab = ({counseling}) => {
    return (
        <>
                    {counseling && <TicketAppointment counseling={counseling}/>}
        </>
    );
};

export default CounselingManagementTicketTab;
