import React from 'react';
import {Grid} from "@mui/material";

const PageNotFound = () => {
    return (
        <><Grid container direction={"column"} sx={{minHeight:"250px"}} alignItems={"center"} justifyContent={"center"}>
            <p>متاسفانه صفحه مورد نظر یافت نشد</p>
        </Grid> </>
    );
};

export default PageNotFound;
