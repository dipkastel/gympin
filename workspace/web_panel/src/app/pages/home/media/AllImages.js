import React, { Component } from "react";
import { media_getAll } from "../../../api/media.api";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ImagePickerConsts from "../../../partials/picker/image/imagePickerConsts";
import * as utils from "../../../../_metronic/utils/utils";

class AllImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.getAllImages();
  }

  getAllImages() {
    media_getAll()
      .then((data) => {
        this.setState(() => ({
          images: data.data.Data.map((o) => {
            o.selected = false;
            return o;
          }),
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  RenderImages(image) {
    var imageUrl = utils.getImageUrlByName(image.Name.toString(), 200);
    return (
      <Card className={"card "} key={imageUrl}>
        <CardActionArea>
          <CardMedia
            className="media"
            image={imageUrl}
            title="Contemplative Reptile"
          />
          {this.props.selectMode === ImagePickerConsts.SELECTMODE_SINGLE && (
            <input
              type="checkbox"
              className="m_checkbox"
              onChange={(e) => this.selectImage(e, image)}
              checked={image.selected}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <label htmlFor={"title"}>{image.Name}</label>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  selectImage(e, image) {
    var images = [];
    if (e.target.checked) {
      image.selected = true;
      var tempImages = this.state.images;
      images.push(image);
      if (
        this.props.selectMode === ImagePickerConsts.SELECTMODE_SINGLE &&
        this.state.images.filter((o) => o.selected).length > 0
      ) {
        tempImages
          .filter((o) => o !== image && o.selected)
          .map((o) => (o.selected = false));
      }
      tempImages.filter((o) => o !== image).map((o) => images.push(o));
      this.setState(() => ({
        images: images,
      }));
    } else {
      this.state.images
        .filter((o) => o !== image && o.selected)
        .map((o) => images.push(o));
      image.selected = false;
      images.push(image);
      this.state.images
        .filter((o) => o !== image && !o.selected)
        .map((o) => images.push(o));
      this.setState(() => ({
        images: images,
      }));
    }
    this.props.onImageSelect(this.state.images.filter((o) => o.selected));
  }

  render() {
    const images = this.state.images;
    return (
      <>
        <div className="row">{images.map((e) => this.RenderImages(e))}</div>
      </>
    );
  }
}

export default AllImages;
