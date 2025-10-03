import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const TicketDiet = ({place}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)


    return (
        <>
            <Portlet>
                <PortletHeader
                    title="برنامه های غذایی"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
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

export default TicketDiet;
