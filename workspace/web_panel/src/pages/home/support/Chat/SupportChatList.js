import React, {useCallback, useContext, useEffect, useState} from "react";
import {Box, Grid, List, ListItem, Paper, Typography,} from "@mui/material";
import _ActiveUserListItem from "./_ActiveUserListItem";
import _ChatBox from "./_ChatBox";
import {useSelector} from "react-redux";
import {ws_getSessionList} from "../../../../network/api/ws.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useWebSocketClient} from "../../../../helper/useWebSocketClient";
import {AuthApi, Chat} from "../../../../network/api/const_api";
import {ActivationState} from "@stomp/stompjs";


export default function SupportChatList() {

    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [listStatus, setListStatus] = useState(ActivationState.INACTIVE);



    const recivedList = useCallback(
        (msg) => {
            const updatedUsers = setClientToUsers(msg);
            setUsers((prev) => {
                if (prev) {
                    const mergedUsers = prev.map((u) => {
                        const newUser = updatedUsers.find((nu) => nu.driverId === u.driverId);
                        if (newUser) {
                            return {
                                ...u,
                                hasOnline: newUser.hasOnline,
                                sessions: newUser.sessions,
                            };
                        }else{
                            return {
                                ...u,
                                hasOnline: false,
                                sessions:u.sessions.map(se=>{return {...se,isOnline:false}})
                            }
                        }
                        return u;
                    });
                    const newUsers = updatedUsers.filter((nu) => !prev.some((u) => u.driverId === nu.driverId));
                    const finalUsers = [...mergedUsers, ...newUsers].sort(
                        (a, b) => (b.hasOnline === true) - (a.hasOnline === true)
                    );
                    return finalUsers;
                } else {
                    return updatedUsers;
                }
            });
        },
        []
    );


    const handleStatusChanged = useCallback((s) => {
        setListStatus(s);
    }, []);

    const { reactive } = useWebSocketClient({
        ChangeMessages: recivedList,
        setInput: null,
        statusChanged: handleStatusChanged,
        driverId:"0",
        currentUser:null,
        onMessageStatus: null,
        subscribeDestination:"/manage/onlineUsers",
        sendToDestination:null,
        endPoint:AuthApi.BASEURL + Chat.endpoint
    });

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
        return groupedArray;
    }

    useEffect(() => {
        ws_getSessionList().then(result=>{
            var lastSessionsFromServerApi = setClientToUsers(result.data.Data);
            setUsers(lastSessionsFromServerApi);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", mb: 2}}>
                <Grid container>
                    <Grid
                        item
                        size={{xs:12,md:8,lg:9}}
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
                    <Grid item size={{xs:12,md:4,lg:3}} sx={{
                        borderRight: "1px solid #ddd",
                        height: "Calc(100VH - 350px)",
                        background: "#f1f1f1",
                        direction: "ltr",
                        overflowX: "hidden",
                        overflowY: "scroll"
                    }}>
                        <Grid sx={{bgcolor:listStatus===0?"#02230a":"#e7333e",color:"#FFFFFF",p:1}}>
                            <Typography>{ActivationState[listStatus]}</Typography>
                        </Grid>
                        <List>
                            {users?users?.map((user) => (
                                <ListItem sx={{direction: "rtl",width:"100%"}} key={user.driverId} disablePadding>
                                    <_ActiveUserListItem
                                        user={user}
                                        selectedUser={selectedUser}
                                        setSelectedUser={setSelectedUser}
                                    />
                                </ListItem>
                            )) : <>هیچ کس اینجا نیست</>}
                        </List>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    );
}
