import React from 'react';
import WizardBody from "../../pages/wizard/body/WizardBody";
import {useSelector} from "react-redux";

const PageAuthGate = (props) => {
    const corporate = useSelector(({corporate}) => corporate?.corporate)
    //check demo
    //check wizard
    return (
        <>
            {(corporate?.Status==="PREREGISTER")&&<WizardBody/>}
            {!(corporate?.Status==="PREREGISTER")&&props.children}
        </>
    );
};

export default PageAuthGate;
