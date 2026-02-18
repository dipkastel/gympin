import React from 'react';
import {Button, Card, CardContent, CardHeader, CircularProgress, Grid2 as Grid, Typography} from "@mui/material";

export const LoadStatus = {
    LOADING: 1,
    LOADED: 2,
    NODATA: 3,
    ERROR: 4
}


const BaseReportBox = ({children, title, loadStatus, ReloadData}) => {
    return (
        <div>
            <Card elevation={5} sx={{m: 2}}>
                <CardHeader sx={{backgroundColor: "primary.boxBg"}} title={<Typography variant={"body2"}>{title}</Typography>}/>
                <CardContent sx={{minHeight: 240, maxHeight: 400, alignContent: "center"}}>
                    {loadStatus == LoadStatus.LOADING && <Grid textAlign={"center"}><CircularProgress/></Grid>}
                    {loadStatus == LoadStatus.LOADED && children}
                    {(loadStatus == LoadStatus.NODATA || loadStatus == null) &&
                    <Typography sx={{color: "primary.boxBg"}} textAlign={"center"} variant={"h5"}>دیتای کافی وجود ندارد</Typography>}
                    {loadStatus == LoadStatus.ERROR && <Grid textAlign={"center"}>
                        <Typography sx={{color: "primary.boxBg"}} textAlign={"center"} variant={"h5"}>خطا در دریافت اطلاعات</Typography>
                        <Button sx={{mt: 4}} variant={"contained"} color={"error"} onClick={() => {
                            ReloadData()
                        }}>تلاش مجدد</Button>
                    </Grid>
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default BaseReportBox;
