import React, {useEffect} from 'react';
import _Invite from "./_Invite";

const InviteFriends = () => {

    useEffect(() => {
        document.title = 'دعوت از دوستان';
    }, []);
    return (
        <>
            <_Invite/>
        </>
    );
};

export default InviteFriends;
