import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, TableCell, TextField, Tooltip} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    corporatePersonnel_addPersonnelCredit,
    corporatePersonnel_getById
} from "../../../../../network/api/CorporatePersonnel.api";

const PersonnelCredit = ({corporatePersonnel, getPerson}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [credits, setCredits] = useState(null)
    useEffect(() => {
        getTransactions();
    }, []);

    function getTransactions() {
        corporatePersonnel_getById({id: corporatePersonnel.Id}).then(result => {
            setCredits(result.data.Data.CreditList);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: corporatePersonnel.Id},
                CreditAmount: toPriceWithoutComma(e.target.creditToAdd.value)
            })
                .then(result => {
                    getTransactions();
                    getPerson();
                    error.showError({message: "با موفقیت انجام شد",});
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
                            <Modal.Title>{corporatePersonnel.User ? ("افزودن اعتبار به " + (corporatePersonnel.User.FullName || corporatePersonnel.User.Username) + " از مجموعه " + corporatePersonnel.Corporate.Name) : ""}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="creditToAdd"
                                type="text"
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                label={"مبلغ دلخواه به تومان"}
                            />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
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
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={corporatePersonnel.Corporate && ("اعتبار های " + corporatePersonnel.Corporate.Name)}
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
                                <TableCell align="right">اعتبار</TableCell>
                                <TableCell align="right">تاریخ</TableCell>
                                <TableCell align="right">اعتبار توسط</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {credits && credits.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.CreditAmount)}</TableCell>
                                    <TableCell align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={row?.CreatorUser?.Username || ""} placement="left">
                                            <span>{(row?.CreatorUser?.FullName || row?.CreatorUser?.Username)}</span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default PersonnelCredit;
