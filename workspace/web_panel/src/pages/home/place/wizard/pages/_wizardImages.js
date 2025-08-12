import React, {useContext, useEffect, useState} from 'react';
import {
    PlaceGym_addMultimeida, PlaceGym_addMultimeidaList,
    PlaceGym_deleteMultimedia,
    PlaceGym_GetMultimedias
} from "../../../../../network/api/placeGym.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImagePicker from "../../../media/Pickers/ImagePicker";

const _wizardImages = ({allowNext}) => {


    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [placeImages, SetPlaceImages] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)

    useEffect(() => {
        getPlaceImages();
    }, []);
    useEffect(() => {
            allowNext(placeImages.length>0)
    }, [placeImages]);

    function getPlaceImages() {
        PlaceGym_GetMultimedias({Id: placeId}).then(data => {
            SetPlaceImages(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function DeleteImage(e,item) {

        e.preventDefault()
        PlaceGym_deleteMultimedia({Place:{Id: placeId},Multimedia:{Id:item.Id}})
            .then(data => {
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


    function selectImage(images){

        var multimedia = [];
        images.map( image=>{
            multimedia.push({Id:image.Id})
        })
        PlaceGym_addMultimeidaList({Place:{Id: placeId},Multimedias:multimedia}).then(data => {
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

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="تصاویر مجموعه"
                />

                <PortletBody>

                    <ImageList cols={4} sx={{width: "100%"}}>
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
                                            onClick={(e)=>DeleteImage(e,item)}
                                        >
                                            <DeleteIcon
                                                color={"error"}/>
                                        </IconButton>
                                    }

                                />
                            </ImageListItem>
                        ))}

                        <ImageListItem onClick={(e=>setOpenModalAdd(true))} >
                            <img
                                src={"https://api.gympin.ir/resource/image?Id=78"}
                                srcSet={"https://api.gympin.ir/resource/image?Id=78"}
                                alt={"افزودن تصویر"}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </ImageList>
                </PortletBody>
            </Portlet>
            {openModalAdd&&<ImagePicker setClose={()=>setOpenModalAdd(false)} onSelect={selectImage} options={{rowCount: 8,isSingle:false,filters:{CategoryId:3}}} />}
        </>
    );
};

export default _wizardImages;
