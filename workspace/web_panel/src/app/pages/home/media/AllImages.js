import React, {Component} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@material-ui/icons/Add";
import { media_getAllName} from "../../../api/media.api";

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
        return (
            <React.Fragment key={image}>
                {image}
                <img src={"https://api.gympin.ir/v1/multimedia/getByName/"+image}  />
            </React.Fragment>
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
                        {images.map(e=>this.RenderImages(e))}
                    </PortletBody>
                </Portlet>
            </>
        );
    }

}

export default AllImages;
