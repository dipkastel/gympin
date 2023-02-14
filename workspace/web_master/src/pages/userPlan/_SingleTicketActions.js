import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import {ticket_addEntryMessage, ticket_increaseExpireDate, ticket_scanned} from "../../network/api/ticket.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _SingleTicketActions = ({ticket,renewTicket}) => {
    const error = useContext(ErrorContext);
    const [openModalAddEntry,SetOpenModalAddEntry] = useState(false)
    const [openModalFreeze,SetOpenModalFreeze] = useState(false)
    function renderModalAddEntry() {
        function addEntry(e) {
            e.preventDefault()
            ticket_scanned({id: ticket.Id}).then(result => {
                renewTicket();
                SetOpenModalAddEntry(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={openModalAddEntry} onClose={() => SetOpenModalAddEntry(false)}>
                    <Form onSubmit={(e) => addEntry(e)}>
                        <DialogTitle>{`شما در حال ثبت ورود برای ${ticket.User.FullName} هستید`}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() =>SetOpenModalAddEntry(null)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    function renderModalFreeze() {
        function increaseExpireDate(e) {
            e.preventDefault()
            ticket_increaseExpireDate({IncreaseDayCount:e.target.increaseDayCount.value,TicketId:ticket.Id}).then(result=>{
                renewTicket();
                e.target.increaseDayCount.value = 0;
                SetOpenModalFreeze(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            });
        }

        return (
            <div>
                <Dialog fullWidth open={openModalFreeze} onClose={() => SetOpenModalFreeze(false)}>
                    <Form onSubmit={(e) => increaseExpireDate(e)}>
                        <DialogTitle>افزودن تاریخ انقضای بلیط</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="increaseDayCount"
                                label="تعداد روز افزایش"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() =>SetOpenModalFreeze(false)}>لغو</Button>
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
                    title={"عملیات ها"}
                />
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding={1}
                    >

                        ثبت ورود جدید :
                        <Button size="small" variant={"outlined"} onClick={(e)=>SetOpenModalAddEntry(true)}>ثبت ورود</Button>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding={1}
                    >
                        افزایش تاریخ انقضا (فریز):
                        <Button sx={{float: "left"}} size="small" variant={"outlined"} onClick={()=>SetOpenModalFreeze(true)}>افزایش</Button>
                    </Grid>

                </CardContent>
            </Card>
            {renderModalAddEntry()}
            {renderModalFreeze()}
        </>
    );
};

export default _SingleTicketActions;
