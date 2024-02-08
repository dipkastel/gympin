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

const _CourseDelete = ({ticketCourse, getCourseData}) => {
    const error = useContext(ErrorContext);
    const [deleteItem, setDeleteItem] = useState(null)



    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            ticketActiveTimes_delete({Id: deleteItem.Id}).then(result => {
                setDeleteItem(null);
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
                <DialogTitle>حذف زمان</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {'حذف ' + deleteItem?.Name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Form onSubmit={(e) => setDeleteItem(ticketCourse)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        sx={{paddingBottom: 0}}
                        title={"حذف " + ticketCourse.Name}
                    />
                    <CardContent sx={{margin: 0}}>

                        <FormControl fullWidth>
                            <Button variant={"contained"} onClick={(e) => setDeleteItem(ticketCourse)}>حذف</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Form>
            {ModalDelete()}
        </>
    );
};

export default _CourseDelete;
