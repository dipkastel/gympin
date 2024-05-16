import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl
} from "@mui/material";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {ticketActiveTimes_delete} from "../../../../network/api/gatesTiming.api";
import {TicketSubscribes_delete} from "../../../../network/api/ticketSubscribe.api";
import {useNavigate} from "react-router-dom";

const _SubscribeDelete = ({ticketSubscribe, getSubscribeData}) => {
    const error = useContext(ErrorContext);
    const [deleteItem, setDeleteItem] = useState(null)

    const navigate = useNavigate()


    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            TicketSubscribes_delete({Id: ticketSubscribe.Id}).then(result => {
                setDeleteItem(null);
                navigate('/ticket/subscribes', {replace: true})
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <Dialog open={!!deleteItem} onClose={(e) => setDeleteItem(null)}>
                <DialogTitle>حذف بلیط</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {'حذف ' + deleteItem?.Name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e)=>setDeleteItem(null)}>لغو</Button>
                    <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Form onSubmit={(e) => setDeleteItem(ticketSubscribe)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        sx={{paddingBottom: 0}}
                        title={"حذف " + ticketSubscribe.Name}
                    />
                    <CardContent sx={{margin: 0}}>

                        <FormControl fullWidth>
                            <Button variant={"contained"} onClick={(e) => setDeleteItem(ticketSubscribe)}>حذف</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Form>
            {ModalDelete()}
        </>
    );
};

export default _SubscribeDelete;
