import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Article_add, Article_delete, Article_query} from "../../../network/api/article.api";
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, Card, CardContent, CardHeader, Chip, Grid, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {Form, Image, Modal} from "react-bootstrap";
import {ArticleStatus} from "../../../helper/enums/ArticleStatus";

const ArticlesManagement = () => {

    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [articleList, setArticleList] = useState([]);
    const [searchString, setSearchString] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getArticles();
    }, [page, rowsPerPage, searchString]);

    function getArticles() {

        Article_query({
            queryType: "SEARCH",
            Title: searchString,
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((data) => {
            setArticleList(data.data.Data);
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
        function addArticle(e) {
            e.preventDefault()
            Article_add({Title: e.target.Title.value})
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    history.push({
                        pathname: "/articles/details/" + data.data.Data.Id
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
                    <Form noValidate autoComplete="off" onSubmit={(e) => addArticle(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن مطلب "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Control
                                    name="Title"
                                    type="text"
                                    placeholder="عنوان مقاله یا مطلب"
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
    function RenderModalDelete() {
        function deleteArticle(e) {
            e.preventDefault()
            Article_delete({Id: itemToDelete.Id})
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null);
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
                    <Form noValidate autoComplete="off" onSubmit={(e) => deleteArticle(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف مطلب "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {"حذف مطلب "+itemToDelete.Title}
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
            <Notice icon="flaticon-warning kt-font-primary">مدیریت مطالب</Notice>

            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={"مدیریت دسته بندی مطالب"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت دسته بندی مطالب
                            <Button
                                variant="contained"
                                color="secondary"
                                href="articles/categories"
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
                    title="مطالب"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>تصویر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>موضوع</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articleList.content && articleList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover  role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">
                                                <Image width={"35px"}
                                                       src={row.ArticleImage ? row.ArticleImage.Url : "https://api.gympin.ir/resource/image?Id=11"}/>
                                            </TableCell>
                                            <TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">{row.Title}</TableCell>
                                            <TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">
                                                <Chip label={ArticleStatus[row.ArticleStatus]}
                                                      color={(row.ArticleStatus ? (row.ArticleStatus.startsWith("PUBLISHED") ? "success" : "error") : "error")}/>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color={"error"}
                                                        sx={{marginRight: "auto"}} size="large"
                                                        onClick={(e) => setItemToDelete(row)}>
                                                    حذف
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {articleList.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={articleList.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
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
            {itemToDelete&&RenderModalDelete()}
        </>
    );
};

export default ArticlesManagement;
