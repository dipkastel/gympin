import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const AudioManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [pagination, setPagination] = useState({Page: 0, Size: 20})

    useEffect(() => {
        getAudioByPage(pagination);
    }, [pagination]);
    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            alert(item);
        }
    }));
    function getAudioByPage(page) {

    }

    return (
        <>
            این قسمت فعلا در دسترس نیست
        </>
    );
};

export default forwardRef(AudioManager);
