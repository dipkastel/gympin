import React, {Component} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@material-ui/icons/Add";
import {media_getAllName} from "../../../api/media.api";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

class AllImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        this.getAllImages()
    }

    getAllImages() {

        media_getAllName().then(data => {
            console.log(data.data.Data);
            this.setState(() => ({
                images: data.data.Data
            }));
            console.log(this.state.images);

        }).catch(e => {
            console.log(e);
        })
    }

    RenderImages(image) {
        var imageUrl = "http://api.gympin.ir/v1/multimedia/getByName?fileName=" + image.toString() + "&width=200&height=200";
        console.log("imageUrl");
        console.log(imageUrl);
        return (
            <Card className={"card "} key={imageUrl}>
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={imageUrl}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <label htmlFor={"title"}>{image}</label>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }


    render() {
        const addMode = this.props.addMode
        const images = this.state.images
        return (
            <>
                <Portlet>
                    <PortletHeader
                        title="رسانه ها"
                        toolbar={
                            <PortletHeaderToolbar>
                                <button
                                    type="button"
                                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                    onClick={(e) => addMode(e)}
                                >
                                    <AddIcon/>
                                </button>
                            </PortletHeaderToolbar>
                        }
                    />

                    <PortletBody>
                        <div className="kt-section kt-margin-t-30">
                            <div className="kt-section__body">
                                <div className="row">
                                    {images.map(e => this.RenderImages(e))}
                                </div>
                            </div>
                        </div>
                    </PortletBody>
                </Portlet>
            </>
        );
    }

}

export default AllImages;
