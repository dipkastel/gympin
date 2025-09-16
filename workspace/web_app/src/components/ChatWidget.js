import React from "react";
import {Fab, Typography} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import {Call} from "@mui/icons-material";

const ChatWidget = () => {
    return (
        <>
            <Fab
                color="primary"
                component="a"
                href="tel:02128424190"
                sx={{
                    position: "fixed",
                    bottom: 74,
                    right: 24,
                    zIndex: 1000,
                    width: 70,
                    height: 70,
                    flexDirection: "column",
                }}
            >
                <Call fontSize={"medium"} />
                <Typography variant="caption" >
                    پشتیبانی
                </Typography>
            </Fab>
        </>
    );
};

export default ChatWidget;
