import React, {useEffect} from 'react';
import {Grid} from "@mui/material";

const PageNotFound = () => {

    useEffect(() => {
        document.title = 'صفحه یافت نشد';
    }, []);


    return (
        <><Grid container direction={"column"} sx={{minHeight:"250px"}} alignItems={"center"} justifyContent={"center"}>
            <p>متاسفانه صفحه مورد نظر یافت نشد</p>
        </Grid> </>
    );
};

export default PageNotFound;
