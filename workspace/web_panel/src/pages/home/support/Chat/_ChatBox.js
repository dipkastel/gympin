import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Paper, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {useWebSocketClient} from "../../../../helper/useWebSocketClient";
import {playMessageReceived} from "../../../../helper";
import {ActivationState} from "@stomp/stompjs";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {ws_query} from "../../../../network/api/ws.api";
import {AuthApi, Chat} from "../../../../network/api/const_api";
import {AccessTime, Delete, Error, Replay} from "@mui/icons-material";

const _ChatBox = ({selectedUser}) => {

    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [pendingMessages, setPendingMessages] = useState([]);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const msgBox = useRef(null);


    const changeMessages = useCallback((msg) => {
        setMessages((prev) => [...prev, msg]);
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
        driverId:selectedUser?.driverId,
        currentUser:currentUser,
        onMessageStatus: handleMessageStatus,
        subscribeDestination:"/chat/SupportChatS/"+selectedUser?.driverId,
        sendToDestination:"/app/SupportChatM/"+selectedUser?.driverId,
        endPoint:AuthApi.BASEURL + Chat.endpoint
    });

    useEffect(()=>{
        getLastMessages();
    },[selectedUser])

    function getLastMessages(){
        ws_query({
            queryType: "FILTER",
            DriverId:selectedUser.driverId,
            paging: {Page: 0, Size: 100, orderBy: "id", Desc: true}
        }).then(result => {
            setMessages(result.data.Data.content.reverse());
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    useEffect(()=>{
        if (msgBox.current) {
            msgBox.current.scrollTop = msgBox.current.scrollHeight;
        }
    },[messages])


    const handleSendMessage = useCallback(() => {
        if (input.trim()) {
            const newMessage = { Message: input, Sender: "Server", id: Date.now() };
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
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    my: 2,
                    px: 1,
                    border: "1px solid #eee",
                    borderRadius: 2,
                }}
                ref={msgBox}
            >
                {[...messages, ...pendingMessages]?.map((msg, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: "flex",
                            justifyContent:
                                msg?.Sender === "Server" ? "flex-start" : "flex-end",
                            mb: 1,
                        }}
                    >
                        <Paper
                            sx={{
                                p: 1,
                                bgcolor: msg?.Sender === "Server" ? "primary.main" : "grey.200",
                                color: msg?.Sender === "Server" ? "white" : "black",
                                maxWidth: "70%",
                            }}
                        >

                            {pendingMessages.includes(msg) && !msg.failed && (<>
                                    <AccessTime sx={{ fontSize: 16, color: "grey.600" }} />
                                </>
                            )}
                            {msg?.failed && (<>
                                    <Error sx={{ fontSize: 16, color: "#FF0000" }} />
                                    <Replay sx={{ fontSize: 16, color: "#FF0000" }} onClick={resendPendingMessage(msg)} />
                                </>
                            )}
                            {msg?.Message}
                            {msg?.failed && (<>
                                <Delete sx={{ fontSize: 16, color: "#4b0505" }} onClick={deletePendingMessage(msg)} />
                            </>)}
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Box sx={{display: "flex", gap: 1}}>

                <TextField
                    fullWidth
                    label={"پیام"}
                    variant={"outlined"}
                    placeholder="پیام خود را بنویسید..."
                    value={input}
                    multiline={true}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                >
                    ارسال
                </Button>
            </Box>
        </>
    );
};

export default _ChatBox;
