import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Button, IconButton} from "@mui/material";
import {Form, Modal, Table} from "react-bootstrap";
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {proficiencies_addProficiencies, proficiencies_deleteProficiencies, proficiencies_query} from "../../../network/api/proficiencies.api";
import {getRppProficienciesManagement, SetRppProficienciesManagement} from "../../../helper/pocket/pocket";

const ProficienciesManagement = () => {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppProficienciesManagement());
    const [proficiencies, SetProficiencies] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        getProficienciess()
    }, [page, rowsPerPage]);

    function getProficienciess() {
        proficiencies_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetProficiencies(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RenderModalAdd() {


        function addProficiencies(e) {
            e.preventDefault();
            if (!e.target.formName.value) {
                error.showError({message: "نام تخصص الزامی است",});
                return;
            }
            SetOpenModalAdd(false);
            proficiencies_addProficiencies({
                Name: e.target.formName.value,
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getProficienciess();
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
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>

                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addProficiencies(e)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن تخصص"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formProficienciesName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام تخصص"
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => SetOpenModalAdd(false)}
                            >
                                لغو
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

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            setItemToDelete(null)
            proficiencies_deleteProficiencies({
                Id: itemToDelete.Id,
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getProficienciess();
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف تخصص"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && ("حذف " + itemToDelete.Name)}
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

    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>
                    تخصص فقط برای پزشکان و مشاوران می باشد و مربیان و مسئولین ورزشی نمی توانند این تخصص ها را داشته باشند
                </p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="تخصص ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton aria-label="fingerprint"
                                        color={"default"}
                                        onClick={(e) => SetOpenModalAdd(true)}>
                                <AddIcon fontSize={"large"}/>
                            </IconButton>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام تخصص</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {proficiencies.content && proficiencies.content.map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Id}</TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="left">

                                            <Button
                                                variant="contained"
                                                color={"error"}
                                                onClick={(e) => setItemToDelete(row)}
                                            >
                                                حذف
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(proficiencies.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={proficiencies.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppProficienciesManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default ProficienciesManagement;
