import React, {useEffect, useState} from "react";
import _Wallet from "./_Wallet";
import _Transactions from "./_Transactions";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";


function Finance(props){
    const currentPlace = useSelector(({place}) => place.place);
    const currentUser = useSelector(({auth}) => auth.user);
    const[place,SetPlace] = useState(currentPlace);
    const[user,SetUser] = useState(currentUser);
    const[changeValues,SetChangeValues] = useState(0);
    useEffect(() => {
        if(!user) return;
        props.RequestUser(user)
    }, [changeValues]);

    useEffect(() => {
        if(!place) return;
        props.RequestPlace(place.Id)
    }, []);

    useEffect(() => {
        SetPlace(currentPlace);
    }, [currentPlace]);

    useEffect(() => {
        SetUser(currentUser);
    }, [currentUser,changeValues]);


    if(!getAccessOf(personnelAccessEnumT.Finance))
        return <AccessDenied/>;

    return (
        <>
            <_Wallet place={place} user={user} onRequestComplete={()=>SetChangeValues(Math.random())}/>
            {/*<_FinanaceReport place={place}/>*/}
            <_Transactions place={place}/>

        </>
    );
}
export default connect(null, sagaActions)(Finance);
