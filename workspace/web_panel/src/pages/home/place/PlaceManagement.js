import React, {useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import {Button, Card, CardContent, CardHeader, Chip, Grid, TextField} from "@mui/material";
import {Place_addPlace, Place_query} from "../../../network/api/place.api";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useHistory} from "react-router-dom";


const PlaceManagement = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchString, setSearchString] = useState("");
    const [places, SetPlaces] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    useEffect(() => {
        getPlaces()
    }, [page, rowsPerPage, searchString]);

    function getPlaces() {
        Place_query({
            queryType: "SEARCH",
            name: searchString,
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetPlaces(data.data.Data)
        });
    }

    function RenderModalAdd() {
        function addPlace(e) {
            e.preventDefault()
            Place_addPlace({Address: "", Name: e.target.formName.value , Region: {Id: 1}})
                .then((data) => {
                    history.push({
                        pathname: "/place/data/" + data.data.Data.Id
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
                        onSubmit={(e) => addPlace(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن مرکز ورزشی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام مکان (مجموعه ورزشی)"
                                />
                                <Form.Text className="text-muted">
                                    از نوشتن هاشیه ها (مجموعه ورزشی ، باشگاه ، استادیوم) خودداری
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
                <p>موجودیت مرکز ورزشی به معنای محلی است که در آن ورزش انجام میشود</p>
                <p>
                    این مراکز میتواند سر پوشیده یا باز باشد و نوع فعالیت های آنها در
                    قسمت ورزش ها تایین میشود
                </p>
            </Notice>

            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={"مدیریت امکانات مراکز"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت امکانات مراکز
                            <Button
                                variant="contained"
                                color="secondary"
                                href="place/placeOptionManagement"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مدیریت
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Portlet>
                <PortletHeader
                    title="مراکز"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام مجموعه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>آدرس</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {places.content && places.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "place/data/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">{row.Name||"ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.Location?(row.Location.Name+" "+(row.Address||"")):"ثبت نشده"}</TableCell>
                                            <TableCell align="right">
                                                <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(places.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={places.totalElements||0}
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
        </>
    );
};

export default PlaceManagement;
