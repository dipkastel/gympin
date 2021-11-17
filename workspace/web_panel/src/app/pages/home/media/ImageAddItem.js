import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";

const ImageAddItem = (param) => {
    const [store,SetStore] = useState(false)
    async function formSubmit(event) {
        event.preventDefault()
        // param.addToImages({
        //     file: param.image,
        //     PartName: event.target.title.value,
        //     // desc: event.target.desc.value,
        //     User:{Id:18},
        //     MediaType:"IMAGE"
        // })

         param.addToImages(param.image)
        SetStore(true)
    }
    return (
        <>

            <Card className={"card " + (store&&"MuiCard-success")}>
                <form onSubmit={formSubmit}>
                    <CardActionArea>
                        <CardMedia
                            className="media"
                            image={URL.createObjectURL(param.image)}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <label htmlFor={"title"}>title</label>
                                <input name="title" id={"title"} type={"text"} className="text-field"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <label htmlFor={"description"}>description</label>
                                <textarea name="desc" id={"description"} className="text-area" type={"text"}/>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {!store&&
                    <CardActions>

                        <Button type="submit" size="small" color="primary" >
                            آماده ارسال
                        </Button>
                    </CardActions>
                    }
                </form>
            </Card>
        </>
    );
};

export default ImageAddItem;
