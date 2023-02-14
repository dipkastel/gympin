import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Divider,
    Grid,
    List, TextField,
    Typography
} from "@mui/material";
import {PlaceAbout_add} from "../../network/api/placeAbout.api";
import {Form} from "react-bootstrap";
import {ticket_addEntryMessage, ticket_exitRequest} from "../../network/api/ticket.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _SingleTicketEntryList = ({ticket,renewTicket}) => {
    const error = useContext(ErrorContext);
    const [entryToAddMessage,SetEntryToAddMessage] = useState(null)
    const [entryToExit,SetEntryToExit] = useState(null)
    function renderModalExit() {
        function setExit(e) {
            e.preventDefault();
            ticket_exitRequest({id:entryToExit.Id}).then(result=>{
                renewTicket();
                SetEntryToExit(null);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={!(!entryToExit)} onClose={() => SetEntryToExit(null)}>
                    <Form onSubmit={(e) => setExit(e)}>
                        <DialogTitle>{"آیا از ثبت خروج برای "+`${ticket.User.FullName}(${ticket.User.Username})`+"اطمینان دارید؟"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() =>SetEntryToExit(null)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }



    function renderModalAddMessage() {
        function addMessage(e) {
            e.preventDefault()
            ticket_addEntryMessage({Message:e.target.title.value,EntryId:entryToAddMessage.Id}).then(result=>{
                renewTicket();
                e.target.title.value = "";
                SetEntryToAddMessage(null);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
            ticket_addEntryMessage({ }).then(result => {
            }).catch(e => console.log(e))
        }

        return (
            <div>
                <Dialog fullWidth open={!(!entryToAddMessage)} onClose={() => SetEntryToAddMessage(null)}>
                    <Form onSubmit={(e) => addMessage(e)}>
                        <DialogTitle>افزودن یادداشت</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="یادداشت"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() =>SetEntryToAddMessage(null)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"ورودهای کاربر"}
                />
                <CardContent>

                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {ticket.EntryList&&ticket.EntryList.sort((a,b)=>b.Id-a.Id).map(item => (
                            <div key={"entry-"+item.Id}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{padding:1}}
                                >
                                    <Grid item>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Typography variant={"body2"}> ورود</Typography>←
                                            <Typography variant={"caption"}>{new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            hidden={!item.ExitDate}
                                        >

                                            <Typography variant={"body2"}>خروج</Typography> ←
                                            <Typography
                                                variant={"caption"}>{item.ExitDate ? new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            }) : ""}</Typography>
                                        </Grid>

                                        {item.EntryMessageList&&item.EntryMessageList.map(note=>(

                                            <Grid
                                                key={"note-"+note.Id}
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography sx={{fontWeight:"bold"}} variant={"caption"}>{note.Message}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Grid
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        {!item.ExitDate &&
                                        <Button sx={{float: "left"}} size="small" variant={"outlined"} onClick={(e)=>SetEntryToExit(item)}>ثبت خروج</Button>}
                                        <br/>
                                        <Button sx={{float: "left",marginTop:1}} size="small" variant={"outlined"} onClick={(e)=>SetEntryToAddMessage(item)}>ثبت یادداشت</Button>
                                    </Grid>
                                </Grid>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                            </div>
                        ))}

                    </List>
                </CardContent>
            </Card>
            {renderModalExit()}
            {renderModalAddMessage()}
        </>
    );
};

export default _SingleTicketEntryList;
