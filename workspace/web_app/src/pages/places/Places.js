import React, {useEffect} from 'react';
import _PlacesList from "./_PlacesList";

const Places = () => {
    useEffect(() => {
        document.title = 'مراکز';
    }, []);


    return (
        <>
            <_PlacesList/>
        </>
    );
};

export default Places;
