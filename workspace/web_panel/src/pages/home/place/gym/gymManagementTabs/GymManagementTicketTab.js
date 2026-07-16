import React from 'react';
import TicketSubscribe from "../Tickets/TicketSubscribe/TicketSubscribe";

const GymManagementTicketTab = ({place}) => {
    return (
        <>
            {/*{counseling && <div className="row">*/}
            {/*    <div className="col-md-6">*/}
            {/*        {counseling && <TicketAppointment counseling={counseling}/>}*/}
                    {place && <TicketSubscribe place={place}/>}
            {/*        {counseling && <TicketFood counseling={counseling}/>}*/}
            {/*        {counseling && <TicketProduct counseling={counseling}/>}*/}
            {/*        {counseling && <TicketService counseling={counseling}/>}*/}
            {/*    </div>*/}
            {/*    <div className="col-md-6">*/}
            {/*        {counseling && <TicketCourse counseling={counseling}/>}*/}
            {/*        {counseling && <TicketWorkout counseling={counseling}/>}*/}
            {/*        {counseling && <TicketDiet counseling={counseling}/>}*/}
            {/*        {counseling && <TicketReserve counseling={counseling}/>}*/}
            {/*    </div>*/}
            {/*</div>}*/}
        </>
    );
};

export default GymManagementTicketTab;
