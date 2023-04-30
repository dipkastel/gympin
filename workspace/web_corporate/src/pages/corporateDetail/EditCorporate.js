import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions,
    DialogContent,
    FormControl,
    Grid,
    Input,
    TextField
} from "@mui/material";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {connect, useSelector} from "react-redux";
import {media_AddImage, media_getCatById} from "../../network/api/multimedia.api";
import {corporate_Update, corporate_UpdateLogo} from "../../network/api/corporate.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {CircleStencil, FixedCropper} from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css';
import {resizeCanvas} from "../../helper/utils";

const EditCorporate = (props) => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [imageUrl, SetImageUrl] = useState("")
    const [inCorporate, SetInCorporate] = useState(corporate);
    const [imageToCrop, SetImageToCrop] = useState(null)
    const [ratio, setRatio] = useState(null)
    const cropperRef = useRef(null);

    useEffect(() => {
        SetImageUrl(corporate.Logo ? corporate.Logo.Url : "");
        SetInCorporate(corporate);
    }, [corporate]);
    useEffect(() => {
        props.RequestCorporate(corporate);
        getratio();
    }, []);

    function getratio() {
        media_getCatById({id: 5})
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

    function updateCorporate(e) {
        e.preventDefault()
        corporate_Update({Id: corporate.Id, Name: inCorporate.Name, Address: inCorporate.Address}).then(result => {
            props.RequestCorporate(corporate);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
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
                    formData.append("CategoryId", ratio.Id);
                    formData.append("Title", corporate.Name);
                    formData.append("Description", corporate.Id);
                    //
                    media_AddImage(formData)
                        .then(data => {
                            corporate_UpdateLogo({
                                CorporateId: corporate.Id,
                                MultimediaId: data.data.Data.Id
                            }).then(result => {
                                props.RequestCorporate(corporate)

                                SetImageUrl(result.data.Data.Avatar ? (result.data.Data.Avatar.Url + "&width=200") : "")
                                error.showError({message: "با موفقیت ثبت شد",});
                            }).catch(e => {
                                try {
                                    error.showError({message: e.response.data.Message,});
                                } catch (f) {
                                    error.showError({message: "خطا نا مشخص",});
                                }
                            });
                        }).catch(e => {
                        try {
                            error.showError({message: e.response.data.Message,});
                        } catch (f) {
                            error.showError({message: "خطا نا مشخص",});
                        }
                    })

                }
            })
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title="مشخصات سازمان"/>
                <CardContent>

                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >

                        <label htmlFor="raised-button-file">
                            <Avatar
                                sx={{width: 120, height: 120, marginTop: 3}}
                                alt="corporate logo"
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
                    </Grid>
                    <Form onSubmit={(e) => updateCorporate(e)}>

                        <FormControl
                            sx={{p: 1}}
                            fullWidth>
                            <TextField
                                autoFocus
                                value={inCorporate.Name}
                                label="نام سازمان"
                                type="text"
                                onChange={(e) => SetInCorporate({...inCorporate, Name: e.target.value})}
                                variant="standard"
                            />
                        </FormControl>
                        <FormControl
                            sx={{p: 1}}
                            fullWidth>
                            <TextField
                                label="آدرس"
                                type="text"
                                value={inCorporate.Address}
                                onChange={(e) => SetInCorporate({...inCorporate, Address: e.target.value})}
                                multiline
                                minRows={3}
                                variant="standard"
                            />
                        </FormControl>
                        <FormControl
                            sx={{p: 1}}
                            fullWidth>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </FormControl>
                    </Form>

                </CardContent>

            </Card>
            {renderModalCrop()}
        </>
    );
};

export default connect(null, sagaActions)(EditCorporate);
