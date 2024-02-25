import React, {useEffect} from 'react';

const Coach = () => {

    useEffect(() => {
        document.title = 'پروفایل مربی';
    }, []);

    return (
        <div>
            coach
        </div>
    );
};

export default Coach;
