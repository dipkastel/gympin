import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Input
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import {TicketFoods_addMultimeida, TicketFoods_deleteMultimedia, TicketFoods_GetMultimedias} from "../../network/api/TicketFoods.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Form} from "react-bootstrap";
import {media_AddImage, media_getCatById} from "../../network/api/multimedia.api";
import {resizeCanvas} from "../../helper/utils";
import {FixedCropper, RectangleStencil} from "react-advanced-cropper";

const __EditFoodImages = ({selectedItem, setSelectedItem}) => {

    const error = useContext(ErrorContext);
    const [foodItemImages, setFoodItemImages] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [imageToCrop, SetImageToCrop] = useState(null)
    const cropperRef = useRef(null);
    const [ratio, setRatio] = useState(null)


    useEffect(() => {
        getratio();
        getImages();
    }, []);


    function getImages() {
        if (!selectedItem) return;
        TicketFoods_GetMultimedias({Id: selectedItem.Id}).then(data => {
            setFoodItemImages(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setAsDefaultImage(item) {

    }


    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            TicketFoods_deleteMultimedia({TicketFood: {Id: selectedItem.Id}, Multimedia: {Id: itemToDelete.Id}})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getImages()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog
                open={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
            >
                <Form onSubmit={(e) => DeleteItem(e)}>
                    <DialogTitle>{"حذف " + itemToDelete?.Description}</DialogTitle>
                    <DialogContent sx={{textAlign: "center"}}>
                        <img
                            width={"200px"}
                            src={itemToDelete?.Url}
                            srcSet={itemToDelete?.Url}
                            alt={itemToDelete?.Title}
                            loading="lazy"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            variant={"outlined"}
                            color={"error"}
                            onClick={(e) => setItemToDelete(null)}
                        >
                            لغو
                        </Button>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            type={"submit"}
                            variant={"outlined"}
                            color={"success"}
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }


    function getratio() {
        media_getCatById({id: 8})
            .then(result => {
                setRatio(result.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }


    function uploadImage(e) {

        let canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            if (canvas.height < ratio.MINH) {
                error.showError({message: "تصویر کوچک است",});
                return;
            }
            if (canvas.height > ratio.MAXH) {
                canvas = resizeCanvas(canvas, ratio.MAXH, null);
            }
            canvas.toBlob((blob) => {
                if (blob) {
                    error.showError({message: "لطفا تا ارسال کامل تصویر صبر کنید."});
                    SetImageToCrop(null)
                    const formData = new FormData();
                    formData.append("MediaType", "IMAGE");
                    formData.append("File", blob);
                    formData.append("CategoryId", "8");
                    formData.append("Title", selectedItem.Name);
                    formData.append("Description", selectedItem.Name + selectedItem?.Place?.Name);
                    media_AddImage(formData)
                        .then(data => {
                            TicketFoods_addMultimeida({TicketFood: {Id: selectedItem.Id}, Multimedia: {Id: data.data.Data.Id}})
                                .then(result => {
                                    error.showError({message: "با موفقیت ثبت شد",});
                                    getImages()
                                })
                                .catch(e => {
                                    try {
                                        error.showError({message: e.response.data.Message,});
                                    } catch (f) {
                                        error.showError({message: "خطا نا مشخص",});
                                    }
                                });
                        }).catch(e => {
                        try {
                            error.showError({message: e.response.data.Message});
                        } catch (f) {
                            error.showError({message: "خطا نا مشخص",});
                        }
                    });
                }
            }, 'image/jpeg');
        }
    }


    function renderModalCrop() {

        const onChange = (cropper) => {


        };
        return (<>

            <Dialog
                className={"w-100"}
                open={!!imageToCrop} onClose={() => SetImageToCrop(null)}>
                <DialogContent>
                    <FixedCropper

                        ref={cropperRef}
                        src={imageToCrop}
                        stencilComponent={RectangleStencil}
                        stencilProps={{
                            aspectRatio: 1,
                            handlers: false,
                            lines: true,
                            movable: true,
                            resizable: false

                        }}
                        stencilSize={{
                            width: ratio ? ratio.MAXW : 1000,
                            height: ratio ? ratio.MAXH : 1000,
                        }}
                        onChange={onChange}
                        className={'cropper'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={() => uploadImage()}>تایید</Button>
                </DialogActions>
            </Dialog>
        </>)
    }


    return (
        <>
            <Card variant={"outlined"} sx={{p: 2, m: 1}}>

                <ImageList cols={3} sx={{width: "100%"}}>
                    {foodItemImages.length > 0 && foodItemImages.map((item, number) => (
                        <ImageListItem key={number} sx={{border: item.default ? "2px solid #e7333e" : "none"}}>
                            <img
                                src={item.Url}
                                srcSet={item.Url}
                                alt={item.Title}
                                loading="lazy"
                                onClick={(e) => setAsDefaultImage(item)}
                            />
                            <ImageListItemBar
                                sx={{direction: "rtl"}}
                                actionIcon={
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        onClick={() => setItemToDelete(item)}
                                    >
                                        <Delete color={"error"}/>
                                    </IconButton>
                                }

                            />
                        </ImageListItem>
                    ))}


                    <Input
                        accept="image/*"
                        className={"input"}
                        style={{display: 'none'}}
                        id="raised-button-file"
                        onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                SetImageToCrop(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }}
                        type="file"
                    />
                    <ImageListItem sx={{border: "none"}}>
                        <Card variant={"outlined"} sx={{width: "fit-content"}}>
                            <CardActionArea>
                                <label htmlFor="raised-button-file">
                                    <Add sx={{fontSize: 130, color: "#999"}}/>
                                </label>
                            </CardActionArea>
                        </Card>
                    </ImageListItem>
                </ImageList>
            </Card>
            {renderModalDelete()}
            {renderModalCrop()}
        </>
    );
};

export default __EditFoodImages;
