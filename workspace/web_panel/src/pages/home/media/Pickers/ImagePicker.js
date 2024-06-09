import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {
    Button,
    Checkbox,
    Collapse,
    Fab,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Pagination,
    Paper,
    Typography
} from "@mui/material";
import {ArrowForward, FilterAlt, WarningSharp} from '@mui/icons-material';
import {media_addImage, media_query} from "../../../../network/api/media.api";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {defaultFilterImages} from "../Image/_ImageFilter";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import {multimediacategory_getAll} from "../../../../network/api/mediaCategories.api";
import {useDropzone} from "react-dropzone";

const defaultSettings = {
    rowCount: 3,
    isSingle: false,
    filters: defaultFilterImages,
    DefaultDiscHelper: null,
    DefaultNameHelper: null
}

const ImagePicker = ({setClose, onSelect, options}) => {
    const error = useContext(ErrorContext);
    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [CompatibleErrors, setCompatibleErrors] = useState([])
    const [page, setPage] = useState(1)
    const [settings, setSettings] = useState({...defaultSettings, ...options})
    const [expanded, setExpanded] = React.useState(false);


    const [addItem, setAddItem] = useState([]);
    const [categories, setCategories] = useState([])
    const [uploading, setUploading] = useState(false)


    useEffect(() => {
        setSettings({...defaultSettings, ...options})
        multimediacategory_getAll().then(data => {
            setCategories(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    useEffect(() => {
        getImageByFilter();
    }, [page, settings, addItem]);

    useEffect(() => {
        var cErrors = [];
        addItem.map(file => {
            var category = categories.filter(c => c.Id == file.category)[0];

            var fr = new FileReader;
            fr.onload = function () { // file is loaded
                var img = new Image;
                img.onload = function () {
                    var errors = [];
                    if (img.width < category.MINW)
                        errors.push("عرض تصویر کوچک است")
                    if (img.height < category.MINH)
                        errors.push("طول تصویر کوچک است")
                    if (img.width > category.MAXW)
                        errors.push("عرض تصویر بزرگ است")
                    if (img.height > category.MAXH)
                        errors.push("طول تصویر بزرگ است")
                    if (img.height / img.width != category.ARH / category.ARW)
                        errors.push("نسبت ابعاد رعایت نشده")

                    cErrors.push({name: file.image.path, errors: errors})

                };

                img.src = fr.result; // is the data URL because called with readAsDataURL
            };
            fr.readAsDataURL(file.image);
            setCompatibleErrors(cErrors);
        })
    }, [addItem]);

    function getImageByFilter() {
        media_query({
            ...settings.filters,
            paging: {Page: page - 1, Size: 20, Desc: true}
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

    function imageClicked(item) {
        if (settings.isSingle) {
            onSelect(item)
            setClose()
            return;
        }
        if (selectedImages.findIndex(o => o === item.Id) !== -1) {
            setSelectedImages([...selectedImages.filter(o => o !== item.Id)])
        } else {
            setSelectedImages([...selectedImages, item.Id])
        }
    }

    function callBackSelected(e) {
        onSelect(images.content.filter(o => selectedImages.includes(o.Id)));
        setClose()
    }

    function getUploadHtmlHelper(status, failedMessage) {
        switch (status) {
            case "progress":
                return "<div class=\"progress_wrapper\">\n" +
                    "  <div class=\"progress_progressbar\">\n" +
                    "    <div class=\"progress_stylization\"></div>\n" +
                    "  </div>\n" +
                    "</div>";
            case "success":

                return "<div class=\"progress_wrapper\">\n" +
                    "<div class=\"progress_success\">\n" +
                    "<div class=\"MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorSuccess MuiChip-filledSuccess css-1aaj5od-MuiChip-root\">\n" +
                    "<span class=\"MuiChip-label MuiChip-labelMedium css-6od3lo-MuiChip-label\">با موفقیت بارگذاری شد</span></div>\n" +
                    "</div>\n" +
                    "</div>"
            case "failed":
                return "<div class=\"progress_wrapper\">\n" +
                    "<div class=\"progress_success\">\n" +
                    "<div class=\"MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorError MuiChip-clickable MuiChip-clickableColorError MuiChip-filledError css-1jifuqg-MuiButtonBase-root-MuiChip-root\">\n" +
                    "<span class=\"MuiChip-label MuiChip-labelMedium css-6od3lo-MuiChip-label\">" + failedMessage + "</span></div>\n" +
                    "</div>\n" +
                    "</div>"
        }
    }

    function uploadImage(e, file) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("MediaType", "IMAGE");
        if (file.image && file.image.size > 0)
            formData.append("File", file.image);
        else {
            error.showError({message: "فایل انتخاب نشده",});
            return
        }
        if (e.target.category.value) {
            formData.append("CategoryId", e.target.category.value);
        } else {
            error.showError({message: "دسته بندی نا مشخص",});
            return
        }
        if (e.target.name.value) {
            formData.append("Title", e.target.name.value || "");
        } else {
            error.showError({message: "نام تصویر نا مشخص",});
            return
        }
        formData.append("Description", e.target.desc.value || "");
        var lastHtml = e.target.innerHTML;

        e.target.innerHTML = getUploadHtmlHelper("progress")
        console.log(formData);
        media_addImage(formData)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                if (data.status === 200) {
                    e.target.innerHTML = getUploadHtmlHelper("success")

                    // e.target.innerHTML = getUploadHtmlHelper("failed",e.response?.data?.Message||"خطا نا مشخص");
                } else throw new DOMException("خطا در اطلاعات دریافتی");
            }).catch(err => {

            try {
                error.showError({message: err.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
            e.target.innerHTML = lastHtml + getUploadHtmlHelper("failed", err.response?.data?.Message || "خطا نا مشخص");
        });
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0)
            setAddItem(acceptedFiles.map(item => {
                return {
                    image: item,
                    category: settings.filters.CategoryId,
                    name: settings.DefaultNameHelper || item.path,
                    desc: settings.DefaultDiscHelper
                }
            }));
    }, [])
    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        multiple: !settings.isSingle,
        noClick: true,
        onDrop
    })


    function renderUploadMod() {
        return <>

            <Button
                type="button"
                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted m-2"
                onClick={(e) => {
                    setAddItem([]);
                }}
            >
                <ArrowForward/>
            </Button>
            {addItem.map((file, n) => (
                <form key={"image-" + n} onSubmit={(e) => uploadImage(e, file)}>

                    <Grid container direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
                        <Form.Group className={"col-md-3"}>
                            <Fab size={"small"} className={"delete-image-Upload"}
                                 onClick={() => setAddItem(addItem.filter(f => f.image.path != file.image.path))}>
                                <DeleteIcon fontSize={"large"} color={"error"}/>
                            </Fab>
                            <img name={"image"} className={"upload-img"} src={URL.createObjectURL(file.image)}/>
                        </Form.Group>
                        <Form.Group className={"col-md-2"}>
                            <Select
                                className={"dropdown w-100"}
                                inputId="react-select-single"
                                name="category"
                                defaultValue={categories.filter(c => c.Id == file.category).map(data => {
                                    return {label: data.Name, value: data.Id}
                                })[0]}
                                options={categories.map(data => {
                                    return {label: data.Name, value: data.Id}
                                })}
                            />
                            {CompatibleErrors.filter(ce => ce.name == file.name)[0]?.errors?.map(err => (
                                <div className={"row m-1"}>
                                    <WarningSharp color={"error"}/>
                                    <Typography variant={"body2"} color={"red"}>{err}
                                    </Typography>
                                </div>))}
                        </Form.Group>
                        <Form.Group className={"col-md-3"}>
                            <Form.Control
                                name={"name"}
                                type="text"
                                placeholder="نام تصویر"
                                defaultValue={file.name}
                            />
                        </Form.Group>
                        <Form.Group className={"col-md-2"}>
                        <textarea
                            name={"desc"}
                            className="form-control"
                            id="exampleTextarea"
                            rows="3"
                            placeholder="توضیح تصویر"
                            defaultValue={file.desc}
                        />
                        </Form.Group>
                        <Form.Group className={"col-md-2"}>

                            <Button
                                className={"button_danger w-100"}
                                type={"submit"}
                                variant={"contained"}
                                color={"success"}
                                disabled={uploading}
                            >
                                آپلود
                            </Button>
                        </Form.Group>
                    </Grid>

                </form>


            ))}


        </>
    }

    function renderDropArea() {
        return (<p className={"drag-div"}>تصویر را اینجا رها کنید</p>);
    }

    function renderSelectMod() {
        return (<>
            <Grid container alignContent={"center"} alignItems={"center"} justifyContent={"space-between"}>
                {settings.filters.CategoryId ? <div></div> : <Fab
                    size={"small"}
                    onClick={() => setExpanded(!expanded)}
                    sx={{margin: 1, fontSize: 35}}
                    aria-expanded={expanded}>
                    <FilterAlt
                    />
                </Fab>}

                <Button
                    type="button"
                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted m-2"
                    onClick={(e) => {
                        open()
                    }}
                >
                    <AddIcon/>
                </Button>
            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Paper variant="outlined" sx={{margin: 1}}>


                </Paper>
            </Collapse>


            {images.content && <><ImageList cols={settings.rowCount} sx={{width: "100%"}}>
                {images.content.map((item, number) => (
                    <ImageListItem key={number} onClick={() => imageClicked(item)}>
                        <img
                            src={item.Url + "&width=200"}
                            srcSet={item.Url + "&width=200"}
                            alt={item.Title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.Title}
                            subtitle={item.Description}
                            actionIcon={!settings.isSingle &&
                            <Checkbox className={"picker-checkbox"} size={"large"}
                                      checked={selectedImages.some(o => o === item.Id)}
                                      onChange={e => imageClicked(item)}/>}
                        />
                    </ImageListItem>


                ))}
            </ImageList>

                <Grid
                    container
                    direction="row"
                    justifyContent={"center"}
                    alignItems="center">
                    <Pagination count={images.totalPages} page={page} onChange={(e, value) => setPage(value)}/>
                </Grid>

            </>}
        </>);
    }

    function renderImageBox() {
        return (
            <div {...getRootProps()}>
                <input accept="image/png, image/gif, image/jpeg"  {...getInputProps()} />
                {isDragActive ? renderDropArea() : renderSelectMod()}
            </div>
        );
    }

    function RenderModalBody() {
        return addItem.length > 0 ? renderUploadMod() : renderImageBox();
    }

    return (
        <>
            <Modal show={true} size={"xl"} onHide={() => setClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{"انتخاب تصویر "}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {RenderModalBody()}
                </Modal.Body>
                <Modal.Footer>
                    {!settings.isSingle && <Button
                        className={"button_danger"}
                        type={"submit"}
                        onClick={(e) => callBackSelected(e)}
                    >
                        تایید
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImagePicker;
