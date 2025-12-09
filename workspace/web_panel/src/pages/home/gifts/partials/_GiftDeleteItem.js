import React, {useContext, useState} from 'react';
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Modal} from "react-bootstrap";
import {GiftCredit_delete} from "../../../../network/api/GiftCredits.api";

const _GiftDeleteItem = ({item,reloadList}) => {


    const error = useContext(ErrorContext);
    const [itemToDelete, setItemToDelete] = useState(null);


    function renderModalEdit() {
        function editGiftCredit(e) {
            e.preventDefault()
            GiftCredit_delete({Id:itemToDelete.Id}).then(result => {
                setItemToDelete(null)
                reloadList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <>
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => editGiftCredit(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف هدیه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {"آیا از حذف " + itemToDelete?.Name + " اطمینان دارید؟"}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                تایید
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <IconButton size={"small"} color={"error"} onClick={(e) => setItemToDelete(item)}><Delete/></IconButton>
            {renderModalEdit()}
        </>
    );
};

export default _GiftDeleteItem;
