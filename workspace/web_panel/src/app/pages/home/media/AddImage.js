import React, { Component } from "react";
import ImageAddItem from "./ImageAddItem";
import { multimediacategory_getAll } from "../../../api/mediaCategories.api";

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      categories: [],
    };
  }
  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    multimediacategory_getAll()
      .then((data) => {
        this.setState(() => ({
          categories: data.data.Data,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    var images = this.state.images;
    return (
      <div>
        <div className="row">
          {images.map((e, index) => this.RenderImageForUpload(e, index))}
        </div>
        <br />
        <input
          type="file"
          id="file_input"
          onChange={(event) => this.inputChange(event)}
          accept="image/*"
          multiple
        />
      </div>
    );
  }

  RenderImageForUpload(e, index) {
    return (
      <ImageAddItem image={e} key={e.name} categories={this.state.categories} />
    );
  }

  inputChange(event) {
    event.preventDefault();
    this.setState(() => ({
      images: Object.values(event.target.files),
    }));
  }
}

export default AddImage;
