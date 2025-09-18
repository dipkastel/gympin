import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Paper, TextField} from "@mui/material";
import {createWebSocketClient} from "../../../../helper/createWebSocketClient";
import {useSelector} from "react-redux";
import {useWebSocketClient} from "../../../../helper/useWebSocketClient";
import {playMessageReceived} from "../../../../helper";
import {ActivationState} from "@stomp/stompjs";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {ws_query} from "../../../../network/api/ws.api";

const _ChatBox = ({selectedUser}) => {

    const user = useSelector(state => state.auth.user);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const socket = useRef(null);
    const error = useContext(ErrorContext);
    const msgBox = useRef(null);


    const { sendMessage } = useWebSocketClient({
        ChangeMessages: (msg) => {
            setMessages((prev)=>[...prev,msg])
            playMessageReceived(msg.Sender);
        },
        setInput:(text) => setInput(text),
        statusChanged:(status)=>setStatus(status),
        driverId:selectedUser.driverId

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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>sendMessage(input)}
                >
                    ارسال
                </Button>
            </Box>
        </>
    );
};

export default _ChatBox;
