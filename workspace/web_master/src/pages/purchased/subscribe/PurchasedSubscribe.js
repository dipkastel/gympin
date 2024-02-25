import React, {useEffect} from 'react';
import _HallEntered from "../../users/scan/EnteredUsers/_HallEntered";
import _ActiveSubscribes from "./activeSubscribes/_ActiveSubscribes";

const PurchasedSubscribe = () => {
    useEffect(() => {
        document.title = 'مدیریت فروش ها';
    }, []);

    return (
        <div>
        <_ActiveSubscribes  />
        </div>
    );
};

export default PurchasedSubscribe;
