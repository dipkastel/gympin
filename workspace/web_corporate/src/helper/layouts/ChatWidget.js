import React, { useState, useEffect, useRef } from "react";
import {
    Box, Fab, Paper, IconButton, Typography, TextField, Button
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { createWebSocketClient } from "../createWebSocketClient";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../utils";
import {getDriverId} from "../pocket";
export const chatStatusEnum = {
    CONNECT:"1",
    SUBSCRIBE:"2",
    DISCONNECT:"3",
}

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatStatus,SetChatStatus] = useState(chatStatusEnum.DISCONNECT)
    const socket = useRef(null);
    const user = useSelector(({auth}) => auth.user);
    const driverId = getDriverId(user.id)

    useEffect(() => {
        socket.current = createWebSocketClient((obj) => {
            setMessages((prev) => [...prev, obj]);

        },driverId,user,SetChatStatus);
        return () => socket.current.deactivate();
    }, []);

    const toggleChat = () => setOpen(!open);

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.current.publish({
            destination: "/app/SupportChatM/"+driverId,
            body: JSON.stringify({
                Message: input,
                Sender:"Client" }),
        });
        setInput("");
    };

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
                    sx={{ position: "fixed", bottom: 80, right: 24, width: 300, height: 400, display: "flex", flexDirection: "column", zIndex: 1000 }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, bgcolor: "primary.main", color: "white" }}>
                        <Typography variant="subtitle1">چت با کاربر</Typography>
                        <IconButton size="small" onClick={toggleChat} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flex: 1, p: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    alignSelf: msg.Sender === "Client" ?  "flex-start":"flex-end",
                                    bgcolor: msg.Sender === "Client" ? "primary.light":"grey.300",
                                    color: "black",
                                    p: 1,
                                    borderRadius: 1,
                                    maxWidth: "80%",
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.Message}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", p: 1, gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button variant="contained" onClick={sendMessage}>
                            ارسال
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;
