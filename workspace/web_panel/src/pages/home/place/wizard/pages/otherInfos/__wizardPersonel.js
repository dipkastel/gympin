import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import {Form, Modal} from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import {useParams} from "react-router-dom";
import {placePersonnel_add, placePersonnel_ByPlace, placePersonnel_delete} from "../../../../../../network/api/placePersonnel.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {PlacePersonnelRole} from "../../../../../../helper/enums/PlacePersonnelRole";

const __wizardSports = ({setAllowNextPersonel}) => {

    let {placeId} = useParams();
    const error = useContext(ErrorContext);
    const [openModalAdd,setOpenModalAdd]= useState(false);
    const [placePersonnels,SetPlacePersonnels] = useState([])


    useEffect(() => {
        getPersonnelsOfPlace();
    }, []);

    function getPersonnelsOfPlace(){
        placePersonnel_ByPlace({Id:placeId}).then(data=>{
            SetPlacePersonnels(data.data.Data);
            setAllowNextPersonel(data.data.Data.length>0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function DeleteItem(e,itemToDelete) {
        e.preventDefault()
        placePersonnel_delete({Id:itemToDelete.Id})
            .then(data=>{
                error.showError({message: "عملیات موفق",});
                getPersonnelsOfPlace()
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
            setOpenModalAdd(false)
            placePersonnel_add({Place:{Id:placeId},PhoneNumber:e.target.PhoneNumber.value})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
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

    return (
        <div className={"col-md-6"}>
            <Portlet>
                <PortletHeader
                    title="کارمندان"
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
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">نقش</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placePersonnels.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar
                                        alt={row.User.Username} src={row.User.Avatar ? row.User.Avatar.Url : ""}
                                        sx={{width: 20, height: 20}}/></TableCell>
                                    <TableCell align="right">{row.User.FullName||""}-{row.User.Username}</TableCell>
                                    <TableCell align="right">{PlacePersonnelRole[row.UserRole]}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>DeleteItem(e,row)}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </div>
    );
};

export default __wizardSports;
