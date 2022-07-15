import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { media_addImage } from "../../../api/media.api";

const ImageAddItem = (param) => {
  const [sent, SetSent] = useState(false);
  async function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("multipartFile", param.image);
    formData.append("title", event.target.title.value);
    formData.append("description", event.target.desc.value);
    formData.append("categoryParam.id", event.target.category.value);
    media_addImage(formData)
      .then((data) => {
        SetSent(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <Card className={"card " + (sent && "MuiCard-success")}>
        <form onSubmit={formSubmit}>
          <CardActionArea>
            <CardMedia
              className="media"
              image={URL.createObjectURL(param.image)}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <label htmlFor={"category"}>category</label>
                <select
                  id={"category"}
                  name={"category"}
                  className="text-field"
                >
                  {param.categories.map((m) => (
                    <option value={m.Id}>{m.Name}</option>
                  ))}
                </select>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <label htmlFor={"title"}>title</label>
                <input
                  name="title"
                  id={"title"}
                  type={"text"}
                  className="text-field"
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <label htmlFor={"description"}>description</label>
                <textarea
                  name="desc"
                  id={"description"}
                  className="text-area"
                  type={"text"}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
          {!sent && (
            <CardActions>
              <Button type="submit" size="small" color="primary">
                ارسال
              </Button>
            </CardActions>
          )}
        </form>
      </Card>
    </>
  );
};

export default ImageAddItem;
