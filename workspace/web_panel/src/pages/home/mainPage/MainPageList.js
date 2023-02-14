import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {homepage_add, homepage_getAll} from "../../../network/api/homepage.api";
import {Button, TableCell} from "@mui/material";
import {useHistory} from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Form, Modal} from "react-bootstrap";

const MainPageList = () => {

    const [list, SetList] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const history = useHistory();


    useEffect(function () {
        homepage_getAll().then((data) => {
            SetList(data.data.Data)
            console.log(data.data)
        }).catch(e => console.log(e))
    }, [])

    function RenderModalAdd() {
        function addPlace(e) {
            e.preventDefault()
            homepage_add({Title:e.target.PageName.value,Description:e.target.pageDescription.value})
                .then((data) => {
                    history.push({
                        pathname: "/homePageEdit/"+data.data.Data.Id
                    });
                })
                .catch((e) => console.log(e));
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
                            {list.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Title}</TableCell>
                                    <TableCell align="right">{row.Description}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"primary"}
                                                href={"/homePage/edit/" + row.Id}>جزئیات</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
        </>
    );
};

export default MainPageList;
