import React from 'react';
import _userDetails from "./_userDetails";
import _userCharges from "./_userCharges";

const SingleUser = (props) => {

    return (
        <>
            <_userDetails/>
            <_userCharges/>
        </>
    );
};

export default SingleUser;
