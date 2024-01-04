import React, {useContext, useEffect, useState} from 'react';
import TicketSubscribe from "../Tickets/TicketSubscribe/TicketSubscribe";
import TicketCourse from "../Tickets/TicketCourse/TicketCourse";
import TicketDiet from "../Tickets/TicketDiet/TicketDiet";
import TicketFood from "../Tickets/TicketFood/TicketFood";
import TicketProduct from "../Tickets/TicketProduct/TicketProduct";
import TicketReserve from "../Tickets/TicketReserve/TicketReserve";
import TicketService from "../Tickets/TicketService/TicketService";
import TicketWorkout from "../Tickets/TicketWorkout/TicketWorkout";
import {buyable_query} from "../../../../../network/api/buyable.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import PlaceSells from "../sells/PlaceSells";

const PlaceManagementSellsTab = ({place}) => {


    return (
        <>
            {place && <div className="row">
                <div className="col-md-12">
                    <PlaceSells place={place} />
                </div>
            </div>}
        </>
    );
};

export default PlaceManagementSellsTab;
