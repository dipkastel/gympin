import React, {useContext, useState} from "react";
import {Button, FormControl, FormGroup} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {corporatePersonnel_delete} from "../../../../../network/api/CorporatePersonnel.api";
import {Modal} from "react-bootstrap";
import {corporate_delete} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";

function DeleteCorporate({currentCorporate}) {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [openModalDelete, setOpenModalDelete] = useState(false)

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            if(currentCorporate.Id==1){
                error.showError({message: "این مجموعه نباید حذف شود",});
                return;
            }
            corporate_delete({Id: currentCorporate.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setOpenModalDelete(false)
                    history.push("/corporates")
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <>
                <Modal show={openModalDelete} onHide={() => setOpenModalDelete(false)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف پرسنل"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {currentCorporate && "حذف " + currentCorporate.Name}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalDelete(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"حذف " + currentCorporate.Name}
                />

                <PortletBody>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <Button
                                variant="contained"
                                color={"error"}
                                onClick={(e) => setOpenModalDelete(true)}
                            >
                                حذف
                            </Button>
                        </FormGroup>
                    </FormControl>
                </PortletBody>
            </Portlet>
            {renderModalDelete()}
        </>
    );
}

export default DeleteCorporate;
