import React, {useEffect} from 'react';
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
