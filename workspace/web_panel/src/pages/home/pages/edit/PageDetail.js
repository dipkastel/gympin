import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {pages_getAllTypes, pages_getById, pages_update} from "../../../../network/api/pages.api";
import PageEditorEngin from "./enginParts/PageEditorEngin";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Button, Collapse, Grid, IconButton} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export default function PageDetail() {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState([])
    const [openPage, setOpenPage] = useState(true);
    const [elements, setElements] = useState(null);
    let {PageId} = useParams();

    useEffect(() => {
        getTypes();
        getPage();
    }, []);

    function getTypes() {
        pages_getAllTypes().then(result => {
            setElements(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPage() {
        pages_getById({id: PageId}).then(result => {
            setPage(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function UpdatePage(e) {
        e.preventDefault()
        pages_update(page).then(result => {
            error.showError({message: "عملیات موفق",});
            getPage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>اگر این صفحه در حال استفاده است آن را ویرایش نکنید صفحه دیگری ساخته و پس از تکمیل ویرایش برای استفاده انتخاب کنید</p>
            </Notice>
            <Portlet>
                <PortletHeader
                    title="مشخصات صفحه"
                    toolbar={<PortletHeaderToolbar><IconButton onClick={(e) => setOpenPage(!openPage)}>{openPage ? <ExpandLess/> :
                        <ExpandMore/>}</IconButton></PortletHeaderToolbar>}
                />

                <Collapse in={openPage} timeout="auto" unmountOnExit>
                    <PortletBody>
                        <Form onSubmit={(e) => UpdatePage(e)}>
                            <Form.Group>
                                <Form.Label>عنوان</Form.Label>
                                <Form.Control
                                    name="Title"
                                    type="text"
                                    value={page.Title || ""}
                                    onChange={(e) => {
                                        setPage({...page, Title: e.target.value})
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>توضیح :</Form.Label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={page.Description || ""}
                                    onChange={(e) => {
                                        setPage({...page, Description: e.target.value})
                                    }}
                                    name="Description"
                                />
                                <Form.Text className="text-muted">
                                    یک توضیح کامل برای صفحه ای که می سازید وارد نمایید تا دیگران بعد از گذشت زمان متوجه شوند.
                                    <br/>
                                    مثلا برای کدام اپلیکیشن و برای چه کمپینی یا مناسبتی این صفحه ساخته شده.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>دسترسی :</Form.Label>
                                <Form.Control
                                    name="Data"
                                    type="text"
                                    value={page.Data || ""}
                                    onChange={(e) => {
                                        setPage({...page, Data: e.target.value})
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    آدرس صفحه برای دسترسی که برای کاربران در دسترس خواهد بود
                                </Form.Text>
                            </Form.Group>
                            <Grid container justifyContent={"space-between"}>
                                <Button target={"_blank"} href={"https://web.gympin.ir/page/"+page.Data} variant={"outlined"} >تست این صفحه در اپلیکیشن کاربران</Button>
                                <Button
                                    variant={"contained"}
                                    className={"button_danger"}
                                    type={"submit"}
                                >
                                    ثبت
                                </Button>
                            </Grid>
                        </Form>

                    </PortletBody>
                </Collapse>
            </Portlet>
            {page && elements && <div className="row">
                <PageEditorEngin parent={page} elements={elements}/>
            </div>}
        </div>
    );
};

