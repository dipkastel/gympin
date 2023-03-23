import React, {useContext, useEffect, useRef, useState} from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input} from "@mui/material";
import {compareObjs} from "../../../helper/utils";
import {media_AddImage} from "../../../network/api/multimedia.api";
import {user_updateAvatar} from "../../../network/api/user.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import 'react-advanced-cropper/dist/style.css';
import {CircleStencil, FixedCropper,CropperRef } from 'react-advanced-cropper'

const _EditImage = ({user}) => {
    const [imageUrl,SetImageUrl] = useState(null)
    const [imageToCrop,SetImageToCrop] = useState(null)
    const cropperRef = useRef(null);
    const error = useContext(ErrorContext);

    useEffect(() => {
        SetImageUrl(user.Avatar?(user.Avatar.Url+"&width=200"):"")
    }, []);

    function uploadImage(e) {

        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            const form = new FormData();
            if(canvas.height<300){
                error.showError({message: "تصویر کوچک است",});
                return;
            }
            if(canvas.height>2000){
                error.showError({message: "تصویر بزرگ است",});
                return;
            }
            canvas.toBlob((blob) => {
                if (blob) {
                    error.showError({message: "لطفا تا ارسال کامل تصویر صبر کنید."});
                    SetImageToCrop(null)
                    const formData = new FormData();
                    formData.append("MediaType", "IMAGE");
                    formData.append("File",blob);
                    formData.append("CategoryId", "2");
                    formData.append("Title", user.Username);
                    formData.append("Description", user.Id);
                    //
                    media_AddImage(formData)
                        .then(data => {
                            user_updateAvatar({UserId:user.Id,MultimediaId:data.data.Data.Id}).then(result=>{
                                SetImageUrl(result.data.Data.Avatar?(result.data.Data.Avatar.Url+"&width=200"):"")
                                error.showError({message: "با موفقیت ثبت شد",});
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

    const onChange = (cropper) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    function renderModalCrop(){

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
                            width: 1000,
                            height: 1000
                        }}
                        onChange={onChange}
                        className={'cropper'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={()=>uploadImage()}>تایید</Button>
                </DialogActions>
            </Dialog>
        </>)
    }

    return (
        <>

            <label htmlFor="raised-button-file">
                <Avatar
                    sx={{width: 120, height: 120, marginTop: 3}}
                    alt="Remy Sharp"
                    src={imageUrl}
                />
            </label>
            <Input
                accept="image/*"
                className={"input"}
                style={{display: 'none'}}
                id="raised-button-file"
                onChange={(e)=>{
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
