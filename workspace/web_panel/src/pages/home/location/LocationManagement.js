import React, {useContext, useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import {useHistory, useParams} from "react-router-dom";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, Chip, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {Location_add, Location_addCity, Location_getById, Location_query} from "../../../network/api/location.api";
import {Place_addPlace} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

export default function LocationManagement() {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const {parentId} = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchString, setSearchString] = useState("");
    const [location, SetLocation] = useState([]);
    const [parent, SetParent] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [refreshId, SetRefreshId] = useState(0);


    useEffect(() => {
        SetLocation([])
        var data = {
            queryType:"FILTER",
            Type:parentId?null:"COUNTRY",
            parentId:parentId||null,
            Name:searchString,
            paging:{Page:page,Size:rowsPerPage,orderBy:"Id",Desc:true}
        }
        Location_query(data).then(result=>{
            SetLocation(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [parentId,searchString,rowsPerPage,page,refreshId]);

    useEffect(() => {
        SetParent([]);
        Location_getById({id:parentId}).then(result=>{
            SetParent(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [parentId,refreshId]);

    function getTypeName(type){
        switch(type){
            case null:return "کشور";
            case "STATE":return "شهر";
            case "CITY":return "محله";
            case "COUNTRY":return "استان";
            default:return "کشور ها";
        }
    }

    function renderModalAdd() {
        function addLocation(e) {
            e.preventDefault()
            Location_add({
                Name:e.target.formName.value,
                Type: getChildTypeByParent(parent.Type),
                parent: {
                    Id: parent.Id
                }}).then(result=>{
                SetOpenModalAdd(false);
                SetRefreshId(Math.random())
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        function getChildTypeByParent(parentType){
            switch (parentType){
                case "COUNTRY":return  "STATE";
                case "STATE":return "CITY";
                case "CITY":return "REGION";
                default:return null;
            }
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addLocation(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن "+getTypeName(parent.Type) + " به "+parent.Name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام"
                                />
                                <Form.Text className="text-muted">
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
        <p>مدیریت مناطق در این قسمت انجام میشود</p>
        <p>برای وارد کزدن منطقه باید شهر آن وارد شده باشد</p>
        <p>برای وارد کردن شهر باید استان آن وارد شده باشد</p>
      </Notice>


        <Portlet>
            <PortletHeader
                title={getTypeName(parent.Type)+((parent.Name)?" های ":"")+(parent.Name||"")}
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
                        {parent.Type&&<button
                            type="button"
                            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                            onClick={(e) => SetOpenModalAdd(true)}
                        >
                            <AddIcon/>
                        </button>}
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
                                <TableCell align="right" padding="normal" sortDirection={false}>نام</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {location.content && location.content.map((row, index) => (
                                <TableRow hover onClick={(event) => {
                                    if(row.Type!="REGION")history.push({pathname: "/locations/" + row.Id});
                                }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                    <TableCell component="th" scope="row" padding="normal" align="right">{row.Id}</TableCell>
                                    <TableCell component="th" align="right">{row.Name}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {(location.totalElements>0) &&<TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                    component="div"
                    sx={{direction: "rtl"}}
                    count={location.totalElements||0}
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
        {renderModalAdd()}
    </>
  );
}
