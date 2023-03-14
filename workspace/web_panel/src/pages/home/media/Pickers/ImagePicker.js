import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Fab,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar, Pagination,
    Paper
} from "@mui/material";
import {ExpandMore, FilterAlt} from '@mui/icons-material';
import {media_getAllImages, media_query} from "../../../../network/api/media.api";
import AddIcon from "@mui/icons-material/Add";
import AddImageModal from "../Image/AddImageModal";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {defaultFilterImages} from "../Image/_ImageFilter";

const defaultSettings = {
    rowCount: 3,
    isSingle: false,
    filters:defaultFilterImages
}

const ImagePicker = ({setClose, onSelect, options}) => {
    const error = useContext(ErrorContext);
    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [page, setPage] = useState(1)
    const [settings, setSettings] = useState({...defaultSettings, ...options})
    const [expanded, setExpanded] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false)

    useEffect(() => {
        getImageByFilter();
    }, [page, settings]);

    function getImageByFilter() {

        console.log({
            ...settings.filters,
            paging: {Page: page - 1, Size: 20, Desc: true}
        })
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
        onSelect(images.filter(o => selectedImages.includes(o.Id)));
        setClose()
    }

    function imageUploadComplete(item) {
        setOpenModalAdd(false);
        setPage(1);
    }
    return (
        <>
            <Modal
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description" show={!openModalAdd} onHide={() => setClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{"انتخاب تصویر "}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid container alignContent={"center"} alignItems={"center"} justifyContent={"space-between"}>
                        <Fab
                            size={"small"}
                            onClick={() => setExpanded(!expanded)}
                            sx={{margin: 1,fontSize:35}}
                            aria-expanded={expanded}>
                            <FilterAlt
                            />
                        </Fab>

                        <Button
                            type="button"
                            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                            onClick={(e) => setOpenModalAdd(true)}
                        >
                            <AddIcon/>
                        </Button>
                    </Grid>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>

                            <Paper variant="outlined"  sx={{margin:1}} >


                            </Paper>
                        </Collapse>



                    {images.content && <><ImageList cols={settings.rowCount} sx={{width: "100%"}}>
                        {images.content.map((item, number) => (
                            <ImageListItem key={number} onClick={() => imageClicked(item)}>
                                <img
                                    src={item.Url+ "&width=200"}
                                    srcSet={item.Url+ "&width=200"}
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


                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={"button_edit"}
                        onClick={() => setClose()}
                    >
                        لغو
                    </Button>
                    {!settings.isSingle && <Button
                        className={"button_danger"}
                        type={"submit"}
                        onClick={(e) => callBackSelected(e)}
                    >
                        تایید
                    </Button>}
                </Modal.Footer>
            </Modal>
            {openModalAdd && <AddImageModal setOpenAddImage={setOpenModalAdd} done={imageUploadComplete}/>}
        </>
    );
};

export default ImagePicker;
