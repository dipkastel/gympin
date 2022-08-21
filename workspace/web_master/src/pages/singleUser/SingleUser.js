import React from 'react';
import _userDetails from "./_userDetails";
import _userPackages from "./_userPackages";
import _userActions from "./_userActions";

const SingleUser = (props) => {

    return (
        <>
            <_userDetails/>
            <_userPackages/>
            <_userActions/>
        </>
    );
};

export default SingleUser;
