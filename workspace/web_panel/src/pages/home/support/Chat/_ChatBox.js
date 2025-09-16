import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Paper, TextField} from "@mui/material";
import {createWebSocketClient} from "../../../../helper/createWebSocketClient";

const _ChatBox = ({selectedUser}) => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = useRef(null);





    useEffect(() => {
        console.log(selectedUser);
        socket.current = createWebSocketClient((obj) => {
            setMessages((prev) => [...prev, obj]);
        }, "/chat/SupportChatS/"+selectedUser.driverId);
        return () => socket.current.deactivate();
    }, []);


    const sendMessage = () => {
        if (!message.trim()) return;
        socket.current.publish({
            destination: "/app/SupportChatM/"+selectedUser.driverId,
            body: JSON.stringify({
                Message: message ,
                Sender:"Server"}),
        });
        setMessage("");
    };




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
            >
                {messages?.map((msg, idx) => (
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
                            {msg?.Message}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                >
                    ارسال
                </Button>
            </Box>
        </>
    );
};

export default _ChatBox;
