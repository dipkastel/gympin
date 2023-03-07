import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {media_addImage, media_delete, media_getAllImages} from "../../../../network/api/media.api";
import {Delete, ExpandMore, Share} from '@mui/icons-material';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Divider,
    Fab,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import AddImageModal from "./AddImageModal";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {corporate_delete} from "../../../../network/api/corporate.api";
import {Image, Modal} from "react-bootstrap";


const defaultPageSize = {Page: 0, Size: 20}

const ImageManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [images, setImages] = useState([])
    const [pagination, setPagination] = useState(defaultPageSize)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDetail, setItemToDetail] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        getImageByPage(pagination);
    }, [pagination]);

    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            setOpenModalAdd(true)
        }
    }));

    function imageUploadComplete(item) {
        setOpenModalAdd(false);
        setPagination({Page: 0, Size: 20});
    }

    function getImageByPage(page) {

        media_getAllImages(page).then(result => {
            var items = [];
            if (images.length > 0 && pagination.Page !== 0) {
                items.push(...images)
            }
            items.push(...result.data.Data)
            setImages(items);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function renderModalDelete(){

        function DeleteItem(e) {
            e.preventDefault()
            media_delete({id:itemToDelete.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getImageByPage(0);
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
                            <Image src={itemToDelete&&itemToDelete.Url} width={"100%"}/>
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
    function renderModalDetails(){
        function DeleteItem(e) {
            e.preventDefault()
        }

        return (
            <>
                <Modal show={!!itemToDetail} onHide={() => setItemToDetail(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"جزئیات تصویر"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <Image src={itemToDetail&&itemToDetail.Url} width={"100%"}/>

                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} gutterBottom variant="h5" component="p">
                                {"نام فایل : "+(itemToDetail&&itemToDetail.Name)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color={"darkgray"} component="p">
                                {"عنوان تصویر : "+(itemToDetail&&(itemToDetail.Title||""))}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color="textSecondary" component="p">
                                {"توضیح : "+(itemToDetail&&itemToDetail.Description)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color="textSecondary" component="p">
                                {"تاریخ بارگذاری : "+new Date(itemToDetail&&itemToDetail.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color="textSecondary" component="p">
                                {"دسته بندی : "+(itemToDetail&&itemToDetail.Category.Name)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color="textSecondary" component="p">
                                {"آی دی فایل : "+(itemToDetail&&itemToDetail.Id)}
                            </Typography>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                            <Typography sx={{p:1}} variant="h5" color="textSecondary" component="p">
                                {"آدرس : "+(itemToDetail&&itemToDetail.Url)}
                            </Typography>
                        </Modal.Body>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            {images.length > 0 && <Grid container spacing={1}>
                {images.map((item, number) => (
                    <Grid container item xs={2} key={number}>
                        <Card sx={{width: "100%"}}>
                            <CardActionArea onClick={()=>setItemToDetail(item)}>
                                <CardMedia
                                    sx={{height: 140, backgroundSize: "contain"}}
                                    image={item.Url}
                                    loading={"lazy"}
                                    title={item.Name}
                                />
                                <CardContent>
                                    <Typography variant="body2" color={"darkgray"} component="p">
                                        {item.Title||""}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.Description|""}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions disableSpacing>
                                <IconButton aria-label="delete" onClick={()=>setItemToDelete(item)}>
                                    <Delete/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>)
                )}
            </Grid>}
            {images && <Grid container sx={{margin: 2}} justifyContent={"center"} alignContent={"center"}><Fab variant="extended" color="primary" aria-label="Add" onClick={e => setPagination({Page: pagination.Page + 1, Size: 20})}><ExpandMore/>Load More</Fab></Grid>            }
            {openModalAdd && <AddImageModal setOpenAddImage={setOpenModalAdd} done={imageUploadComplete}/>}
            {renderModalDelete()}
            {renderModalDetails()}
        </>
    );

};

export default forwardRef(ImageManager);
