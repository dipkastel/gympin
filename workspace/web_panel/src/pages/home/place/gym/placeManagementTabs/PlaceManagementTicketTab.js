import React from 'react';
import TicketSubscribe from "../Tickets/TicketSubscribe/TicketSubscribe";

const PlaceManagementTicketTab = ({place}) => {
    return (
        <>
            {/*{place && <div className="row">*/}
            {/*    <div className="col-md-6">*/}
            {/*        {place && <TicketSubscribe place={place}/>}*/}
                    {place && <TicketSubscribe place={place}/>}
            {/*        {place && <TicketFood place={place}/>}*/}
            {/*        {place && <TicketProduct place={place}/>}*/}
            {/*        {place && <TicketService place={place}/>}*/}
            {/*    </div>*/}
            {/*    <div className="col-md-6">*/}
            {/*        {place && <TicketCourse place={place}/>}*/}
            {/*        {place && <TicketWorkout place={place}/>}*/}
            {/*        {place && <TicketDiet place={place}/>}*/}
            {/*        {place && <TicketReserve place={place}/>}*/}
            {/*    </div>*/}
            {/*</div>}*/}
        </>
    );
};

export default PlaceManagementTicketTab;
