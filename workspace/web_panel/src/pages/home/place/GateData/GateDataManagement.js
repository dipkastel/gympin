import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gates_getById, gates_update} from "../../../../network/api/gates.api";
import Notice from "../../../partials/content/Notice";
import GateBase from "./Base/GateBase";
import GateTiming from "./Timing/GateTiming";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const GateDataManagement = () => {
    const error = useContext(ErrorContext);
    const [gate,setGate] = useState(null);
    const {gateId} = useParams();
    useEffect(() => {
        getThisGate()
    }, []);
    function getThisGate(){
        gates_getById({id:gateId}).then(data=>{
            setGate(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateGate(gate){
        gates_update(gate).then(data=>{
            error.showError({message: "عملیات موفق",});
            getThisGate()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {gate && (
                    <p>مدیریت مشخصات درگاه {gate.Name}</p>
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
