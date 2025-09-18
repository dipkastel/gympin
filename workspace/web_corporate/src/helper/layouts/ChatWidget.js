import React, {useState, useRef, useEffect, useContext} from "react";
import {connect, useSelector} from "react-redux";
import {
    Box, Fab, Paper, IconButton, Typography, TextField, Button
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { Circle } from "@mui/icons-material";
import { ActivationState } from "@stomp/stompjs";
import { useWebSocketClient } from "../useWebSocketClient";
import {playMessageReceived} from "../utils";
import {ws_query} from "../../network/api/ws.api";
import {getDriverId} from "../pocket";
import {ErrorContext} from "../../components/GympinPagesProvider";

const ChatWidget = () => {

    const currentUser = useSelector(state => state.auth.user)
    const error = useContext(ErrorContext);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const statusIconRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const msgBox = useRef(null);
    const driverId = getDriverId(currentUser?.id);

    const { sendMessage } = useWebSocketClient({
        ChangeMessages: (msg) => {
            setMessages((prev)=>[...prev,msg])
            setOpen(true);
            playMessageReceived(msg.Sender);
        },
        setInput:(text) => setInput(text),
        statusChanged:(status)=>setStatus(status),
        driverId:driverId

    });

    useEffect(()=>{
        if (msgBox.current) {
            msgBox.current.scrollTop = msgBox.current.scrollHeight;
        }
    },[messages,open])

    useEffect(()=>{
        getLastMessages();
    },[])
    function getLastMessages(){
        ws_query({
            queryType: "FILTER",
            DriverId:driverId,
            paging: {Page: 0, Size: 20, orderBy: "Id", Desc: false}
        }).then(result => {
            setMessages(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    const toggleChat = () => setOpen(!open);

    let color = "gray";
    if (status === ActivationState.ACTIVE) color = "limegreen";
    if (status === ActivationState.DEACTIVATING) color = "orange";
    if (status === ActivationState.INACTIVE) color = "red";

    return (
        <>
            <Fab
                color="primary"
                onClick={toggleChat}
                sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
            >
                <ChatIcon />
            </Fab>

            {open && (
                <Paper
                    elevation={6}
                    sx={{
                        position: "fixed",
                        borderRadius: 3,
                        bottom: 80,
                        right: 24,
                        width: 300,
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000,
                    }}
                >
                    <Grid
                        sx={{
                            p: 1,
                            borderTopRightRadius: 12,
                            borderTopLeftRadius: 12,
                            bgcolor: "primary.main",
                            color: "white",
                        }}
                        justifyContent={"space-between"}
                        container
                    >
                        <Grid direction={"row"} alignContent={"center"} container>
                            <Circle ref={statusIconRef} sx={{ color, fontSize: 16, mr: 1 }} />
                            <Typography variant="subtitle1">پشتیبانی</Typography>
                        </Grid>

                        <IconButton size="small" onClick={toggleChat} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>

                    <Box ref={msgBox} sx={{ flex: 1, p: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                        {messages?.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    alignSelf: msg?.Sender === "Client" ? "flex-start" : "flex-end",
                                    bgcolor: msg?.Sender === "Client" ? "primary.light" : "grey.300",
                                    color: "black",
                                    p: 1,
                                    borderRadius: 1,
                                    maxWidth: "80%",
                                    wordBreak: "break-word",
                                    textAlign:"justify"
                                }}
                            >
                                {msg?.Message}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", p: 1, gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={input}
                            multiline={true}
                            minRows={1}
                            disabled={status!=ActivationState.ACTIVE}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                        />
                        <Button variant="contained" disabled={status!=ActivationState.ACTIVE} onClick={(e)=>sendMessage(input)}>
                            ارسال
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;
