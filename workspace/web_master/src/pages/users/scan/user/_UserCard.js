import React, {useEffect, useState} from 'react';
import {Avatar, Grid, ListItemText, Paper} from "@mui/material";

const _UserCard = ({ticket}) => {
    const [inTicket, setInTicket] = useState(ticket);
    useEffect(() => {
        setInTicket(ticket)
        console.log("ticket", ticket);
    }, [ticket]);

    function getLastEnterDate() {
        if (!inTicket) return ""
        if (!inTicket.Entry) return ""
        var lastDate = inTicket.Entry.EnterDate;
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
            {inTicket && <Paper
                sx={{
                    padding: 1,
                    margin: 2,
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: '#ffffff',
                }}
            >
                <Grid wrap="nowrap" container>
                    <Grid item container>
                        <ListItemText primaryTypographyProps={{variant: "body1"}}
                                      secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                      primary={inTicket.User.FullName} secondary={inTicket.User.Username}/>
                        <ListItemText primaryTypographyProps={{variant: "body2"}}
                                      secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                      primary={inTicket.Plan.Name}
                                      secondary={`انقضا : ${new Date(inTicket.PlanExpireDate).toLocaleDateString('fa-IR', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: "2-digit",
                                          minute: "2-digit"
                                      })}`}/>
                        <ListItemText primaryTypographyProps={{variant: "body2"}}
                                      secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                      primary={`جلسه ${inTicket.UserEntryCount + 1} از ${inTicket.EntryTotalCount}`}
                                      secondary={getLastEnterDate()}/>
                        {inTicket.Entry && inTicket.Entry.EntryMessageList && inTicket.Entry.EntryMessageList.map((item, number) => (
                            <ListItemText key={number} primaryTypographyProps={{variant: "body2"}} fu
                                          display={"contents"}
                                          primary={item.Message}
                            />
                        ))}
                    </Grid>
                    <Grid item>
                        <Avatar sx={{width: "100px", height: "100px"}} alt="Remy Sharp"
                                src={inTicket.User.Avatar ? (inTicket.User.Avatar.Url || "") : ""}/>

                    </Grid>
                </Grid>
            </Paper>}
        </>

    );
};

export default _UserCard;
