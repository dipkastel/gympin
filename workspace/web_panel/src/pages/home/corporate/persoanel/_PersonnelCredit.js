import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, IconButton, Slider, TableCell, TextField, Tooltip, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {
    corporatePersonnel_addPersonnelCredit,
    corporatePersonnel_decreaseCredit,
    corporatePersonnel_getById,
    corporatePersonnel_manualExpireCredit
} from "../../../../network/api/CorporatePersonnel.api";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalali';
import {DatePicker} from "@mui/x-date-pickers";
import {FeaturedPlayList, GppBad, Stairs, SupervisorAccount} from "@mui/icons-material";
import {TransactionStatus} from "../../../../helper/enums/TransactionStatus";
import warning from "react-redux/lib/utils/warning";
import {TransactionPersonnelCredit_query} from "../../../../network/api/TransactionPersonnelCredit.api";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const _PersonnelCredit = ({corporatePersonnel, getPerson}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [expireDate, setExpireDate] = useState(null);
    const [credits, setCredits] = useState(null)
    const [creditToExpire, setCreditToExpire] = useState(null)
    const [creditToDecrease, setCreditToDecrease] = useState(null)
    const [creditToTransactions, setCreditToTransactions] = useState(null)
    const [creditTransactions, setCreditTransactions] = useState(null)
    useEffect(() => {
        getPersonnelCredits();
    }, []);
    useEffect(() => {
        if(creditToTransactions)
            getCreditTransactions();
    }, [creditToTransactions]);

    function getCreditTransactions() {

        TransactionPersonnelCredit_query({
            queryType: "FILTER",
            CreditId:creditToTransactions.Id,
            paging: {Page: 0, Size: 100, Desc: true}
        }).then(result => {
            setCreditTransactions(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getPersonnelCredits() {
        setExpireDefaultDate();
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

    function setExpireDefaultDate() {

        if (corporatePersonnel.Corporate.ContractType === "ALPHA")
            setExpireDate(corporatePersonnel.Corporate.ContractExpireDate);
        else {
            var date = new Date()
            date.setDate(date.getDate() + corporatePersonnel.Corporate.DefaultExpireDuration);
            setExpireDate(date);
        }
    }

    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            setOpenModalAdd(false);

            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: corporatePersonnel.Id},
                ExpireDate: expireDate,
                CreditAmount: toPriceWithoutComma(e.target.creditToAdd.value)
            })
                .then(result => {
                    getPersonnelCredits();
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


                            <div className="form-group">
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
                            </div>

                            {corporatePersonnel.Corporate.ContractType != "ALPHA" &&
                            <div className="form-group">
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFnsJalali}>
                                    <DatePicker
                                        className="w-100"
                                        label="تاریخ انقضا"
                                        name="ExpireDate"
                                        value={expireDate}
                                        onChange={e => setExpireDate(e)}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            }
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

    function renderModalExpire() {
        function expire(e) {
            e.preventDefault()
            setOpenModalAdd(false);

            corporatePersonnel_manualExpireCredit({
                Id: creditToExpire.Id,
            })
                .then(result => {
                    getPersonnelCredits();
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
                <Modal show={!!creditToExpire} onHide={() => setCreditToExpire(null)}>
                    <form onSubmit={(e) => expire(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"انقضای اعتبار "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Typography variant={"h6"} >{"شما در حال منقضی کردن مبلغ "+toPriceWithComma(creditToExpire?.CreditAmount)+" اعتبار داده شده به "+getUserFixedName(creditToExpire?.CorporatePersonnel?.User)+" می باشید."}</Typography>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setCreditToExpire(null)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                تایید
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );

    }

    function renderModalDecrease() {
        function decrease(e) {
            e.preventDefault()
            setCreditToDecrease(null);

            corporatePersonnel_decreaseCredit({
                Id: creditToDecrease.Id,
                CreditAmount: toPriceWithoutComma(e.target.DecreaseValue.value)
            })
                .then(result => {
                    getPersonnelCredits();
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
                <Modal show={!!creditToDecrease} onHide={() => setCreditToDecrease(null)}>
                    <form onSubmit={(e) => decrease(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"کاهش اعتبار "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Slider
                                valueLabelDisplay={"on"}
                                step={10000}
                                name={"DecreaseValue"}
                                min={0}
                                max={creditToDecrease?.CreditAmount}
                                color={"secondary"}
                                valueLabelFormat={(value)=>toPriceWithComma(value)+ " تومان"}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setCreditToDecrease(null)}
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

    function renderModalTransactions() {

        return (
            <>
                <Modal show={!!creditToTransactions} onHide={() => setCreditToTransactions(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"تراکنش های اعتبار"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table
                                aria-labelledby="tableTitle"
                                size="medium"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" padding="normal" sortDirection={false}>تاریخ</TableCell>
                                        <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                        <TableCell align="right" padding="normal" sortDirection={false}>وضعیت تراکنش</TableCell>
                                        <TableCell align="left" padding="normal" sortDirection={false}>جزئیات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {creditTransactions?.content && creditTransactions?.content?.map((row, index) => (
                                            <TableRow hover role="checkbox" sx={{backgroundColor:(row.Amount>0)?"#d3fcef":"#f5d2d2"}} key={row.Id.toString()}>
                                                <TableCell component="th" padding="normal" align="right">
                                                    {new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </TableCell>
                                                <TableCell component="th" padding="normal" align="right">
                                                    {toPriceWithComma(row.Amount)}
                                                </TableCell>
                                                <TableCell component="th" padding="normal" align="right">
                                                    {TransactionStatus[row.TransactionStatus]}
                                                </TableCell>
                                                <TableCell component="th" padding="normal" align="left">

                                                    {row.Serial&&<Tooltip title={row.Serial?.Serial} placement="top">
                                                        <QrCodeIcon color={"success"}/>
                                                    </Tooltip>}
                                                    {row.Place&&<Tooltip title={row.Place?.Name} placement="top">
                                                        <ApartmentIcon color={"success"}/>
                                                    </Tooltip>}
                                                    {row.Purchased&&<Tooltip title={row.Purchased?.Name} placement="top">
                                                        <ConfirmationNumberIcon color={"success"}/>
                                                    </Tooltip>}
                                                    {row.CreatorUser&&<Tooltip title={getUserFixedName(row.CreatorUser)} placement="top">
                                                        <SupervisorAccount color={"success"}/>
                                                    </Tooltip>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Modal.Body>
                </Modal>

            </>
        );

    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={corporatePersonnel.Corporate && ("اعتبار های " + corporatePersonnel?.Corporate?.Name)}
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
                                <TableCell align="right">تاریخ ثبت</TableCell>
                                <TableCell align="right">انقضا</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                                <TableCell align="right">اعتبار توسط</TableCell>
                                <TableCell align="right"></TableCell>
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
                                    <TableCell align="right">{new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                    <TableCell align="right">
                                        {row?.Status}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={row?.CreatorUser?.Username || ""} placement="left">
                                            <span>{(row?.CreatorUser?.FullName || row?.CreatorUser?.Username)}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.CreditAmount>0&&<Tooltip title={"کاهش اعتبار"} placement="top">
                                            <IconButton
                                                color={"warning"}
                                                onClick={() => setCreditToDecrease(row)}>
                                                <Stairs />
                                            </IconButton>
                                        </Tooltip>}
                                        {row.CreditAmount>0&&<Tooltip title={"انقضای اعتبار"} placement="top">
                                            <IconButton
                                                color={"error"}
                                                onClick={() => setCreditToExpire(row)}>
                                                <GppBad />
                                            </IconButton>
                                        </Tooltip>}
                                        <Tooltip title={"تراکنش ها"} placement="top">
                                            <IconButton
                                                color={"info"}
                                                onClick={() => setCreditToTransactions(row)}>
                                                <FeaturedPlayList />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalExpire()}
            {renderModalDecrease()}
            {renderModalTransactions()}
        </>
    );
};

export default _PersonnelCredit;
