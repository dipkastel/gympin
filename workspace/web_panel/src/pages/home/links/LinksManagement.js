import React, {useContext, useEffect, useState} from "react";
import Notice from "../../partials/content/Notice";
import {useHistory, useParams} from "react-router-dom";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, FormControlLabel, FormGroup, IconButton, Switch, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {
    getRppLinkManagement,
    SetRppLinkManagement
} from "../../../helper/pocket/pocket";
import {Link_add, Link_query} from "../../../network/api/link.api";
import {Edit, InsertLink, Link} from "@mui/icons-material";

export default function LinksManagement() {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const {parentId} = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppLinkManagement());
    const [searchString, setSearchString] = useState("");
    const [links, SetLinks] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);


    useEffect(() => {
        getLinks();
    }, [parentId,searchString,rowsPerPage,page]);

    function getLinks(){
        SetLinks(null)
        var data = {
            queryType:"FILTER",
            Name:searchString,
            paging:{Page:page,Size:rowsPerPage,orderBy:"Id",Desc:true}
        }
        Link_query(data).then(result=>{
            SetLinks(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {
        function addLink(e) {
            e.preventDefault()
            Link_add({
                Name:e.target.formName.value,
                Code:e.target.formCode.value,
                Url:e.target.formUrl.value,
                Value1:e.target.formValue1.value,
                Value2:e.target.formValue2.value,
                Value3:e.target.formValue3.value,
                IsActive:e.target.formIsActive.checked,
            }).then(result=>{
                getLinks();
                SetOpenModalAdd(false);
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
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addLink(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن کد  "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formCode">
                                <Form.Control
                                    name="formCode"
                                    type="text"
                                    placeholder="کد"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formUrl">
                                <Form.Control
                                    name="formUrl"
                                    type="text"
                                    placeholder="آدرس"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formValue1">
                                <Form.Control
                                    name="formValue1"
                                    type="text"
                                    placeholder="مقدار1"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formValue2">
                                <Form.Control
                                    name="formValue2"
                                    type="text"
                                    placeholder="مقدار2"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formValue3">
                                <Form.Control
                                    name="formValue3"
                                    type="text"
                                    placeholder="مقدار3"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <FormGroup>
                                <FormControlLabel
                                    name="formIsActive"
                                    control={<Switch/>}
                                    label="فعال"
                                />
                            </FormGroup>
                            <Form.Group controlId="formDescription">
                                <Form.Control
                                    as="textarea"
                                    name="formDescription"
                                    rows={3}
                                    placeholder="توضیحات"
                                />
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

    function copyToClipboard(item) {
        navigator.clipboard.writeText("https://gympin.ir/r/"+item.Code);
        error.showError({message: "کپی شد",});
    }

    return (
    <>
      <Notice icon="flaticon-warning kt-font-primary">
        <p>مدیریت لینک ها</p>
      </Notice>
        <Portlet>
            <PortletHeader
                title={"لینک های جیم پین"}
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
                                <TableCell align="right" padding="normal" sortDirection={false}>نام</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>کد</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>آدرس</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>مقدار1</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>مقدار2</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>مقدار3</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>فعال</TableCell>
                                <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {links?.content && links?.content?.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                    <TableCell component="th" scope="row" padding="normal" align="right">{row.Id}</TableCell>
                                    <TableCell component="th" align="right">{row.Name}</TableCell>
                                    <TableCell component="th" align="right">
                                        {row.Code}
                                    </TableCell>
                                    <TableCell component="th" align="right">{row.Url}</TableCell>
                                    <TableCell component="th" align="right">{row.Value1}</TableCell>
                                    <TableCell component="th" align="right">{row.Value2}</TableCell>
                                    <TableCell component="th" align="right">{row.Value3}</TableCell>
                                    <TableCell component="th" align="right"><Switch checked={row.IsActive}/></TableCell>
                                    <TableCell component="th" align="left">
                                        <IconButton size={"small"} color={"success"} onClick={()=>copyToClipboard(row)}><InsertLink/></IconButton>
                                        <IconButton size={"small"} color={"primary"}><Edit/></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {(links?.totalElements>0) &&<TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                    component="div"
                    sx={{direction: "rtl"}}
                    count={links?.totalElements||0}
                    labelRowsPerPage={"تعداد نمایش"}
                    labelDisplayedRows={(param)=>{
                        return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                    }}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        SetRppLinkManagement(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />}
            </PortletBody>
        </Portlet>
        {renderModalAdd()}
    </>
  );
}
