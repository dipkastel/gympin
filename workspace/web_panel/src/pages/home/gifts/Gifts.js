import React from 'react';
import Notice from "../../partials/content/Notice";
import _GiftCredit from "./giftTypes/_GiftCredit";

const Gifts = () => {


    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>مدیریت هدایا</p>
            </Notice>

            <_GiftCredit />
        </>
    );
};

export default Gifts;
