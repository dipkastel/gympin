import React, {useContext, useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import {Avatar, Button, Card, CardContent, CardHeader, Chip, Grid, TextField} from "@mui/material";
import {corporate_add, corporate_query} from "../../../network/api/corporate.api";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../../helper";
import {getRppCorporateManagement, SetRppCorporateManagement} from "../../../helper/pocket/pocket";


const CorporateManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppCorporateManagement());
    const [searchString, setSearchString] = useState("");
    const [corporates, SetCorporates] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    useEffect(() => {
        getCorporates()
    }, [page, rowsPerPage, searchString]);

    function getCorporates() {
        corporate_query({
            queryType: "SEARCH",
            name: searchString,
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetCorporates(data.data.Data)
        });
    }

    function RenderModalAdd() {
        function addCorporate(e) {
            e.preventDefault()
            corporate_add({Address: "", Name: e.target.formName.value , Region: {Id: 1}})
                .then((data) => {
                    history.push({
                        pathname: "/corporate/details/" + data.data.Data.Id
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
                        onSubmit={(e) => addCorporate(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن شرکت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formCorporateName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام مکان (شرکت)"
                                />
                                <Form.Text className="text-muted">
                                    از نوشتن هاشیه ها (مجموعه ، شرکت ، سازمان ، ارگان) خودداری
                                    کنید
                                </Form.Text>
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
                <p>موجودیت شرکت به معنای طرف قرارداد جیم پین برای پرداخت هزینه ورزش کاربران تحت پوشش میباشد</p>
            </Notice>


            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"سازمان ها روی نقشه"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            نقشه سازمان ها
                            <Button
                                variant="contained"
                                color="secondary"
                                href="corporate/corporateOnMap"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مشاهده
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Portlet>
                <PortletHeader
                    title="شرکت ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <TextField
                                fullWidth
                                id="outlined-adornment-password"
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={searchString}
                                onChange={(event) => {
                                    setSearchString(event.target.value);
                                    setPage(0);
                                }}
                                label={"جستجو"}
                            />
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
                                    <TableCell align="right" padding="normal" sortDirection={false}></TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام شرکت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>شارژ شرکت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>اعتبار پرسنل</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع قرارداد</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تعداد پرسنل</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {corporates.content && corporates.content.map((row, index) => {
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "corporate/details/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">
                                                <Avatar alt="corporate Logo" src={row?.Logo?.Url||""}  sx={{width:40,height:40}} /></TableCell>
                                            <TableCell align="right">{row.Name||"ثبت نشده"}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row?.FinanceCorporate?.TotalDeposit)}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row?.FinanceCorporate?.TotalCredits)}</TableCell>
                                            <TableCell align="right">{row.ContractType}</TableCell>
                                            <TableCell align="right">{row.PersonnelCount}</TableCell>
                                            <TableCell align="right">
                                                <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(corporates.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={corporates.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppCorporateManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
        </>
    );
};


export default CorporateManagement;
