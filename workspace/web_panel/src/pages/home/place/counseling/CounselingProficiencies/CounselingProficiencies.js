import React, {useContext, useEffect, useState} from "react";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Button, TableCell} from "@mui/material";
import {Form, Modal, Table} from "react-bootstrap";
import Select from "react-select";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    counselingProficiencies_add,
    counselingProficiencies_delete,
    counselingProficiencies_getCounselingProficiencies
} from "../../../../../network/api/counselingProficiencies.api";
import {proficiencies_query} from "../../../../../network/api/proficiencies.api";

const CounselingProficiencies = ({counseling}) => {
    const error = useContext(ErrorContext);
    const [counselingProficiencies, setCounselingProficiencies] = useState([])
    const [proficiencies, setProficiencies] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        getCounselingProficiencies()
    }, []);

    function getCounselingProficiencies() {
        counselingProficiencies_getCounselingProficiencies({Id: counseling.Id})
            .then((data) => {
                setCounselingProficiencies(data.data.Data)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    useEffect(() => {
        proficiencies_query({
            queryType: "SEARCH",
            paging: {Page: 0, Size: 150, Desc: true}
        })
            .then((data) => {
                setProficiencies(data.data.Data.content)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function renderModalDelete() {
        function deleteProficiencies() {
            counselingProficiencies_delete({Id: itemToDelete.Id}).then(data => {
                error.showError({message: "عملیات موفق",});
                setItemToDelete(null)
                getCounselingProficiencies()
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
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {itemToDelete && itemToDelete?.Proficiencies?.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            className={"button_edit"}
                            onClick={() => setItemToDelete(null)}
                        >
                            خیر
                        </Button>
                        <Button
                            className={"button_danger"}
                            onClick={(e) => deleteProficiencies()}
                        >
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    function renderModalAdd() {
        var selectedId = 0;

        function getProficienciessOptions() {
            return proficiencies.map(o => {
                return {label: o.Name, value: o.Id}
            })
        }

        function addCounselingProficiencies() {
            counselingProficiencies_add({Counseling: {Id: counseling.Id}, Proficiencies: {Id: selectedId}})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    selectedId = 0;
                    setOpenModalAdd(false)
                    getCounselingProficiencies()
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
                    <Modal.Header closeButton>
                        <Modal.Title>{"افزودن تخصص به مشاور " + counseling.Name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group controlId="formAddProficiencies">
                            <Form.Label>تخصص مورد نظر را انتخاب کنید</Form.Label>
                            <Select
                                className={"dropdown"}
                                inputId="react-select-single"
                                name="formState"
                                options={getProficienciessOptions()}
                                onChange={(e) => {
                                    selectedId = e.value
                                }}
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
                            onClick={(e) => addCounselingProficiencies()}
                        >
                            اضافه
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (

        <>
            <Portlet>
                <PortletHeader
                    title="تخصص ها"
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
                                <TableCell align="right">name</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {counselingProficiencies.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row?.Id}</TableCell>
                                    <TableCell align="right">{row?.Proficiencies?.Name}</TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"} color={"error"}
                                                                    onClick={(e) => setItemToDelete(row)}>حذف</Button> </TableCell>
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

export default CounselingProficiencies;
