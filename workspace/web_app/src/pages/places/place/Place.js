import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _TabsPlace from "./_TabsPlace";
import {place_getById} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./place.css"
import {fixTextToSlug} from "../../../helper/utils";

const Place = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const {placeId} = useParams();
    const [place, setPlace] = useState({});

    useEffect(() => {
        let placeLongId = placeId.split('-')[0];
        getPlace(placeLongId);
    }, [placeId]);

    function getPlace(id) {
        place_getById(id).then(result => {
            setPlace(result.data.Data);
            if(placeId.includes("-")&&!placeId.includes(fixTextToSlug(result.data.Data.Name)))
                navigate("/");
            document.title = 'مرکز ورزشی '+result?.data?.Data?.Name+" - جیم پین پل ارتباطی مراکز ورزشی و سازمان ها";
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div className={"row m-0"}>
            {place.Multimedias && <div className={"col-sm-12 col-md-6 p-0"}>
                <_PlaceImages place={place}/>
            </div>}
            {place && <div className={"col-sm-12 col-md-6 p-0"}>
                <_TabsPlace place={place}/>
            </div>}
        </div>
    );
};

export default Place;
