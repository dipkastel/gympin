import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImagePicker from "../../../media/Pickers/ImagePicker";
import {
    PlaceGym_addMultimeidaList,
    PlaceGym_deleteMultimedia,
    PlaceGym_setDefaultMultimedia
} from "../../../../../network/api/gym.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {media_query} from "../../../../../network/api/media.api";
import {
    PlaceCounseling_addMultimeidaList,
    PlaceCounseling_deleteMultimedia,
    PlaceCounseling_setDefaultMultimedia
} from "../../../../../network/api/Counseling.api";


const CounselingImages = ({counseling}) => {
    const error = useContext(ErrorContext);
    const [images, SetImages] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getImages();
    }, []);

    function getImages() {
        media_query({
            PlaceId: counseling.Id,
            paging: {Page: 0, Size: 100, Desc: false}
        }).then(result => {
            SetImages(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function selectImage(images) {
        var multimedia = [];
        images.map(image => {
            multimedia.push({Id: image.Id})
        })
        PlaceCounseling_addMultimeidaList({Place: {Id: counseling.Id}, Multimedias: multimedia}).then(data => {
            error.showError({message: "عملیات موفق",});
            getImages()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setAsDefaultImage(image) {
        PlaceCounseling_setDefaultMultimedia({Place: {Id: counseling.Id}, Multimedia: image})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getImages()
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
            PlaceCounseling_deleteMultimedia({Place: {Id: counseling.Id}, Multimedia: {Id: itemToDelete.Id}})
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
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف تصویر - اطلاعات "}</Modal.Title>
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


                    {images.length > 0 && <ImageList cols={3} sx={{width: "100%"}}>
                        {images.map((item, number) => (
                            <ImageListItem key={number} sx={{border: item.default ? "2px solid #e7333e" : "none"}}>
                                <img
                                    src={item.Url}
                                    srcSet={item.Url}
                                    alt={item.Title}
                                    loading="lazy"
                                    onClick={(e) => setAsDefaultImage(item)}
                                />
                                <ImageListItemBar
                                    sx={{direction: "ltr"}}
                                    title={item.Title}
                                    subtitle={item.Description}
                                    actionIcon={

                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                            aria-label={item.title}
                                            onClick={() => setItemToDelete(item)}
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
            {openModalAdd && <ImagePicker setClose={() => setOpenModalAdd(false)} onSelect={selectImage} options={{
                rowCount: 8,
                isSingle: false,
                filters: {CategoryId: 3},
                DefaultDiscHelper: "مجموعه " + counseling.Name
            }}/>}
            {itemToDelete && renderModalDelete()}
        </>
    );
};

export default CounselingImages;
