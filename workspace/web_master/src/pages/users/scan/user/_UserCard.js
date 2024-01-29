import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, CardHeader, Grid, ListItemText, Typography} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";

const _UserCard = ({subscribe}) => {
    const [inSubscribe, setInSubscribe] = useState(subscribe);
    useEffect(() => {
        setInSubscribe(subscribe)
    }, [subscribe]);

    function getLastEnterDate() {
        if (!inSubscribe) return ""
        if (!inSubscribe.EntryList) return ""
        var lastDate = inSubscribe?.EntryList[inSubscribe?.EntryList.length - 1]?.EnterDate;
        if (lastDate)
            return `آخرین ورود : ${new Date(lastDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: "2-digit",
                minute: "2-digit"
            })}`;
        return "";
    }

    return (<>
            {inSubscribe && <Card elevation={3} sx={{margin: 1}}>

                <CardHeader
                    title={inSubscribe.User?.FullName||inSubscribe.User?.Username}
                    action={<CloseOutlined onClick={(e)=>setInSubscribe(null)}/>}
                    sx={{p:2}}
                />
                <CardContent sx={{pt:0}}>
                    <Grid wrap="nowrap" container>
                        <Grid item>
                            <Avatar sx={{width: "100px", height: "100px"}} alt="Remy Sharp"
                                    src={inSubscribe?.User?.Avatar?.Url}/>

                        </Grid>
                        <Grid item sx={{m:1}}>
                            <ListItemText primaryTypographyProps={{variant: "body2"}}
                                          secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                          primary={inSubscribe?.Name}
                                          secondary={`انقضا : ${new Date(inSubscribe.ExpireDate).toLocaleDateString('fa-IR', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: "2-digit",
                                              minute: "2-digit"
                                          })}`}/>
                            <ListItemText primaryTypographyProps={{variant: "body2"}}
                                          secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                          primary={`جلسه ${inSubscribe.EntryList.length} از ${inSubscribe.EntryTotalCount}`}
                                          secondary={getLastEnterDate()}/>
                            {console.log(inSubscribe?.EntryList?.slice(-1)?.[0].EntryMessageList)}

                            {inSubscribe?.EntryList?.slice(-1)?.[0]?.EntryMessageList?.map((item, number) => (
                                    <Typography sx={{width:"100%"}} key={"message-"+number} variant="body2">{item.Message}</Typography>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>}
        </>

    );
};

export default _UserCard;
