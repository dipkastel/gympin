import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {
    affiliate_add,
    affiliate_AddCorporatesToAffiliator,
    affiliate_getCorporatesByAffiliatorId
} from "../../../../network/api/affiliate.api";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getCorporateFixedName} from "../../../../helper";
import {Button, CircularProgress} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import __SelectUser from "../../gifts/partial/__SelectUser";
import __SelectCorporate from "../../gifts/partial/__SelectCorporate";

const AffiliateCorporates = ({affiliateId}) => {

    const error = useContext(ErrorContext);

    const [corporateList, setCorporateList] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedCorporateId, setSelectedCorporateId] = useState(false);

    useEffect(() => {
        getCorporates();
    }, [affiliateId]);


    function getCorporates() {
        affiliate_getCorporatesByAffiliatorId({id: affiliateId}).then((result) => {
            setCorporateList(result.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }


    function RenderModalAdd() {
        function addAffiliator(e) {
            e.preventDefault()
            affiliate_AddCorporatesToAffiliator({
                Id: affiliateId,
                Corporate: {Id: selectedCorporateId},
            }).then((data) => {
                getCorporates();
                setOpenModalAdd(false);
                setSelectedCorporateId(null);
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
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addAffiliator(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن سازمان به همکار فروش"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <__SelectCorporate onChange={(e) => {
                                setSelectedCorporateId(e.value)
                            }}/>
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
                    </Form>
                </Modal>
            </>
        );
    }


    return (
        <>

            <Portlet>
                <PortletHeader
                    title="سازمان ها"
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
                    {corporateList ?
                        <TableContainer>
                            <Table
                                aria-labelledby="tableTitle"
                                size="medium"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                        <TableCell align="right" padding="normal" sortDirection={false}>نام سازمان</TableCell>
                                        <TableCell align="left" padding="normal" sortDirection={false}>action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {corporateList.map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>

                                                <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                           align="right">{row.Id}</TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                           align="right">{getCorporateFixedName(row)}</TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                           align="left"><Button color={"error"} variant={"contained"}>حذف</Button></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer> : <CircularProgress/>}
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
        </>
    );
};

export default AffiliateCorporates;
