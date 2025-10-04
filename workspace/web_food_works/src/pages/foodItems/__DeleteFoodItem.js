import React, {useContext, useState} from 'react';
import {Button, Card, CardHeader, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {TicketFoods_delete} from "../../network/api/TicketFoods.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";

const __DeleteFoodItem = ({selectedItem,setSelectedItem,updateList}) => {


    const error = useContext(ErrorContext);
    const [openModalDelete, setOpenModalDelete] = useState(false);



    function renderModalDelete() {
        function submitDelete(e) {
            e.preventDefault();
            setSelectedItem(null);
            TicketFoods_delete({id: selectedItem.Id}).then(result => {
                setOpenModalDelete(false);
                updateList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
            >
                <Form onSubmit={(e) => submitDelete(e)}>
                    <DialogTitle>{"حذف " + selectedItem?.Name}</DialogTitle>
                    <DialogActions>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            variant={"outlined"}
                            color={"error"}
                            onClick={(e) => setOpenModalDelete(false)}
                        >
                            لغو
                        </Button>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            type={"submit"}
                            variant={"outlined"}
                            color={"success"}
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }



    return (
        <>
            <Card variant={"outlined"} sx={{p:2,m:1}}>
                <Button fullWidth variant={"contained"} color={"error"} onClick={(e)=>setOpenModalDelete(true)} >{"حذف "+selectedItem?.Name}</Button>
            </Card>

            {renderModalDelete()}
        </>
    );
};

export default __DeleteFoodItem;
