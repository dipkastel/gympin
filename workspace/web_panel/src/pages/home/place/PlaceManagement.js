import React, {useContext, useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import {Button, Card, CardContent, CardHeader, Chip, Grid, Paper, Tab, Tabs, TextField, Tooltip} from "@mui/material";
import {PlaceGym_addPlace, PlaceGym_query} from "../../../network/api/placeGym.api";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {getRppPlaceManagement, SetRppPlaceManagement} from "../../../helper/pocket/pocket";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DangerousIcon from '@mui/icons-material/Dangerous';
import PaidIcon from '@mui/icons-material/Paid';
import ImageIcon from '@mui/icons-material/Image';
import SportsIcon from '@mui/icons-material/Sports';
import {NoteAlt, ReceiptLong} from "@mui/icons-material";


const PlaceManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppPlaceManagement());
    const [searchString, setSearchString] = useState(null);
    const [places, SetPlaces] = useState([]);
    const [selectedTab, setSelectedTab] = useState("ALL");
    const [queryType, setQueryType] = useState("SEARCH");
    const [placeStatus, SetPlaceStatus] = useState(null);
    const [deleted, SetDeleted] = useState(false);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    useEffect(() => {
        getPlaces()
    }, [page, rowsPerPage, searchString,placeStatus,deleted,queryType]);
    useEffect(() => {
        switch (selectedTab){
            case "ALL":
                setQueryType("SEARCH");
                SetPlaceStatus(null);
                SetDeleted(false);
                break;
            case "ACTIVE":
                setQueryType("FILTER");
                SetPlaceStatus("ACTIVE");
                SetDeleted(false);
                break
            case "INACTIVE":
                setQueryType("FILTER");
                SetPlaceStatus("INACTIVE");
                SetDeleted(false);
                break
            case "PREREGISTER":
                setQueryType("FILTER");
                SetPlaceStatus("PREREGISTER");
                SetDeleted(false);
                break
            case "DELETED":
                setQueryType("SEARCH");
                SetPlaceStatus(null);
                SetDeleted(true);
                break
        }
    }, [selectedTab]);

    function getPlaces() {
        PlaceGym_query({
            queryType: queryType,
            Name: searchString,
            Status:placeStatus,
            Deleted:deleted,
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetPlaces(data.data.Data)
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function RenderModalAdd() {
        function addPlace(e) {
            e.preventDefault()
            PlaceGym_addPlace({Address: "", Name: e.target.formName.value , Region: {Id: 1}})
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    history.push({
                        pathname: "/place/data/" + data.data.Data.Id
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
                                    از نوشتن حاشیه ها (مجموعه ورزشی ، باشگاه ، استادیوم) خودداری
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
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={"مراکز روی نقشه"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            نقشه مراکز تهران
                            <Button
                                variant="contained"
                                color="secondary"
                                href="place/placeOnMap"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مشاهده
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={"افزودن مجموعه"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            افرودن سریع مجموعه
                            <Button
                                variant="contained"
                                color="secondary"
                                href="place/wizard/0"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                شروع
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"standard"}
                    aria-label="full width tabs example"
                >
                    <Tab label="همه" value={"ALL"}/>
                    <Tab label="فعال" value={"ACTIVE"}/>
                    <Tab label="غیر فعال" value={"INACTIVE"}/>
                    <Tab label="پیش ثبت نام" value={"PREREGISTER"}/>
                    <Tab label="حذف شده" value={"DELETED"}/>
                </Tabs>
            </Paper>

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
                                    setPage(0);
                                    if (event.target.value===""){
                                        setSearchString(null);
                                        return;
                                    }
                                    setSearchString(event.target.value);
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>اطلاعات</TableCell>
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
                                                <Tooltip title={"ذینفع"}>
                                                    <PaidIcon color={row.HasBeneficiary?"default":(row.HasBeneficiary==="true"?"success":"error")} />
                                                </Tooltip>
                                                <Tooltip title={"تصاوبر"}>
                                                    <ImageIcon color={row.Multimedias?.[0]?"success":"error"} />
                                                </Tooltip>
                                                <Tooltip title={"ورزش ها"}>
                                                    <SportsIcon color={row.Sports?.[0]?"success":"error"} />
                                                </Tooltip>
                                                <Tooltip title={"قرارداد"}>
                                                    <NoteAlt color={row.HasContract?"success":"error"} />
                                                </Tooltip>
                                            </TableCell>
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
                            SetRppPlaceManagement(parseInt(event.target.value, 10));
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
