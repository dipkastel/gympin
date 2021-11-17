import React, {Component} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@material-ui/icons/Add";
import {media_getAll} from "../../../api/media.api";

class AllImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allImages: []
        };
    }

    componentDidMount() {
        this.getAllImages()
    }

    getAllImages() {

        media_getAll({"mediaType":"IMAGE"}).then(data => {
            console.log(data.data.Data);
            this.setState(() => ({
                allUsersArray: data.data.Data
            }));

        }).catch(e => {
            console.log(e);
        })
    }

    RenderImages(image) {
        return (
            <>
                <image src={image.src} />
            </>
        )
    }

    render() {
        const addMode = this.props.addMode
        const allImages = this.state.allImages
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
                        {allImages.map(e=>this.RenderImages(e))}
                    </PortletBody>
                </Portlet>
            </>
        );
    }

}

export default AllImages;
