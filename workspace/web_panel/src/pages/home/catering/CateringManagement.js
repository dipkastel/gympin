import React, {useContext, useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import {Button, Chip, Tooltip} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {
    getRppCateringManagement,
    SetRppCateringManagement,
} from "../../../helper/pocket/pocket";
import {Catering_add, Catering_query} from "../../../network/api/placeCatering.api";


const CateringManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppCateringManagement());
    const [caterings, SetCaterings] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    useEffect(() => {
        getCaterings()
    }, [page, rowsPerPage]);

    function getCaterings() {
        Catering_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetCaterings(data.data.Data)
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function RenderModalAdd() {
        function addCatering(e) {
            e.preventDefault()
            Catering_add({Address: "", Name: e.target.formName.value })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    history.push({
                        pathname: "/catering/data/" + data.data.Data.Id
                    });
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
                        onSubmit={(e) => addCatering(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن کترینگ"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group >
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام کترینگ"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => SetOpenModalAdd(false)}
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

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>کیترینگ ها برای ارائه خدمات غذای سازمانی می باشند</p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="مراکز"
                    toolbar={
                        <PortletHeaderToolbar>

                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => SetOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام مجموعه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>آدرس</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>اطلاعات</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {caterings.content && caterings.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "catering/data/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">{row.Name||"ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.Location?(row.Location.Name+" "+(row.Address||"")):"ثبت نشده"}</TableCell>
                                            <TableCell align="right">

                                            </TableCell>
                                            <TableCell align="left">
                                                <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(caterings.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={caterings.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                        return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppCateringManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
        </>
    );
};

export default CateringManagement;
