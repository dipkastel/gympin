import React, {useEffect, useState} from "react";
import _Wallet from "./_Wallet";
import _Transactions from "./_Transactions";
import _FinanaceReport from "./_FinanceReport";
import {connect, useSelector} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";


function Finance(props){
    const currentPlace = useSelector(({place}) => place.place);
    const[place,SetPlace] = useState(currentPlace);
    const[changeValues,SetChangeValues] = useState(0);
    useEffect(() => {
        props.RequestPlace(place.Id)
    }, [changeValues]);

    useEffect(() => {
        SetPlace(currentPlace);
        console.log(currentPlace)
    }, [currentPlace,changeValues]);


    if(!getAccessOf(personnelAccessEnumT.Finance))
        return (<></>);

    return (
        <>
            <_Wallet place={place} onRequestComplete={()=>SetChangeValues(Math.random())}/>
            {/*<_FinanaceReport place={place}/>*/}
            <_Transactions place={place}/>

        </>
    );
}
export default connect(null, sagaActions)(Finance);
