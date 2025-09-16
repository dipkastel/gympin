import React, {useEffect, useRef, useState} from "react";
import {Box, Grid, List, ListItem, Paper, Typography,} from "@mui/material";
import {createWebSocketClient} from "../../../../helper/createWebSocketClient";
import _ActiveUserListItem from "./_ActiveUserListItem";
import _ChatBox from "./_ChatBox";


export default function SupportChatList() {

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(null);
    const socket = useRef(null);


    useEffect(() => {
        socket.current = createWebSocketClient((obj) => {
            setUsers(obj);
        }, "/manage/onlineUsers");
        return () => socket.current.deactivate();
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
                            {users ? Object?.keys(users)?.map((key) => (

                                <ListItem sx={{direction: "rtl"}} key={key} disablePadding>
                                    <_ActiveUserListItem
                                        sessionId={key}
                                        users={users}
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
