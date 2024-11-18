import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import axios from "axios";
import {Api_url} from "../../../network/api/NETWORKCONSTS";
import {placePersonnel_ByPlace} from "../../../network/api/placePersonnel.api";
import _WPageContractText from "./partials/_WPageContractText";
import _WPageContractSign from "./partials/_WPageContractSign";

const WPageContract = ({onNext}) => {

    const error = useContext(ErrorContext);
    const [contract, SetContract] = useState({});
    const place = useSelector(({place}) => place.place)
    const user =  useSelector(state => state.auth.user)
    const [PlacePersonel,setPlacePersonel] = useState(null);


    useEffect(() => {

        placePersonnel_ByPlace({Id: place.Id}).then(result => {
            setPlacePersonel(result?.data?.Data?.filter(pp=>pp?.User?.Id==user?.Id)[0])
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        SetContract(JSON.parse(place?.ContractData));
    }, [place,user]);

    return (
        <div>
            <_WPageContractText contract={contract} place={place} PlacePersonel={PlacePersonel} />
            <_WPageContractSign contract={contract} place={place} PlacePersonel={PlacePersonel} onNext={onNext}/>
        </div>
    );
};

export default WPageContract;
