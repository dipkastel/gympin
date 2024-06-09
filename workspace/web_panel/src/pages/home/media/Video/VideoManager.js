import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Pagination,
    Typography
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {media_query} from "../../../../network/api/media.api";
import {defaultFilterImages} from "../Image/_ImageFilter";

const VideoManager = (props, ref) => {
    const error = useContext(ErrorContext);
    const [videos, setVideos] = useState([])
    const [pagination, setPagination] = useState({Page: 0, Size: 20})
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(20)
    const [itemToDetail, setItemToDetail] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [filters, SetFilters] = useState(defaultFilterImages);

    useEffect(() => {
        getVideoByPage(pagination);
    }, [pagination]);

    useImperativeHandle(ref, () => ({
        OpenModal(item) {
            alert(item);
        }
    }));
    function getVideoByPage(page) {

        media_query({
            ...filters,
            paging: {Page: page - 1, Size: perPage, Desc: true}
        }).then(result => {
            setVideos(result.data.Data);
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

            {videos.content && (<>
                <Grid container spacing={1}>
                    {videos.content.map((item, number) => (
                        <Grid container item xs={2} key={number}>
                            <Card sx={{width: "100%"}}>
                                <CardActionArea onClick={() => setItemToDetail(item)}>
                                    <CardMedia
                                        sx={{height: 140, backgroundSize: "contain"}}
                                        image={item.Url + "&width=200"}
                                        loading={"lazy"}
                                        title={item.Name}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color={"darkgray"} component="p">
                                            {item.Title || ""}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.Description | ""}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                <CardActions disableSpacing>
                                    <IconButton aria-label="delete" onClick={() => setItemToDelete(item)}>
                                        <Delete/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>)
                    )}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent={"center"}
                    alignItems="center">
                    <Pagination count={videos.totalPages} page={page} onChange={(e, value) => setPage(value)}/>
                </Grid>
            </>)}
        </>
    );
};

export default forwardRef(VideoManager);
