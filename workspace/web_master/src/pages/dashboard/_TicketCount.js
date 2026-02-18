import React, {useContext, useEffect, useState} from "react";
import AnalyticsBox from "../../components/AnalyticsBox";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {CircularProgress} from "@mui/material";
import {ticketBuyable_query} from "../../network/api/buyable.api";

const _PersonnelCount = ({place, navigate}) => {
    const error = useContext(ErrorContext);
    const [service, SetService] = useState(null);

    useEffect(() => {
        getweekTickets();
    }, []);

    function getweekTickets() {
        if (!place) return;
        ticketBuyable_query({
            queryType: "FILTER",
            Place: place.Id,
            Enable: true,
            paging: {Page: 0, Size: 100, Desc: true}
        })
            .then((data) => {
                console.log(data.data.Data);
                SetService(data.data.Data);
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    return (
        <div>
            <AnalyticsBox
                onClick={(e) => navigate("/management")}
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-ticket.svg"/>}
                title="بلیط های فعال"
                color={"secondary"}
                percent={0}
                total={
                    service != null ? (
                        service.totalElements
                    ) : (
                        <>
                            <CircularProgress size={20}/>
                        </>
                    )
                }
            />
        </div>
    );
};

export default _PersonnelCount;
