import React, {useContext, useEffect, useRef, useState} from "react";
import {Box, Grid, List, ListItem, Paper, Typography,} from "@mui/material";
import {createWebSocketClient} from "../../../../helper/createWebSocketClient";
import _ActiveUserListItem from "./_ActiveUserListItem";
import _ChatBox from "./_ChatBox";
import {useSelector} from "react-redux";
import {ws_getSessionList} from "../../../../network/api/ws.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";


export default function SupportChatList() {

    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(null);
    const socket = useRef(null);


    function setClientToUsers(sessionLists){
        const sessionsList = Object.values(sessionLists).filter(s => s.appName !== 'WEBPANEL');

        const groupedByDriver = sessionsList.reduce((acc, s) => {
            if (!acc[s.driverId]) acc[s.driverId] = [];
            acc[s.driverId].push(s);
            return acc;
        }, {});
        let groupedArray = Object.entries(groupedByDriver).map(([driverId, sessions]) => ({
            driverId,
            sessions,
            hasOnline: sessions.some(i => i.isOnline === true)
        }));
        groupedArray.sort((a, b) => (b.hasOnline === true) - (a.hasOnline === true));
        groupedArray = groupedArray.map(g => ({
            ...g,
            sessions: g.sessions
                .sort((a, b) => (b.isOnline === true) - (a.isOnline === true))
        }));
        console.log(groupedArray);
        setUsers(groupedArray);
    }
    useEffect(() => {
        ws_getSessionList().then(result=>{
            setClientToUsers(result.data.Data);
            socket.current = createWebSocketClient((obj) => {
                setClientToUsers(obj);
            }, "/manage/onlineUsers","0",user);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        return () => socket?.current?.deactivate();
    }, []);


    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", mb: 2}}>
                <Grid container>
                    <Grid item xs={3} sx={{
                        borderRight: "1px solid #ddd",
                        height: "Calc(100VH - 350px)",
                        background: "#f1f1f1",
                        direction: "ltr",
                        overflowX: "hidden",
                        overflowY: "scroll"
                    }}>
                        <List>
                            {users?users?.map((user) => (

                                <ListItem sx={{direction: "rtl"}} key={user.driverId} disablePadding>
                                    <_ActiveUserListItem
                                        user={user}
                                        selectedUser={selectedUser}
                                        setSelectedUser={setSelectedUser}
                                    />
                                </ListItem>
                            )) : <>هیچ کس اینجا نیست</>}
                        </List>
                    </Grid>

                    <Grid
                        item
                        xs={9}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            background: "#f9f9f9",
                            height: "Calc(100VH - 350px)",
                            px: 2,
                            pb: 2
                        }}
                    >
                        {selectedUser ? (
                            <_ChatBox selectedUser={selectedUser}/>
                        ) : (
                            <Grid container justifyContent={"center"} height={"100%"} alignContent={"center"}>
                                <Typography variant="h6" sx={{
                                    p: 3, background: "#f8f8bb", borderRadius: 3,
                                    border: "#CECE57FF 2px solid "
                                }}>
                                    لطفاً یک کاربر را برای شروع گفتگو انتخاب کنید.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
