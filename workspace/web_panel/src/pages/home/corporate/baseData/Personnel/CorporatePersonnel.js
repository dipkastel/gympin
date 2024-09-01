import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Avatar, Button, Checkbox, FormControlLabel, TableCell, Tooltip} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
    corporate_query,
    corporatePersonnel_add,
    corporatePersonnel_addList,
    corporatePersonnel_delete
} from "../../../../../network/api/CorporatePersonnel.api";
import {useHistory} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../../../../helper";
import {ListAlt} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import {getRppCorporatePersonnel, SetRppCorporatePersonnel} from "../../../../../helper/pocket/pocket";

const CorporatePersonnel = ({currentCorporate}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [corporatePersonnels, SetCorporatePersonnels] = useState({})
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalAddList, setOpenModalAddList] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppCorporatePersonnel());

    useEffect(() => {
        getPersonnelsOfCorporate();
    }, [page,rowsPerPage,currentCorporate]);

    function getPersonnelsOfCorporate() {
        corporate_query({
            queryType: "FILTER",
            CorporateId: currentCorporate.Id,
            paging: {Page: page, Size: (rowsPerPage), Desc: true}
        }).then(data => {
            console.log(data)
            SetCorporatePersonnels(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAddList() {

        function addListFile(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append("MediaType", "*/*");
            if (e.target.file.files[0] && e.target.file.files[0].size > 0) {
                formData.append("File", e.target.file.files[0]);
            } else {
                error.showError({message: "فایل انتخاب نشده",});
                return
            }
            formData.append("HasHeader", !!e.target.HasHeader.value || false);
            formData.append("CorporateId", currentCorporate.Id);

            corporatePersonnel_addList(formData)
                .then(data => {
                    setOpenModalAddList(false);
                    error.showError({message: "عملیات موفق",});
                    getPersonnelsOfCorporate();
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
                <Modal show={openModalAddList} onHide={() => setOpenModalAddList(false)}>
                    <form onSubmit={(e) => addListFile(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن پرسنل با فایل "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <input name={"file"} type={"file"} accept={"text/csv"}/>
                            </Form.Group>

                            <Form.Group>
                                <FormControlLabel
                                    className={"mr-1"}
                                    control={<Checkbox name={"HasHeader"} color="primary"/>}
                                    label={"دارای هدر"}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAddList(false)}
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
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalAdd() {

        function addOption(e) {
            e.preventDefault()
            corporatePersonnel_add({Corporate: {Id: currentCorporate.Id}, PhoneNumber: e.target.PhoneNumber.value})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setOpenModalAdd(false)
                    getPersonnelsOfCorporate()
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addOption(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن پرسنل "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="PhoneNumber">
                                <Form.Control
                                    name="PhoneNumber"
                                    type="PhoneNumber"
                                    placeholder="09123456789"

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
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            corporatePersonnel_delete({Id: itemToDelete.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getPersonnelsOfCorporate()
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
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف پرسنل"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.User.Username}
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
                    title="پرسنل"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAddList(true)}
                            >
                                <ListAlt/>
                            </button>
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
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نام/تلفن</TableCell>
                                <TableCell align="right">دسترسی</TableCell>
                                <TableCell align="right">گروه</TableCell>
                                <TableCell align="right">اعتبار</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {corporatePersonnels.content&&corporatePersonnels.content.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar
                                        onClick={() => history.push("/users/details/" + row.User.Id)}
                                        alt={row.User.Username} src={row.User.Avatar ? row.User.Avatar.Url : ""}
                                        sx={{width: 20, height: 20}}/></TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={row.User.Username || ""} placement="left">
                                            <span>{(row.User.FullName || "")}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="right">{<>
                                        <Tooltip title={row.Role} placement="top">
                                            {(row.Role == "PERSONEL") ?
                                                <AccountCircleIcon color={"success"}/> :
                                                <AdminPanelSettingsIcon color={"error"}/>}
                                        </Tooltip></>}</TableCell>
                                    <TableCell align="right">{row.PersonnelGroup?.Name || "بدون گروه"}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.TotalCredit)}</TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"}
                                                                    color={"primary"}
                                                                    href={"/corporate/personnel/" + row.Id}>مشخصات</Button><Button
                                        variant={"contained"} size={"small"} color={"error"}
                                        onClick={(e) => setItemToDelete(row)}>حذف</Button> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {corporatePersonnels.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={corporatePersonnels.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppCorporatePersonnel(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalAddList()}
            {renderModalDelete()}
        </>
    );
};

export default CorporatePersonnel;
