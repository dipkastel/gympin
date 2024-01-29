import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Avatar, Button, TableCell, Tooltip} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {placePersonnel_add, placePersonnel_ByPlace, placePersonnel_delete} from "../../../../../network/api/placePersonnel.api";
import {useHistory} from "react-router-dom";
import {PlacePersonnelRole} from "../../../../../helper/enums/PlacePersonnelRole";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import PriceChangeIcon from '@mui/icons-material/PriceChange';

const PlacePersonnel = ({place}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [placePersonnels,SetPlacePersonnels] = useState([])
    const [openModalAdd,setOpenModalAdd] = useState(false)
    const [itemToDelete,setItemToDelete] = useState(null)
    useEffect(() => {
        getPersonnelsOfPlace();
    }, []);
    function getPersonnelsOfPlace(){
        placePersonnel_ByPlace({Id:place.Id}).then(data=>{
            SetPlacePersonnels(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {

        function addPerson(e) {
            e.preventDefault()
            placePersonnel_add({Place:{Id:place.Id},PhoneNumber:e.target.PhoneNumber.value})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setOpenModalAdd(false)
                    getPersonnelsOfPlace()
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
                    <form onSubmit={(e)=>addPerson(e)}>


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
            placePersonnel_delete({Id:itemToDelete.Id})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getPersonnelsOfPlace()
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
                            <Modal.Title>{"حذف پرسنل"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete&&"حذف "+itemToDelete.User.Username}
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
                                onClick={(e) =>setOpenModalAdd(true)}
                            >
                                <AddIcon />
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
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">نقش</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placePersonnels.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar
                                        onClick={() => history.push("/users/details/" + row.User.Id)}
                                        alt={row.User.Username} src={row.User.Avatar ? row.User.Avatar.Url : ""}
                                        sx={{width: 20, height: 20}}/></TableCell>
                                    <TableCell align="right">{row?.User?.Username+(row?.User?.FullName?("-"+row?.User?.FullName):"")}</TableCell>
                                    <TableCell align="right">{PlacePersonnelRole[row.UserRole]}</TableCell>
                                    <TableCell align="right">
                                        {(row.IsBeneficiary)&&
                                        <Tooltip title={row.CommissionFee || 0} placement="left">
                                            <PriceChangeIcon color={"secondary"}/>
                                        </Tooltip>}
                                    </TableCell>
                                    <TableCell align="left">

                                        <Button variant={"contained"} size={"small"} color={"primary"} href={"/place/personnel/"+row.Id }>جزئیات</Button>
                                        <Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default PlacePersonnel;
