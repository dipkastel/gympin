import React from 'react';
import {Grid} from "@mui/material";

const AccessDenied = () => {
    return (
        <><Grid container direction={"column"} sx={{minHeight:"250px"}} alignItems={"center"} justifyContent={"center"}>
            <p>متاسفانه دسترسی شما به این بخش تایید نشده</p>
            <p>با مدیر مرکز خود تماس بگیرید</p>
        </Grid> </>
    );
};

export default AccessDenied;
