import React, {useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {
    Button,
    Tab,
    Tabs
} from "@material-ui/core";
import "./AddMedia.css"
import ImageAddItem from "./ImageAddItem";

function AddMedia() {
    const [tab, setTab] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesToUpload, setImagesToUpload] = useState([[]]);

    function RenderImageForUpload(e,index) {
        return (
                <ImageAddItem image={e} key={e.name} addToImages={addToImages}/>
        )
    }
    function addToImages(image){
        setImagesToUpload(prev=>{
            var item = []
            prev.forEach(o=>{
                if(o) item.push(o)
            })
            item.push(image)
            return item
        })
    }

    function inputChange(event) {
        event.preventDefault()
        setImagesToUpload([])
        setImages(Object.values(event.target.files))
    }
    return (
        <>
            <Portlet>
                <PortletHeader
                    toolbar={
                        <PortletHeaderToolbar>
                            <Tabs
                                component="div"
                                className="builder-tabs"
                                value={tab}
                                onChange={(_, nextTab) => {
                                    setTab(nextTab)
                                }}
                            >
                                <Tab label="image"/>
                                <Tab label="video"/>
                                <Tab label="sound"/>
                            </Tabs>
                        </PortletHeaderToolbar>
                    }
                />

                {tab === 0 && (
                    <PortletBody>
                        <div className="kt-section kt-margin-t-30">
                            <div className="kt-section__body">
                                <div className="row">
                                    {images.map((e,index) => RenderImageForUpload(e,index))}
                                </div>
                                <br/>
                                <input type="file" id="file_input" onChange={(event) => inputChange(event)}
                                       accept="image/*" multiple/>
                            </div>
                        </div>
                    </PortletBody>
                )}

                {tab === 1 && (
                    <PortletBody>
                        <div className="kt-section kt-margin-t-30">
                            <div className="kt-section__body">
                                2
                            </div>
                        </div>
                    </PortletBody>
                )}

                {tab === 2 && (
                    <PortletBody>
                        <div className="kt-section kt-margin-t-30">
                            <div className="kt-section__body">
                                3
                            </div>
                        </div>
                    </PortletBody>
                )}
            </Portlet>
        </>
    );
}

export default AddMedia;
