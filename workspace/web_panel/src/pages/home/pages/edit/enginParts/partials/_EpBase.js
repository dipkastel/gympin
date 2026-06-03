import React, {useContext, useState} from 'react';
import {Button, Grid, TextField, Tooltip, Typography} from "@mui/material";
import {Check, Delete, EditNote} from "@mui/icons-material";
import _epBaseAddOrEditItem from "./_epBaseAddOrEditItem";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {pages_delete, pages_updatePriority} from "../../../../../../network/api/pages.api";
import {Modal} from "react-bootstrap";

function _EpBase({children, item,parent, elements, icon,reloadPage}) {
    //todo change it to dragble items
    const error = useContext(ErrorContext);
    const [changePriority, setChangePriority] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [priority, setPriority] = useState(item?.Priority);


    function updatePriority() {
        pages_updatePriority({
            Id: item.Id,
            Priority: priority,
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            reloadPage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
        setChangePriority(false)
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            pages_delete({Id: item.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setOpenModalDelete(false)
                    setIsDeleted(true);
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
                            <Modal.Title>{"حذف سازمان"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {"حذف " + item.Type}
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

    return isDeleted?(<></>): (
        <>
            <Grid key={"index" + item?.Type + item?.Id} sx={{mt: 1}} container>
                <Grid container
                      sx={{marginRight: 2, borderWidth: "3px 1px 0px 3px", borderStyle: "solid", borderRadius: "10px 10px 0px 0px"}}>

                    <Grid sx={{cursor: "grab", padding: "2px 2px 0px 0px"}}>
                        <Tooltip title={item?.Type} placement={"top"} sx={{color:item?.ViewType?.startsWith("INCREDIBLE")?"#F00":"#000"}}>{icon}</Tooltip>

                        {/*{"░░░░░"}*/}
                    </Grid>
                    <Grid container sx={{padding: "4px 8px 0px 3px"}}>

                        {!changePriority && <Typography
                            onClick={(e) => setChangePriority(true)}
                            variant={"body1"}
                            sx={{m: 0, p: 0}}>
                            {priority || "ثبت نشده"}
                        </Typography>}
                        {changePriority && <>
                            <TextField
                                inputProps={{style: {padding: "0px", textAlign: "center", maxWidth: "40px"}}}
                                type={"number"}
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                size={"small"}
                                sx={{m: 0, p: 0}}/>
                            <Check
                                color={"success"}
                                onClick={(e) => updatePriority(e)}/>
                        </>}
                    </Grid>
                    <Grid container sx={{padding: "3px"}} onClick={(e) => setOpenModalEdit(true)}>
                        <EditNote color={"info"}/>
                    </Grid>
                    <Grid container sx={{padding: "3px 3px 3px 8px"}} onClick={(e) => setOpenModalDelete(true)}>
                        <Delete color={"error"}/>
                    </Grid>
                </Grid>
                <Grid sx={{
                    width: "100%",
                    padding: 1,
                    borderWidth: "1px 1px 1px 1px",
                    borderStyle: "solid",
                    borderRadius: "10px 10px 10px 10px",
                }} container alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
                    {children}
                </Grid>
            </Grid>

            <_epBaseAddOrEditItem elements={elements} parent={parent} itemToEdit={item} openModal={openModalEdit} onClose={(e) => setOpenModalEdit(false)} reloadPage={reloadPage}/>
            {renderModalDelete()}
        </>
    );
};

export default _EpBase;
