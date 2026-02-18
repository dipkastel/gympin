import React, {useState} from 'react';
import {Button} from "@mui/material";
import __ContractSignSign from "./__ContractSignSign";
import __ContractSignConfirm from "./__ContractSignConfirm";
import __ContractSignDone from "./__ContractSignDone";

const _ContractSign = ({place, contract, PlacePersonel, onNext}) => {
    const mood = {sign: "sign", confirm: "confirm", done: "done"}

    const [currentMood, setCurrentMood] = useState('');


    function renderModalSign() {
        switch (currentMood) {
            case mood.sign:
                return <__ContractSignSign  contract={contract} place={place} setCurrentMood={setCurrentMood}/>;
            case mood.confirm:
                return <__ContractSignConfirm contract={contract} place={place} setCurrentMood={setCurrentMood}/>;
            case mood.done:
                return <__ContractSignDone setCurrentMood={setCurrentMood} place={place}/>;
        }
    }


    return (
        <>
            <Button fullWidth variant={"contained"} color={"success"} onClick={() => setCurrentMood(mood.sign)}>امضا تفاهم نامه</Button>
            {renderModalSign()}
        </>


    );
};

export default _ContractSign;
