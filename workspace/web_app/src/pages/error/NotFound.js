import React, {useEffect} from 'react';

export function  NotFound(){
    useEffect(() => {
        document.title = 'صفحه یافت نشد';
    }, []);


    return (
        <div>
            <h1>این صفحه وجود ندارد</h1>
        </div>
    );
}

