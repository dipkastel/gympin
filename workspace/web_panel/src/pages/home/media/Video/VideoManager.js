import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const VideoManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [pagination, setPagination] = useState({Page: 0, Size: 20})

    useEffect(() => {
        getVideoByPage(pagination);
    }, [pagination]);

    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            alert(item);
        }
    }));
    function getVideoByPage(page) {

    }

    return (
        <>
            این قسمت فعلا در دسترس نیست
        </>
    );
};

export default forwardRef(VideoManager);
