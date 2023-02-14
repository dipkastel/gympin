import React, {useContext, useEffect, useState} from 'react';
import {media_AddImage} from "../../network/api/multimedia.api";
import {place_AddMultimedia, Place_deleteMultimedia, place_getMultimedias} from "../../network/api/place.api";
import {
    Box,
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import getArrenge from "./imageListArrenges";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const Images = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [imageList,SetImageList] = useState([])
    const [image, SetImage] = useState(null);

    useEffect(() => {
        getImageList();
    }, []);

    function getImageList(){
        place_getMultimedias(place.Id).then(result=>{
            SetImageList(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
                size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    function deleteMultimedia(event,item){
        Place_deleteMultimedia({
            Place:{Id:place.Id},
            Multimedia:{Id:item.Id}
        }).then(result=>{
            getImageList()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }

    function addImageToPlace(e) {
        e.preventDefault()
        if (!image) return;
        const formData = new FormData();
        formData.append("MediaType", "IMAGE");
        formData.append("File", image);
        formData.append("CategoryId", "3");
        formData.append("Title", e.target.title.value);
        formData.append("Description", e.target.description.value);
        //
        media_AddImage(formData)
            .then(data => {
                place_AddMultimedia({
                    Place:{Id:place.Id},
                    Multimedia:{Id:data.data.Data.Id}
                }).then(result => {
                    getImageList();
                    setOpenModalAdd(false);
                    SetImage(null);

                }).catch(e => console.log(e));
            }).catch(e => console.log(e))
    }

    function ModalAddImage() {
        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={(e) => addImageToPlace(e)}>
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
                                    onChange={e => SetImage(e.target.files[0])}
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
            </div>
        )
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementImages))
        return (<></>);


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت تصاویر"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        تصویر</Button>}/>
            </Card>

            <Box sx={{margin: 1}}>
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={121}>
                    {imageList.map((item, numb) => (
                        <ImageListItem key={item.Id} cols={getArrenge(imageList.length)[numb].cols || 1} rows={getArrenge(imageList.length)[numb].rows || 1}>
                            <img

                                src={item.Url}
                                alt={item.Title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{paddingRight: 1}}
                                title={item.Title}
                                subtitle={item.Description}
                                actionIcon={
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        aria-label={item.title}
                                        onClick={(e)=>deleteMultimedia(e,item)}
                                    >
                                        <DeleteIcon color={"primary"}/>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            {ModalAddImage()}
        </>
    )
};

export default Images;
