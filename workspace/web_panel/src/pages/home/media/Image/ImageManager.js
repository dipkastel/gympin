import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {media_delete, media_query, media_update} from "../../../../network/api/media.api";
import {Delete} from '@mui/icons-material';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Pagination,
    Radio,
    RadioGroup,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import AddImageModal from "./AddImageModal";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Form, Image, Modal} from "react-bootstrap";
import _imageFilter, {defaultFilterImages} from "./_ImageFilter";


const ImageManager = ({openAddModalRef, openFilterModalRef}, ref) => {
    const error = useContext(ErrorContext);
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(20)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalFilter, setOpenModalFilter] = useState(false)
    const [itemToDetail, setItemToDetail] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [filters, SetFilters] = useState(defaultFilterImages);
    const [selectedTab, SetSelectedTab] = useState("DETAIL");

    useEffect(() => {
        if (openModalAdd) return;
        getImages();
    }, [page, perPage, filters, openModalAdd]);

    useImperativeHandle(openAddModalRef, () => ({
        OpenModal(item) {
            setOpenModalAdd(true)
        }
    }));

    useImperativeHandle(openFilterModalRef, () => ({
        OpenModal(item) {
            setOpenModalFilter(true)
        }
    }));

    function imageUploadComplete(item) {
        setOpenModalAdd(false);
        setPage(1);
    }

    function getImages() {
        media_query({
            ...filters,
            paging: {Page: page - 1, Size: perPage, Desc: true}
        }).then(result => {
            setImages(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            media_delete({id: itemToDelete.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    setPage(1);
                    getImages();
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
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف تصویر"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Image src={itemToDelete && itemToDelete.Url} width={"100%"}/>
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
                    </form>
                </Modal>
            </>
        );
    }

    function updateImage(e) {
        e.preventDefault();
        media_update(itemToDetail)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                setItemToDetail(null);
                getImages();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
        })
    }

    function renderModalDetails() {
        return (
            <>
                <Modal show={!!itemToDetail} onHide={() => setItemToDetail(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"جزئیات تصویر"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={itemToDetail && itemToDetail.Url} width={"100%"}/>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, n) => SetSelectedTab(n)}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant={"standard"}
                            aria-label="full width tabs example"
                        >
                            <Tab label="اطلاعات" value={"DETAIL"}/>
                            <Tab label="ویرایش" value={"EDIT"}/>
                        </Tabs>

                        {selectedTab === "DETAIL" && <>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} gutterBottom variant="h5" component="p">
                                {"نام فایل : " + (itemToDetail && itemToDetail.Name)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color={"darkgray"} component="p">
                                {"عنوان تصویر : " + (itemToDetail && (itemToDetail.Title || ""))}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color="textSecondary" component="p">
                                {"توضیح : " + (itemToDetail && itemToDetail.Description)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color="textSecondary" component="p">
                                {"تاریخ بارگذاری : " + new Date(itemToDetail && itemToDetail.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color="textSecondary" component="p">
                                {"دسته بندی : " + (itemToDetail && itemToDetail.Category.Name)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color="textSecondary" component="p">
                                {"آی دی فایل : " + (itemToDetail && itemToDetail.Id)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p: 1}} variant="h5" color="textSecondary" component="p">
                                {"آدرس : " + (itemToDetail && itemToDetail.Url)}
                            </Typography>
                        </>}
                        {selectedTab === "EDIT" && <>

                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="عنوان"
                                    value={itemToDetail?.Title}
                                    onChange={e => setItemToDetail({...itemToDetail, Title: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="slug"
                                    value={itemToDetail?.Slug}
                                    onChange={e => setItemToDetail({...itemToDetail, Slug: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="description"
                                    value={itemToDetail?.Description}
                                    onChange={e => setItemToDetail({...itemToDetail, Description: e.target.value})}
                                />
                            </Form.Group>
                            <FormControl>
                                <FormLabel>نوع</FormLabel>
                                <RadioGroup
                                    aria-labelledby={"نوع"}
                                    defaultValue="jpg"
                                    value={itemToDetail?.Extension}
                                    onChange={e => setItemToDetail({...itemToDetail, Extension: e.target.value})}
                                >
                                    <FormControlLabel value="jpg" control={<Radio/>} label="jpg"/>
                                    <FormControlLabel value="webp" control={<Radio/>} label="webp"/>
                                </RadioGroup>
                            </FormControl>
                            <Button variant={"contained"} onClick={(e) => updateImage(e)} fullWidth>تایید</Button>
                        </>}
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    return (
        <>
            {images.content && (<>
                <Grid container spacing={1}>
                    {images.content.map((item, number) => (
                        <Grid container item size={{xs: 6, md: 2}} key={number}>
                            <Card sx={{width: "100%"}}>
                                <CardActionArea onClick={() => setItemToDetail(item)}>
                                    <CardMedia
                                        sx={{height: 140, backgroundSize: "contain"}}
                                        image={item.Url + "&width=200"}
                                        loading={"lazy"}
                                        title={item.Name}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color={"darkgray"} component="p">
                                            {item.Title || ""}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.Description | ""}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.Extension}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                <CardActions disableSpacing>
                                    <IconButton aria-label="delete" onClick={() => setItemToDelete(item)}>
                                        <Delete/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>)
                    )}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent={"center"}
                    alignItems="center">
                    <Pagination count={images.totalPages} page={page} onChange={(e, value) => setPage(value)}/>
                </Grid>
            </>)}

            <_imageFilter filter={filters} setFilter={SetFilters} openModal={openModalFilter} setOpenModal={(e) => setOpenModalFilter(e)}/>
            {openModalAdd && <AddImageModal setOpenAddImage={setOpenModalAdd} done={imageUploadComplete}/>}
            {renderModalDelete()}
            {renderModalDetails()}
        </>
    );

};

export default forwardRef(ImageManager);
