import React from 'react';
import Grid from "@mui/material/Grid2";
import {Button, IconButton, Typography} from "@mui/material";
import {Circle, Forum, ImportContacts, LocalPhone, PhoneEnabled} from "@mui/icons-material";
import {ActivationState} from "@stomp/stompjs";
import CloseIcon from "@mui/icons-material/Close";

const _ChatHeader = ({status,toggleChat,reactive,mood,setMood}) => {
    return (
        <>

            <Grid
                sx={{
                    p: 1,
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                    bgcolor: "#cd191a",
                    color: "white",
                }}
                justifyContent={"space-between"}
                container
            >
                <Grid>
                    {/*<Button*/}
                    {/*    variant={"contained"}*/}
                    {/*    disabled={mood==="SUPPORT"}*/}
                    {/*    onClick={(e)=>setMood("SUPPORT")}*/}
                    {/*    sx={{bgcolor:"#9d1c1e",mx:0.5}}*/}
                    {/*    size={"small"}*/}
                    {/*    startIcon={<ImportContacts/>} >سوالات متداول</Button>*/}
                    <Button
                        variant={"contained"}
                        // disabled={mood==="CHAT"}
                        // onClick={(e)=>setMood("CHAT")}
                        sx={{bgcolor:"#9d1c1e",mx:0.5}}
                        size={"small"}
                        startIcon={<Forum/>}
                    >چت با پشتیبانی</Button>
                    <IconButton  href={`tel:02128424190`} variant={"contained"} sx={{bgcolor:"#9d1c1e",mx:0.5}} color={"inherit"} size={"small"} ><LocalPhone/></IconButton>

                </Grid>

                <Grid size={12} />

                <Grid/>

                    <Grid direction={"row"} justifyContent={"center"} alignContent={"center"} sx={{p:1,width:"100%"}} container>
                        {status === ActivationState.ACTIVE ? (<>
                                <Circle sx={{ fontSize: 13,mt:0.8, mr: 1 ,color:"#83e380"}} />
                                <Typography variant="subtitle1">پشتیبانی</Typography>
                            </>) : (
                            <>
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
                            </>
                        )}
                    </Grid>


           </Grid>

        </>
    );
};

export default _ChatHeader;
