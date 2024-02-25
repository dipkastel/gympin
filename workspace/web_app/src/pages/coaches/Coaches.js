import React, {useEffect} from 'react';
import _CoachesList from "./_CoachesList";

const Coaches = () => {


    useEffect(() => {
        document.title = 'مربیان';
    }, []);

    return (
        <div>
            <_CoachesList />
        </div>
    );
};

export default Coaches;
