import React, {useContext, useEffect, useState} from "react";
import AnalyticsBox from "../../components/AnalyticsBox";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {
    purchasedSubscribe_getPlaceSellsSubscribesCount,
    purchasedSubscribe_getPlaceSubscribes,
    purchasedSubscribe_query
} from "../../network/api/subscribe.api";

const _MonthSellCount = ({place}) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [placeSubscribes, setPlaceSubscribes] = useState(null);

    useEffect(() => {
        getPersonnel();
    }, [place]);

    function getPersonnel() {
        if (!place) return;
        setPlaceSubscribes(null)
        purchasedSubscribe_getPlaceSellsSubscribesCount({placeId: place.Id}).then(result => {
            setPlaceSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (
        <div>
            <AnalyticsBox
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-users.svg"/>}
                title="فروش ها"
                color={"quinary"}
                total={
                    placeSubscribes ? (
                        placeSubscribes
                    ) : (
                        <>
                            <CircularProgress size={20}/>
                        </>
                    )
                }
                onClick={() => navigate("/users")}
            />
        </div>
    );
};

export default _MonthSellCount;
