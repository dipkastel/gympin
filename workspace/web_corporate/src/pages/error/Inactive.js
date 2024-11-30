import React, {useEffect} from 'react';
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useSelector} from "react-redux";
import store from "../../helper/redux/store";

const Inactive = () => {

    const corporate = useSelector(({corporate}) => corporate.corporate);
    useEffect(() => {
        store.dispatch(sagaActions.RequestCorporate(corporate));
    }, []);

    return (
        <div>
            این مجموعه غیر فعال می باشد

            {/*TODO set a button for check can go to gome*/}
        </div>
    );
};

export default Inactive;
