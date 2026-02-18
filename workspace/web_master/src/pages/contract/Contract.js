import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../network/api/placePersonnel.api";
import _ContractText from "./partials/_ContractText";
import {gym_getMyPlaceGymById, gym_UpdateContract} from "../../network/api/place.api";

const Contract = () => {

    const error = useContext(ErrorContext);
    const inPlace = useSelector(({place}) => place.place)
    const user =  useSelector(state => state.auth.user)
    const [PlacePersonel,setPlacePersonel] = useState(null);
    const [place,setPlace] = useState(null);
    const [contract, SetContract] = useState({});


    useEffect(() => {
        getPlace();
    }, [user]);
    function getPlace(){
        gym_getMyPlaceGymById(inPlace?.Id).then(result => {
            setPlace(result.data.Data)
            SetContract(JSON.parse(result.data.Data?.ContractData));
            getPlacePerson();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getPlacePerson(){
        placePersonnel_ByPlace({Id: inPlace.Id}).then(result => {
            setPlacePersonel(result?.data?.Data?.filter(pp=>pp?.User?.Id==user?.Id)[0])
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function setContractValue(name,value){
        console.log({...contract,[name]:value},"--",JSON.stringify({...contract,[name]:value}))
        gym_UpdateContract({
            Id:place.Id,
            ContractData:JSON.stringify({...contract,[name]:value})
        }).then(result => {
            getPlace();
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
            <_ContractText contract={contract} place={place} PlacePersonel={PlacePersonel} setContractValue={setContractValue} />
            {/*<_ContractSign contract={contract} place={place} PlacePersonel={PlacePersonel} onNext={onNext}/>*/}
        </div>
    );
};

export default Contract;
