import React, {useContext, useEffect, useRef, useState} from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, Input} from "@mui/material";
import {media_AddImage, media_getCatById} from "../../../network/api/multimedia.api";
import {user_updateAvatar} from "../../../network/api/user.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import 'react-advanced-cropper/dist/style.css';
import {CircleStencil, FixedCropper} from 'react-advanced-cropper'
import {resizeCanvas} from "../../../helper/utils";

const _EditImage = ({user, RequestUser}) => {
    const [imageUrl, SetImageUrl] = useState(null)
    const [imageToCrop, SetImageToCrop] = useState(null)
    const cropperRef = useRef(null);
    const error = useContext(ErrorContext);
    const [ratio, setRatio] = useState(null)

    useEffect(() => {
        // SetImageUrl(user.Avatar?(user.Avatar.Url+"&width=200"):"")
        SetImageUrl(user.Avatar ? (user.Avatar.Url + "") : "")
        getratio()
    }, []);

    function getratio() {
        media_getCatById({id: 2})
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
                canvas = resizeCanvas(canvas,ratio.MAXH,null);
            }
            canvas.toBlob((blob) => {
                if (blob) {
                    error.showError({message: "لطفا تا ارسال کامل تصویر صبر کنید."});
                    SetImageToCrop(null)
                    const formData = new FormData();
                    formData.append("MediaType", "IMAGE");
                    formData.append("File", blob);
                    formData.append("CategoryId", "2");
                    formData.append("Title", user.Username);
                    formData.append("Description", user.Id);
                    //
                    media_AddImage(formData)
                        .then(data => {
                            user_updateAvatar({UserId: user.Id, MultimediaId: data.data.Data.Id}).then(result => {
                                SetImageUrl(result.data.Data.Avatar ? (result.data.Data.Avatar.Url + "&width=200") : "")
                                error.showError({message: "با موفقیت ثبت شد",});
                                RequestUser();
                            }).catch(e => {
                                try {
                                    error.showError({message: e.response.data.Message});
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
            console.log(cropper.getCoordinates(), cropper.getCanvas());

        };
        return (<>

            <Dialog
                className={"w-100"}
                open={!!imageToCrop} onClose={() => SetImageToCrop(null)}>
                <DialogContent>
                    <FixedCropper

                        ref={cropperRef}
                        src={imageToCrop}
                        stencilComponent={CircleStencil}
                        stencilProps={{
                            aspectRatio: 1,
                            handlers: false,
                            lines: false,
                            movable: false,
                            resizable: false

                        }}
                        stencilSize={{
                            width: ratio?ratio.MAXW:1000,
                            height: ratio?ratio.MAXH:1000,
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

            <label htmlFor="raised-button-file">
                <Avatar
                    sx={{width: 120, height: 120, marginTop: 3}}
                    alt="profile Image"
                    src={imageUrl}
                />
            </label>
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
            {renderModalCrop()}
        </>
    );
};

export default _EditImage;
