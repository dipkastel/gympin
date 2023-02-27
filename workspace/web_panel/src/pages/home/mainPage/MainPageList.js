import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {homepage_add, homepage_delete, homepage_getAll, homepage_query} from "../../../network/api/homepage.api";
import {Button, TableCell} from "@mui/material";
import {useHistory} from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Form, Modal} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import TablePagination from "@mui/material/TablePagination";

const MainPageList = () => {
    const error = useContext(ErrorContext);

    const [list, SetList] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useHistory();


    useEffect(function () {
        getListPages()
    }, [page, rowsPerPage])
    function getListPages(){
        homepage_query({
            queryType: "SEARCH",
            ParentId:1,
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetList(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RenderModalAdd() {
        function addPlace(e) {
            e.preventDefault()
            homepage_add({Title:e.target.PageName.value,Description:e.target.pageDescription.value,Parent:{Id:1}})
                .then((data) => {
                    history.push({
                        pathname: "/homePage/edit/"+data.data.Data.Id
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
                        onSubmit={(e) => addPlace(e)} >
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن صفحه جدید "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="FormName">
                                <Form.Control
                                    name="PageName"
                                    type="Text"
                                    placeholder="نام صفحه"

                                />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>توضیح :</Form.Label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="pageDescription"
                                    placeholder={"یک توضیح کامل برای صفحه ای که می سازید وارد نمایید تا دیگران بعد از گذشت زمان متوجه شوند.<br/>مثلا برای کدام اپلیکیشن و برای چه کمپینی یا مناسبتی این صفحه ساخته شده."}
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

    function RenderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            homepage_delete({Id:itemToDelete.Id}).then((data) => {
                error.showError({message: "حذف موفق",});
                setItemToDelete(null);
                getListPages();
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
                <Modal show={!(!itemToDelete)} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف صفحه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Title}
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
            <Portlet>
                <PortletHeader
                    title="صفحه ها"
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

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">نام صفحه</TableCell>
                                <TableCell align="right">توضیح</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.content && list.content.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Title}</TableCell>
                                    <TableCell align="right">{row.Description}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"primary"}
                                                href={"/homePage/edit/" + row.Id}>جزئیات</Button>
                                        {(row.Id!=2)&&<Button variant={"contained"}
                                                size={"small"}
                                                color={"error"}
                                                onClick={e=>setItemToDelete(row)}>حذف</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {(list.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={list.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
            {RenderModalDelete()}
        </>
    );
};

export default MainPageList;
