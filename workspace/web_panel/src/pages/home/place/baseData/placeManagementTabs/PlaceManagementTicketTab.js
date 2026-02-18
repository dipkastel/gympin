import React from 'react';
import TicketSubscribe from "../Tickets/TicketSubscribe/TicketSubscribe";
import TicketCourse from "../Tickets/TicketCourse/TicketCourse";
import TicketDiet from "../Tickets/TicketDiet/TicketDiet";
import TicketFood from "../Tickets/TicketFood/TicketFood";
import TicketProduct from "../Tickets/TicketProduct/TicketProduct";
import TicketReserve from "../Tickets/TicketReserve/TicketReserve";
import TicketService from "../Tickets/TicketService/TicketService";
import TicketWorkout from "../Tickets/TicketWorkout/TicketWorkout";
import NewTicketSubscribe from "../Tickets/TicketSubscribe/NewTicketSubscribe";

const PlaceManagementTicketTab = ({place}) => {
    return (
        <>
            {/*{place && <div className="row">*/}
            {/*    <div className="col-md-6">*/}
            {/*        {place && <TicketSubscribe place={place}/>}*/}
                    {place && <NewTicketSubscribe place={place}/>}
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
