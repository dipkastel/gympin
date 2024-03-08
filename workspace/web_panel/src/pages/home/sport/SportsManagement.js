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
import {sport_addSport, sport_deleteSport, sport_query} from "../../../network/api/sport.api";
import {getRppSportsManagement, SetRppSportsManagement} from "../../../helper/pocket/pocket";

const SportsManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSportsManagement());
    const [sports, SetSports] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        getSports()
    }, [page, rowsPerPage]);

    function getSports() {
        sport_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetSports(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RenderModalAdd() {


        function addSport(e) {
            e.preventDefault();
            if (!e.target.formName.value) {
                error.showError({message: "نام ورزش الزامی است",});
                return;
            }
            SetOpenModalAdd(false);
            sport_addSport({
                Name: e.target.formName.value,
                PictureIds: [],
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getSports();
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
                        onSubmit={(e) => addSport(e)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن ورزش"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formSportName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام ورزش (فعالیت فیزیکی)"
                                />
                                <Form.Text className="text-muted">
                                    از نوشتن هاشیه ها (ورزش،...) خودداری کنید
                                </Form.Text>
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
            sport_deleteSport({
                Id: itemToDelete.Id,
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getSports();
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
                            <Modal.Title>{"حذف ورزش"}</Modal.Title>
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
                    موجودیت ورزش به معنای فعالیت بدنی است که موجب سلامت و تن درستی است
                </p>
                <p>
                    این ورزش ها میتواند نیازمند یا بی نیاز از وسایل ویا مکان ورزشی باشد
                </p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="ورزش ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام ورزش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تصویر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sports.content && sports.content.map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Id}</TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right">{(row.LogoIds.length) ? "has image" : ""}</TableCell>
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
                    {(sports.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={sports.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppSportsManagement(parseInt(event.target.value, 10));
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

export default SportsManagement;
