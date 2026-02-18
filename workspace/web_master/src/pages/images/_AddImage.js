import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Typography} from "@mui/material";
import {media_AddImage, media_getCatById} from "../../network/api/multimedia.api";
import {gym_AddMultimedia} from "../../network/api/place.api";
import {resizeCanvas} from "../../helper/utils";
import {FixedCropper} from "react-advanced-cropper";
import {Form} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";

const _AddImage = ({renewList}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [imageToCrop, SetImageToCrop] = useState(null)
    const [image, SetImage] = useState(null);
    const [ratio, setRatio] = useState(null)
    const cropperRef = useRef(null);


    useEffect(() => {
        getratio()
    }, []);

    function getratio() {
        media_getCatById({id: 3})
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


    function ModalAddImage() {

        function uploadImage(e) {
            e.preventDefault()
            if (!image) return;
            const formData = new FormData();
            formData.append("MediaType", "IMAGE");
            formData.append("File", image);
            formData.append("CategoryId", "3");
            formData.append("Title", e.target.title.value);
            formData.append("Description", e.target.description.value);
            //
            setOpenModalAdd(false);

            error.showError({message: "لطفا صبر کنید...",});
            media_AddImage(formData)
                .then(data => {
                    gym_AddMultimedia({
                        Place: {Id: place.Id},
                        Multimedia: {Id: data.data.Data.Id}
                    }).then(result => {
                        renewList();
                        SetImage(null);
                        error.showError({message: "ثبت موفق",});
                    }).catch(e => {
                        try {
                            error.showError({message: e.response.data.Message,});
                        } catch (f) {
                            error.showError({message: "خطا نا مشخص",});
                        }
                    })
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function renderModalCrop() {

            const croppedImage = () => {

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
                            SetImage(blob);
                            SetImageToCrop(null)

                        }
                    }, 'image/jpeg');
                }
            }

            return (<>

                <Dialog
                    className={"w-100"}
                    open={!!imageToCrop} onClose={() => SetImageToCrop(null)}>
                    <DialogContent>
                        <FixedCropper

                            ref={cropperRef}
                            src={imageToCrop}
                            stencilProps={{
                                aspectRatio: ratio?.ARW / ratio?.ARH,
                                handlers: false,
                                lines: false,
                                movable: false,
                                resizable: false

                            }}
                            stencilSize={{
                                width: ratio ? ratio.MAXW : 1000,
                                height: ratio ? ratio.MAXH : 1000,
                            }}
                            className={'cropper'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={() => croppedImage()}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </>)
        }

        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={(e) => uploadImage(e)}>
                        <DialogTitle>افزودن تصویر</DialogTitle>
                        <DialogContent>
                            {image ? (<>
                                <div className={"image-div"}>

                                    <Fab size={"small"} className={"delete-image-Upload"}
                                         onClick={() => SetImage(null)}>
                                        <DeleteIcon fontSize={"large"} color={"error"}/>
                                    </Fab>
                                    <img className={"upload-img"} height={100} src={URL.createObjectURL(image)}/>
                                </div>
                            </>) : (<>
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span" className={"button"}>
                                        انتخاب تصویر
                                    </Button>
                                </label>
                                <input
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
                            </>)}

                            <TextField
                                autoFocus
                                margin="dense"
                                name={"title"}
                                label="نام تصویر"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <Typography variant={"caption"}>
                                برای افزودن تصویر جدید نام آن را وارد کنید
                                <br/>
                                مثال : درب ورودی
                            </Typography>
                            <TextField
                                margin="dense"
                                name={"description"}
                                label="توضیح تصویر"
                                type="text"
                                fullWidth
                                multiline
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
                {renderModalCrop()}
            </div>
        )
    }

    return (
        <>
            <Button variant={"outlined"} title={"btn_add"}
                    onClick={(e) => setOpenModalAdd(true)}>افزودن</Button>
            {ModalAddImage()}
        </>
    );
};

export default _AddImage;
