import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, Checkbox, Fab, IconButton, ImageList, ImageListItem, ImageListItemBar, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImagePicker from "../../../media/Pickers/ImagePicker";
import {Place_addMultimeida, Place_deleteMultimedia, Place_GetMultimedias} from "../../../../../network/api/place.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";


const PlaceImage = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeImages, SetPlaceImages] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getPlaceImages();
    }, []);

    function getPlaceImages() {
        Place_GetMultimedias({Id: place.Id}).then(data => {
            SetPlaceImages(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function selectImage(image){

        Place_addMultimeida({Place:{Id: place.Id},Multimedia:{Id:image.Id}}).then(data => {
            error.showError({message: "عملیات موفق",});
            getPlaceImages()
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
            Place_deleteMultimedia({Place:{Id: place.Id},Multimedia:{Id:itemToDelete.Id}})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getPlaceImages()
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف قوانین - اطلاعات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Title}
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

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="تصاویر مجموعه"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>


                    {placeImages.length > 0 && <ImageList cols={3} sx={{width: "100%"}}>
                        {placeImages.map((item, number) => (
                            <ImageListItem key={number} >
                                <img
                                    src={item.Url}
                                    srcSet={item.Url}
                                    alt={item.Title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{direction:"ltr"}}
                                    title={item.Title}
                                    subtitle={item.Description}
                                    actionIcon={

                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={item.title}
                                            onClick={()=>setItemToDelete(item)}
                                        >
                                            <DeleteIcon
                                                color={"error"}/>
                                        </IconButton>
                                    }

                                />
                            </ImageListItem>
                        ))}
                    </ImageList>}
                </PortletBody>
            </Portlet>
            {openModalAdd&&<ImagePicker setClose={()=>setOpenModalAdd(false)} onSelect={selectImage} options={{rowCount: 4,isSingle:true}} />}
            {itemToDelete&&renderModalDelete()}
        </>
    );
};

export default PlaceImage;
