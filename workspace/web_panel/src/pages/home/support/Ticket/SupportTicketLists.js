import React, {useContext, useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Button, Chip, IconButton, TextField} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {getRppSupport, SetRppSupport} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Support_delete, Support_query} from "../../../../network/api/support.api";
import {Delete} from "@mui/icons-material";
import {Form, Modal} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {getUserFixedName} from "../../../../helper";
import PopoverUser from "../../../../components/popover/PopoverUser";

const SupportTicketLists = () => {


    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSupport());
    const [itemCount, setItemCount] = useState(0);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [searchString, setSearchString] = useState(null);
    const [SupportList, setSupportList] = useState([]);
    const history = useHistory();
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

    useEffect(() => {
        getSupports();
    }, [searchString, page, rowsPerPage]);

    function getSupports() {
        setSupportList([]);
        Support_query({
            queryType: "SEARCH",
            Message: searchString?.trim()||null,
            Title: searchString?.trim()||null,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        })
            .then((data) => {
                setSupportList(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }


    function RenderModalDelete() {
        function deleteSupport(e) {
            e.preventDefault()
            Support_delete({Id: itemToDelete.Id})
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null);
                    getSupports();
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
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => deleteSupport(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف پشتیبانی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {"حذف پشتیبانی " + itemToDelete?.Title}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
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
                    title="تیکت ها"
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
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">مربوط به</TableCell>
                                <TableCell align="right">موضوع</TableCell>
                                <TableCell align="right">پیام ها</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableHead>
                            <TableBody>
                                {SupportList.content && SupportList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.Id.toString()}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align="right"
                                                onClick={(event) => {
                                                    history.push({
                                                        pathname: "/support/details/" + row.Id
                                                    });
                                                }}
                                            >
                                                {row.Id}
                                            </TableCell>
                                            <TableCell align="right"
                                                       onClick={(event) => {
                                                           history.push({
                                                               pathname: "/support/details/" + row.Id
                                                           });
                                                       }}>
                                                {row.Place && "مجموعه : " + row.Place.Name}
                                                {row.User && "کاربر : " + <PopoverUser user ={row.User} />}
                                            </TableCell>
                                            <TableCell align="right"
                                                       onClick={(event) => {
                                                           history.push({
                                                               pathname: "/support/details/" + row.Id
                                                           });
                                                       }}>{row.Title}</TableCell>
                                            <TableCell align="right"
                                                       onClick={(event) => {
                                                           history.push({
                                                               pathname: "/support/details/" + row.Id
                                                           });
                                                       }}>

                                                {row?.Messages?.length}
                                            </TableCell>
                                            <TableCell align="right"
                                                       onClick={(event) => {
                                                           history.push({
                                                               pathname: "/support/details/" + row.Id
                                                           });
                                                       }}>

                                                <Chip
                                                    label={row?.Status}
                                                    color={(row?.Status?.startsWith("AWAITING")) ? "error" : "success"}/>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(e) => setItemToDelete(row)} size={"small"}><Delete
                                                    color={"error"}/></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(SupportList.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        sx={{direction: "ltr"}}
                        count={SupportList.totalElements}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppSupport(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {RenderModalDelete()}
        </>
    );
};

export default SupportTicketLists;
