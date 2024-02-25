import React, {useEffect} from 'react';

export function  NotFound(){
    useEffect(() => {
        document.title = 'صفحه یافت نشد';
    }, []);


    return (
        <div>
            <h1>404</h1>
        </div>
    );
}

