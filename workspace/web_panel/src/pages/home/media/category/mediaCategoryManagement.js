import React, {useContext, useEffect, useState} from "react";
import Notice from "../../../partials/content/Notice";
import {Button, TableCell, TextField} from "@mui/material";
import {
    multimediacategory_add,
    multimediacategory_getAll,
    multimediacategory_update
} from "../../../../network/api/mediaCategories.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Form, Modal} from "react-bootstrap";


const MediaCategoryManagement = () => {
    const error = useContext(ErrorContext);
    const [categories, setCategories] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)

    useEffect(() => {
        getAllCategories();
    }, []);

    function renderModalAdd() {
        function addCategory(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            multimediacategory_add({
                Name: e.target.name.value,
                ARW: e.target.arw.value,
                ARH: e.target.arh.value,
                MINW: e.target.minw.value,
                MINH: e.target.minh.value,
                MAXW: e.target.maxw.value,
                MAXH: e.target.maxh.value
            })
                .then(result => {
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
                            <Form.Group>
                                <TextField
                                    name="arw"
                                    type={"number"}
                                    placeholder="نسبت عرض"
                                    label={"نسبت عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="arh"
                                    type={"number"}
                                    placeholder="نسبت طول"
                                    label={"نسبت طول"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="minw"
                                    type={"number"}
                                    placeholder="حداقل عرض"
                                    label={"حداقل عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="minh"
                                    type={"number"}
                                    placeholder="حداقل طول"
                                    label={"حداقل طول"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="maxw"
                                    type={"number"}
                                    placeholder="حداکثر عرض"
                                    label={"حداکثر عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="maxh"
                                    type={"number"}
                                    placeholder="حداکثر طول"
                                    label={"حداکثر طول"}
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

    function renderModalEdit() {
        function UpdateCategory(e) {
            e.preventDefault()
            setItemToEdit(null);
            multimediacategory_update({
                Id: itemToEdit.Id,
                Name: e.target.name.value,
                ARW: e.target.arw.value,
                ARH: e.target.arh.value,
                MINW: e.target.minw.value,
                MINH: e.target.minh.value,
                MAXW: e.target.maxw.value,
                MAXH: e.target.maxh.value
            })
                .then(result => {
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
                <Modal show={!!itemToEdit} onHide={() => setItemToEdit(null)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => UpdateCategory(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش دسته بندی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <TextField
                                    name="name"
                                    type={"text"}
                                    label={"نام دسته بندی"}
                                    placeholder="نام دسته بندی"
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.Name}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="arw"
                                    type={"number"}
                                    placeholder="نسبت عرض"
                                    label={"نسبت عرض"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.ARW}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="arh"
                                    type={"number"}
                                    placeholder="نسبت طول"
                                    label={"نسبت طول"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.ARH}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="minw"
                                    type={"number"}
                                    placeholder="حداقل عرض"
                                    label={"حداقل عرض"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.MINW}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="minh"
                                    type={"number"}
                                    placeholder="حداقل طول"
                                    label={"حداقل طول"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.MINH}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="maxw"
                                    type={"number"}
                                    placeholder="حداکثر عرض"
                                    label={"حداکثر عرض"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.MAXW}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    name="maxh"
                                    type={"number"}
                                    placeholder="حداکثر طول"
                                    label={"حداکثر طول"}
                                    variant={"outlined"}
                                    defaultValue={itemToEdit.MAXH}
                                    fullWidth
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToEdit(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                ثبت
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function getAllCategories() {
        multimediacategory_getAll()
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
                <p>دسته بندی های مدیا </p>
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
                                <TableCell align="right">نسبت عرض</TableCell>
                                <TableCell align="right">نسبت طول</TableCell>
                                <TableCell align="right">حداقل عرض</TableCell>
                                <TableCell align="right">حداقل طول</TableCell>
                                <TableCell align="right">حداکثر عرض</TableCell>
                                <TableCell align="right">حداکثر طول</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories && categories.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row.ARW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.ARH || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MINW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MINH || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MAXW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MAXH || "نامشخص"}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"} size={"small"}
                                                color={"secondary"} onClick={() => {
                                            setItemToEdit(row)
                                        }}>ویرایش</Button>
                                        <Button variant={"contained"} size={"small"}
                                                                    color={"error"} onClick={() => {
                                        error.showError({message: "این قابلیت فعلا در دسترس نیست",})
                                    }}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {itemToEdit&&renderModalEdit()}
        </div>
    );
};

export default MediaCategoryManagement;

