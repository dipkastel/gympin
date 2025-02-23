import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell, TextField} from "@mui/material";
import Notice from "../../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
    ArticleCategory_add,
    ArticleCategory_delete,
    ArticleCategory_getAll
} from "../../../../network/api/articleCategories.api";

const ArticleCategories = () => {
    const error = useContext(ErrorContext);
    const [categories, setCategories] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        getAllCategories();
    }, []);

    function renderModalAdd() {
        function addCategory(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            ArticleCategory_add({
                Name: e.target.name.value
            })
                .then(result=>{
                    error.showError({message: "عملیات موفق",});
                    getAllCategories()
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addCategory(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن دسته بندی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <TextField
                                    name="name"
                                    type={"text"}
                                    label={"نام دسته بندی"}
                                    placeholder="نام دسته بندی"
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            ArticleCategory_delete({Id:itemToDelete.Id})
                .then(data=>{
                    setItemToDelete(null)
                    getAllCategories()
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e)=>DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف عضویت"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete&&"حذف "+itemToDelete.Name}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
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

    function getAllCategories() {
        ArticleCategory_getAll( {Page: 0, Size: 100, Desc: true})
            .then((data) => {
                setCategories(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>دسته بندی های مطالب </p>
            </Notice>


            <Portlet>
                <PortletHeader
                    title="دسته بندی ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories && categories.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"}
                                                                    color={"error"} onClick={()=>{setItemToDelete(row)}}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </div>
    );
};

export default ArticleCategories;
