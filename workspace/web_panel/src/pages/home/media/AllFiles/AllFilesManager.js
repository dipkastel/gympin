import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {media_getAllFiles} from "../../../../network/api/media.api";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Image, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";

const AllFilesManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [pagination, setPagination] = useState({Page: 1, Size: 20})
    const [files, setFiles] = useState(null)

    useEffect(() => {
        getAllFiles(pagination);
    }, [pagination]);

    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            alert(item);
        }
    }));

    function getAllFiles(page) {
        media_getAllFiles(page).then(result => {
            setFiles(result.data.Data)
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

            <Portlet>
                <PortletHeader
                    title="فایل ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>url</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {files && files.map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row?.Url || 0}</TableCell>


                                        <TableCell align="right"><Image src={"file://" + row.Url} width={"100%"}/></TableCell>
                                        {/*<TableCell align="right">{(row.LogoIds.length) ? "has image" : ""}</TableCell>*/}
                                        {/*<TableCell align="left">*/}

                                        {/*<Button*/}
                                        {/*    variant="contained"*/}
                                        {/*    color={"error"}*/}
                                        {/*    onClick={(e) => setItemToDelete(row)}*/}
                                        {/*>*/}
                                        {/*    حذف*/}
                                        {/*</Button>*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(pagination.Size)}
                        page={pagination.Page}
                        onPageChange={(event, newPage) => setPagination({...pagination, Page: newPage})}
                        onRowsPerPageChange={(event) => {
                            setPagination({Page: 0, Size: parseInt(event.target.value, 10)});
                            // SetRppSportsManagement(parseInt(event.target.value, 10));
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default forwardRef(AllFilesManager);
