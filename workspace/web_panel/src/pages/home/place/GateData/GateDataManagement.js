import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gates_getById, gates_update} from "../../../../network/api/gates.api";
import Notice from "../../../partials/content/Notice";
import GateBase from "./Base/GateBase";
import GateTiming from "./Timing/GateTiming";

const GateDataManagement = () => {
    const [gate,setGate] = useState(null);
    const {gateId} = useParams();
    console.log("param",useParams())
    useEffect(() => {
        getThisGate()
    }, []);
    function getThisGate(){
        gates_getById({id:gateId}).then(data=>{
            console.log(data.data.Data);
            setGate(data.data.Data);
        }).catch(e=>console.log(e))
    }

    function updateGate(gate){
        gates_update(gate).then(data=>{
            getThisGate()
        }).catch(e=>console.log(e));
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {gate && (
                    <p>مدیریت مشخصات گیت {gate.Name}</p>
                )}
            </Notice>
            {gate && <div className="row">
                <div className="col-md-6">
                    <GateBase gate={gate} updateGate={updateGate}/>
                </div>
                <div className="col-md-6">
                    <GateTiming gate={gate}/>
                </div>
            </div>}
        </>
    );
};

export default GateDataManagement;
