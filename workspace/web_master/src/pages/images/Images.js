import React, {useContext, useEffect, useState} from 'react';
import {gym_deleteMultimedia, gym_getMultimedias} from "../../network/api/place.api";
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import getArrenge from "./imageListArrenges";
import {ErrorContext} from "../../components/GympinPagesProvider";
import 'react-advanced-cropper/dist/style.css';
import DashboardIcon from "@mui/icons-material/Dashboard";
import _AddImage from "./_AddImage";

const Images = ({introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [imageList, SetImageList] = useState([])
    const [openImage, setOpenImage] = useState(null);

    useEffect(() => {
        getImageList();
    }, []);

    function getImageList() {
        gym_getMultimedias(place?.Id).then(result => {
            SetImageList(result.data.Data);
            try {
                introCanGoNext(result.data.Data.length > 0);
            } catch (e) {
            }

        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function deleteMultimedia(event, item) {
        gym_deleteMultimedia({
            Place: {Id: place.Id},
            Multimedia: {Id: item.Id}
        }).then(result => {
            getImageList()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>

            <Container>
                <title>مدیریت تصاویر</title>
                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <DashboardIcon/>
                            <Typography sx={{px: 1}}>{"مدیریت تصاویر"}</Typography>
                        </Grid>
                    </Card>
                </Grid>

                <Grid sx={{p: 1}} container columns={12}>
                    <Grid sx={{p: 1}} size={{xs: 12, sm: 12, md: 12, lg: 12}}>

                        <Card sx={{width: "100%"}} variant={"outlined"}>

                            <CardHeader
                                sx={{paddingBottom: 0}}
                                title={"تصاویر"}
                                action={<_AddImage renewList={getImageList}/>}
                            />
                            <CardContent sx={{margin: 0}}>

                                <ImageList
                                    variant={"quilted"}
                                    cols={4}
                                    rowHeight={121}>
                                    {imageList.map((item, numb) => (
                                        <ImageListItem
                                            key={item.Id} cols={getArrenge(imageList.length)[numb].cols || 1}
                                            rows={getArrenge(imageList.length)[numb].rows || 1}
                                            onClick={(e) => setOpenImage(item)}
                                        >
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
                                                        onClick={(e) => deleteMultimedia(e, item)}
                                                    >
                                                        <DeleteIcon color={"primary"}/>
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default Images;
