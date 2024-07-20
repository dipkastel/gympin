import React, {useEffect} from 'react';
import _HallEntered from "../../users/scan/EnteredUsers/_HallEntered";
import _ActiveSubscribes from "./activeSubscribes/_ActiveSubscribes";

const PurchasedCourses = () => {
    useEffect(() => {
        document.title = 'مدیریت فروش ها';
    }, []);

    return (
        <div>
        {/*<_ActiveCourses  />*/}
        </div>
    );
};

export default PurchasedCourses;
