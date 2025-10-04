import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Add} from "@mui/icons-material";
import {
    TicketFoods_addMultimeida,
    TicketFoods_deleteMultimedia,
    TicketFoods_GetMultimedias
} from "../../../../../network/api/TicketFoods.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import ImagePicker from "../../../media/Pickers/ImagePicker";
import {PlaceGym_deleteMultimedia} from "../../../../../network/api/placeGym.api";
import {Modal} from "react-bootstrap";

const _FoodItemEditImage = ({selectedFoodItem}) => {


    const error = useContext(ErrorContext);
    const [foodItemImages,setFoodItemImages] = useState([]);
    const [itemToDelete,setItemToDelete] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false)


    useEffect(() => {
        getImages();
    }, []);


    function getImages() {
        if(!selectedFoodItem) return;
        TicketFoods_GetMultimedias({Id: selectedFoodItem.Id}).then(data => {
            setFoodItemImages(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function setAsDefaultImage(item){

    }


    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            TicketFoods_deleteMultimedia({TicketFood: {Id: selectedFoodItem.Id}, Multimedia: {Id: itemToDelete.Id}})
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


    function selectImage(images) {
        TicketFoods_addMultimeida({TicketFood: {Id: selectedFoodItem.Id}, Multimedia:{Id: images.Id}}).then(data => {
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

    return (
        <>
            <ImageList cols={4} sx={{width: "100%"}}>
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

                <ImageListItem  sx={{border:"none"}}>
                    <Card variant={"outlined"} sx={{width:"fit-content"}} onClick={(e) => setOpenModalAdd(true)}>
                        <CardActionArea >
                            <Add sx={{fontSize:125,color:"#999"}} />
                        </CardActionArea>
                    </Card>
                </ImageListItem>
            </ImageList>

            {openModalAdd && <ImagePicker setClose={() => setOpenModalAdd(false)} onSelect={selectImage} options={{
                rowCount: 8,
                isSingle: true,
                filters: {CategoryId: 8},
                DefaultDiscHelper: "تصویر عذا " + selectedFoodItem?.Name
            }}/>}
            {renderModalDelete()}
        </>
    );
};

export default _FoodItemEditImage;
