import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {media_getAllImages} from "../../../../network/api/media.api";
import {Delete, Share, ExpandMore} from '@mui/icons-material';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Fab,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
const VideoManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [images, setImages] = useState([])
    const [pagination, setPagination] = useState({Page: 0, Size: 20})

    useEffect(() => {
        getVideoByPage(pagination);
    }, [pagination]);
    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            alert(item);
        }
    }));
    function getVideoByPage(page) {

        media_getAllImages(page).then(result => {
            var items = [];
            if(images.length>0&&pagination.Page!==0){
                items.push(...images)
            }
            items.push(...result.data.Data)
            setImages(items);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function goForNexPage() {
        setPagination({Page: pagination.Page+1, Size: 20})
    }

    return (
        <>
            {images.length>0&&<Grid container spacing={1}>
                {images.map((item, number) => (
                        <Grid container item xs={2} key={number}>
                            <Card sx={{width: "100%"}}>
                                <CardActionArea >
                                    <CardMedia
                                        sx={{height: 140, backgroundSize: "contain"}}
                                        image={item.Url}
                                        loading={"lazy"}
                                        title={item.Name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom  variant="h6" component="h3">
                                            {item.Name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.Description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                <CardActions disableSpacing>
                                    <IconButton aria-label="delete">
                                        <Delete/>
                                    </IconButton>
                                    <IconButton aria-label="Share">
                                        <Share/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>)
                )}


            </Grid>}
            {images&&<Grid container sx={{margin:2}} justifyContent={"center"} alignContent={"center"}>

                <Fab variant="extended" color="primary" aria-label="Add" onClick={e=>goForNexPage()}>
                    <ExpandMore/>
                    Load More
                </Fab>
            </Grid>}
        </>
    );
};

export default forwardRef(VideoManager);
