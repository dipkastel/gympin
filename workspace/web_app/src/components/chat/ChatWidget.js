import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Box, Divider, Fab, IconButton, Paper, TextField, Typography} from "@mui/material";
import {AccessTime, Chat, Delete, Error, Replay, Send} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import {ActivationState} from "@stomp/stompjs";
import {useWebSocketClient} from "./useWebSocketClient";
import {playMessageReceived} from "../../helper/utils";
import {getDriverId} from "../../helper/pocket";
import {Api_url, AuthApi} from "../../network/api/NETWORKCONSTS";
import {ErrorContext} from "../GympinPagesProvider";
import {ws_query} from "../../network/api/ws.api";
import _ChatHeader from "./_ChatHeader";
import CloseIcon from "@mui/icons-material/Close";


const ChatWidget = () => {
    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);
    const [open, setOpen] = useState(false);
    const [mood, setMood] = useState("CHAT");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [pendingMessages, setPendingMessages] = useState([]);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const msgBox = useRef(null);
    const driverId = getDriverId(currentUser?.id);

    const changeMessages = useCallback((msg) => {
        setMessages((prev) => [...prev, msg]);
        setOpen(true);
        playMessageReceived(msg.Sender);
        setPendingMessages((prev) =>
            prev.filter((pm) => pm.Message !== msg.Message || pm.Sender !== msg.Sender)
        );
    }, []);

    const handleSetInput = useCallback((text) => {
        setInput(text);
    }, []);

    const handleStatusChanged = useCallback((s) => {
        setStatus(s);
    }, []);

    const handleMessageStatus = useCallback(({message, status}) => {
        if (status === "sent") {
        } else if (status === "failed") {
            setPendingMessages((prev) =>
                prev.map((pm) =>
                    pm.Message === message.Message && pm.Sender === message.Sender
                        ? {...pm, failed: true}
                        : pm
                )
            );
        }
    }, []);

    const {sendMessage, reactive} = useWebSocketClient({
        ChangeMessages: changeMessages,
        setInput: handleSetInput,
        statusChanged: handleStatusChanged,
        driverId: driverId,
        currentUser: currentUser,
        onMessageStatus: handleMessageStatus,
        subscribeDestination: "/chat/SupportChatS/" + driverId,
        sendToDestination: "/app/SupportChatM/" + driverId,
        endPoint: AuthApi.BASEURL + Api_url.Chat.endpoint,
    });


    useEffect(() => {
        if (msgBox.current) {
            msgBox.current.scrollTop = msgBox.current.scrollHeight;
        }
    }, [messages, pendingMessages, open]);

    useEffect(() => {
        getLastMessages();
    }, []);

    function getLastMessages() {
        ws_query({
            queryType: "FILTER",
            DriverId: driverId,
            paging: {Page: 0, Size: 20, orderBy: "Id", Desc: true},
        })
            .then((result) => {
                setMessages(result.data.Data.content.reverse());
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    const toggleChat = () => setOpen(!open);

    const handleSendMessage = useCallback(() => {
        if (input.trim()) {
            const newMessage = {Message: input, Sender: "Client", id: Date.now()};
            setPendingMessages((prev) => [...prev, newMessage]);
            sendMessage(newMessage);
            setInput("");
        }
    }, [input, sendMessage]);

    const deletePendingMessage = useCallback((msg) => () => {
        setPendingMessages((prev) =>
            prev.filter((pm) => pm.id !== msg.id)
        );
    }, []);

    const resendPendingMessage = useCallback((msg) => () => {
        setPendingMessages((prev) =>
            prev.map((pm) =>
                pm.id === msg.id ? {...pm, failed: false} : pm
            )
        );
        sendMessage({Message: msg.Message, Sender: msg.Sender, id: msg.id});
    }, [sendMessage]);

    return (
        <>
            <Fab
                color="primary"
                onClick={toggleChat}
                sx={{position: "fixed", bottom: 74, right: 24, zIndex: 1000}}
            >
                <Chat/>
            </Fab>

            {open && (
                <div>
                    <IconButton
                        size="small"
                        onClick={toggleChat}
                        sx={{
                            color: "white",
                            position: "fixed",
                            width: "30px",
                            height: "30px",
                            bgcolor: "#cd191a",
                            bottom: 618,
                            right: 29,
                            zIndex: 3100,
                        }}>
                        <CloseIcon/>
                    </IconButton>
                    <Paper
                        elevation={6}
                        sx={{
                            position: "fixed",
                            borderRadius: 3,
                            bottom: 134,
                            right: 24,
                            width: 350,
                            height: 480,
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 3000,
                        }}
                    >
                        <_ChatHeader status={status} toggleChat={toggleChat} reactive={reactive} mood={mood} setMood={setMood}/>

                        <Box
                            ref={msgBox}
                            sx={{
                                flex: 1,
                                p: 1,
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >

                            {[...messages, ...pendingMessages].map((msg, i) => (
                                <Box
                                    key={msg.id || i}
                                    sx={{
                                        alignSelf: msg?.Sender === "Client" ? "flex-start" : "flex-end",
                                        bgcolor: msg?.Sender === "Client" ? pendingMessages.includes(msg) ? "#ff9999" : "grey.300" : "#cd191a",
                                        color: msg?.Sender === "Client" ? "black" : "white",
                                        p: 2,
                                        borderRadius: msg?.Sender === "Client" ? "16px 16px 16px 0" : "16px 16px 0 16px",
                                        maxWidth: "80%",
                                        wordBreak: "break-word",
                                        textAlign: "justify",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        opacity: 1,
                                    }}
                                >
                                    {pendingMessages.includes(msg) && !msg.failed && (<>
                                            <AccessTime sx={{fontSize: 16, color: "grey.600"}}/>
                                        </>
                                    )}
                                    {msg?.failed && (<>
                                            <Error sx={{fontSize: 16, color: "#FF0000"}}/>
                                            <Replay sx={{fontSize: 16, color: "#FF0000"}} onClick={resendPendingMessage(msg)}/>
                                        </>
                                    )}
                                    {msg?.Message}
                                    {msg?.failed && (<>
                                        <Delete sx={{fontSize: 16, color: "#4b0505"}} onClick={deletePendingMessage(msg)}/>
                                    </>)}
                                </Box>
                            ))}
                            {([...messages, ...pendingMessages].length < 1) && <>
                                <Grid container justifyContent={"center"} textAlign={"center"}>
                                    <Typography variant={"subtitle1"} sx={{p: 4}}>کارشناسان ما در سریع ترین زمان ممکن پاسخ شما را خواهند
                                        داد</Typography>
                                    <Typography variant={"body2"} sx={{p: 4}}>میانگین انتظار پاسخگویی در کمتر از 11 دقیقه</Typography>
                                </Grid>

                            </>}
                        </Box>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                 component="div"/>

                        <Box sx={{display: "flex", px: 2,pt:1, gap: 1}}>
                            <IconButton
                                variant="contained"
                                sx={{color: "#cd191a"}}
                                onClick={handleSendMessage}
                            >
                                <Send sx={{fontSize: "1.6rem", rotate: "-30deg"}}/>
                            </IconButton>
                            <Grid container sx={{width:"100%"}} justifyContent={"end"}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant={"standard"}
                                    value={input}
                                    multiline={true}
                                    minRows={2}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="پیام خود را بنویسید..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <Typography sx={{fontSize:"0.5rem"}} variant={"caption"} >ساخته شده در جیم پین</Typography>
                            </Grid>
                        </Box>
                    </Paper>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
