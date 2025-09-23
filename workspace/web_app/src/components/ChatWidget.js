import React, {useState, useRef, useEffect, useContext, useCallback} from "react";
import {connect, useSelector} from "react-redux";
import {
    Box, Fab, Paper, IconButton, Typography, TextField, Button
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import {AccessTime, Call, Circle, Delete, Error, PhoneEnabled, Replay} from "@mui/icons-material";
import { ActivationState } from "@stomp/stompjs";
import { useWebSocketClient } from "../helper/useWebSocketClient";
import {playMessageReceived} from "../helper/utils";
import {getDriverId} from "../helper/pocket";
import {Api_url, AuthApi} from "../network/api/NETWORKCONSTS";
import {ErrorContext} from "./GympinPagesProvider";
import {ws_query} from "../network/api/ws.api";


const ChatWidget = () => {
    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const statusIconRef = useRef(null);
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

    const handleMessageStatus = useCallback(({ message, status }) => {
        if (status === "sent") {
        } else if (status === "failed") {
            setPendingMessages((prev) =>
                prev.map((pm) =>
                    pm.Message === message.Message && pm.Sender === message.Sender
                        ? { ...pm, failed: true }
                        : pm
                )
            );
        }
    }, []);

    const { sendMessage, reactive } = useWebSocketClient({
        ChangeMessages: changeMessages,
        setInput: handleSetInput,
        statusChanged: handleStatusChanged,
        driverId:driverId,
        currentUser:currentUser,
        onMessageStatus: handleMessageStatus,
        subscribeDestination:"/chat/SupportChatS/"+driverId,
        sendToDestination:"/app/SupportChatM/"+driverId,
        endPoint:AuthApi.BASEURL + Api_url.Chat.endpoint,
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
            paging: { Page: 0, Size: 20, orderBy: "Id", Desc: true },
        })
            .then((result) => {
                setMessages(result.data.Data.content.reverse());
            })
            .catch((e) => {
                try {
                    error.showError({ message: e.response.data.Message });
                } catch (f) {
                    error.showError({ message: "خطا نا مشخص" });
                }
            });
    }

    const toggleChat = () => setOpen(!open);

    const handleSendMessage = useCallback(() => {
        if (input.trim()) {
            const newMessage = { Message: input, Sender: "Client", id: Date.now() };
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
                pm.id === msg.id ? { ...pm, failed: false } : pm
            )
        );
        sendMessage({ Message: msg.Message, Sender: msg.Sender, id: msg.id });
    }, [sendMessage]);

    return (
        <>
            <Fab
                color="primary"
                onClick={toggleChat}
                sx={{ position: "fixed", bottom: 74, right: 24, zIndex: 1000 }}
            >
                <ChatIcon />
            </Fab>

            {open && (
                <Paper
                    elevation={6}
                    sx={{
                        position: "fixed",
                        borderRadius: 3,
                        bottom: 124,
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
                        <IconButton size={"small"} component="a" href={`tel:02128424190`} sx={{color:"white"}} ><PhoneEnabled /></IconButton>
                        {status === ActivationState.ACTIVE ? (
                            <Grid direction={"row"} alignContent={"center"} container>
                                <Circle ref={statusIconRef} color={"success"} sx={{ fontSize: 16, mr: 1 }} />
                                <Typography variant="subtitle1">پشتیبانی</Typography>
                            </Grid>
                        ) : (
                            <Grid>
                                <Typography variant={"caption"}>در حال </Typography>
                                <Typography
                                    component={"a"}
                                    sx={{ cursor: "pointer" }}
                                    variant={"caption"}
                                    onClick={reactive}
                                >
                                    اتصال مجدد
                                </Typography>
                                <Typography variant={"caption"}>...</Typography>
                            </Grid>
                        )}

                        <IconButton size="small" onClick={toggleChat} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>

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
                        {/*{[...messages, ...pendingMessages].map((msg, i) => (*/}
                        {/*    <Box*/}
                        {/*        key={msg.id || i}*/}
                        {/*        sx={{*/}
                        {/*            alignSelf: msg?.Sender === "Client" ? "flex-start" : "flex-end",*/}
                        {/*            bgcolor: msg?.Sender === "Client" ? pendingMessages.includes(msg)?"#ff9999":"primary.light" : "grey.300",*/}
                        {/*            color: "black",*/}
                        {/*            p: 1,*/}
                        {/*            borderRadius: 1,*/}
                        {/*            maxWidth: "80%",*/}
                        {/*            wordBreak: "break-word",*/}
                        {/*            textAlign: "justify",*/}
                        {/*            display: "flex",*/}
                        {/*            alignItems: "center",*/}
                        {/*            gap: 1,*/}
                        {/*            opacity:  1,*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        {pendingMessages.includes(msg) && !msg.failed && (<>*/}
                        {/*                <AccessTime sx={{ fontSize: 16, color: "grey.600" }} />*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*        {msg?.failed && (<>*/}
                        {/*                <Error sx={{ fontSize: 16, color: "#FF0000" }} />*/}
                        {/*                <Replay sx={{ fontSize: 16, color: "#FF0000" }} onClick={resendPendingMessage(msg)} />*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*        {msg?.Message}*/}
                        {/*        {msg?.failed && (<>*/}
                        {/*            <Delete sx={{ fontSize: 16, color: "#4b0505" }} onClick={deletePendingMessage(msg)} />*/}
                        {/*        </>)}*/}
                        {/*    </Box>*/}
                        {/*))}*/}
                        {![...messages, ...pendingMessages].length<1&&<>
                            <Grid container justifyContent={"center"} textAlign={"center"}>
                                <Typography variant={"subtitle1"} sx={{p:4}}>کارشناسان ما در سریع ترین زمان ممکن پاسخ شما را خواهند داد</Typography>
                                <Typography variant={"body2"}  sx={{p:4}}>میانگین انتظار پاسخگویی در کمتر از 11 دقیقه</Typography>
                            </Grid>

                        </>}
                    </Box>

                    <Box sx={{ display: "flex", p: 1, gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={input}
                            multiline={true}
                            minRows={1}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessage}
                        >
                            ارسال
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;
