import React, {useContext, useEffect, useState} from 'react';
import BaseReportBox, {LoadStatus} from "../BaseReportBox";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Report_getActivePersonnel, Report_getPopularSports} from "../../../network/api/report.api";
import Grid from "@mui/material/Grid2";
import {Avatar, Card, Input, TableCell, Typography} from "@mui/material";
import {encodeId, toPriceWithComma} from "../../../helper/utils";
import {useNavigate} from "react-router";

const _RActiveUsers = ({corporate}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const [loadStatus, setLoadStatus] = useState(LoadStatus.LOADING);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPopularSports()
    }, []);

    function getPopularSports() {

        setLoadStatus(LoadStatus.LOADING);
        if (!corporate) return;
        Report_getActivePersonnel({id: corporate?.Id}).then(result => {
            if(result.data.Data.length>0){
                setData(result.data.Data);
                setLoadStatus(LoadStatus.LOADED);
            }else{
                setLoadStatus(LoadStatus.LOADED);
            }
        }).catch(e => {
                try {
                    setLoadStatus(LoadStatus.ERROR);
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (<>

            <BaseReportBox title={"فعالترین کاربران ماه"} ReloadData={getPopularSports} loadStatus={loadStatus} >
                <Grid container columns={data.length} direction={"row"} spacing={1}>
                    {data.map((item,number)=>(<Grid size={1} key={"ac-us-"+number}  onClick={(e)=>navigate("/personnel/detail/" + encodeId(item.PersonnelId))}>
                        <Grid variant={"outlined"} sx={{ p: 2, justifyItems: "center",textAlign:"center",borderRadius:4,border:"2px solid #333"}}>
                            <label htmlFor="raised-button-file">
                                <Avatar
                                    sx={{width: 120, height: 120, marginTop: 3}}
                                    alt="userImage"
                                    src={item?.User?.Avatar?.Url}
                                />
                            </label>
                            <Typography sx={{mt: 3, mb: 1,minHeight:40}} variant={"body2"}>{item?.User?.FullName}</Typography>
                        </Grid>
                    </Grid>))}
                </Grid>
            </BaseReportBox>
        </>
    );
};

export default _RActiveUsers;
