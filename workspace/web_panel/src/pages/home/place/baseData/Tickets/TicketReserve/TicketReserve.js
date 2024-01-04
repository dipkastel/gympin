import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {TicketSubscribes_add, TicketSubscribes_delete, TicketSubscribes_getByPlaceId} from "../../../../../../network/api/ticketSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const TicketReserve = ({place}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd,setOpenModalAdd] = useState(false)


    return (
        <>
            <Portlet>
                <PortletHeader
                    title="رزرو ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) =>setOpenModalAdd(true)}
                            >
                                <AddIcon />
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>


                </PortletBody>
            </Portlet>
        </>
    );
};

export default TicketReserve;
