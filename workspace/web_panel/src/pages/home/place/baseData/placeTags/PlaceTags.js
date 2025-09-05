import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Chip, Divider, IconButton, Paper, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {
    tag_add,
    tag_addToPlace,
    tag_getPlaceTags,
    tag_query,
    tag_removeFromPlace,
} from "../../../../../network/api/Tags.api";
import {Row} from "reactstrap";


const PlaceTags = ({place}) => {
    const error = useContext(ErrorContext);
    const [searchString, SetSearchString] = useState("")
    const [searchedTags, SetSearchedTags] = useState([])
    const [placeTags, SetPlaceTags] = useState([])


    useEffect(() => {
        getTags();
    }, [searchString]);

    useEffect(() => {
        if(place.Id)
            getPlaceTags();
    }, [place]);



    function getTags() {

        tag_query({
            queryType: "SEARCH",
            Name:searchString||null,
            paging: {Page: 0, Size: 20, Desc: true}
        }).then(result => {
            SetSearchedTags(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getPlaceTags() {

        tag_getPlaceTags({placeId:place.Id}).then(result => {
            SetPlaceTags(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addTagToPlace(item) {
        console.log(item);
        tag_addToPlace({Place:{Id:place.Id},Id:item.Id}).then(result => {
            console.log(result);
            SetPlaceTags(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function removePlaceTags(item) {

        tag_removeFromPlace({Place:{Id:place.Id},Id:item.Id}).then(result => {
            SetPlaceTags(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addTag() {
        tag_add({
            Name:searchString,
            Priority:400,
            TagTypes:"None"
        }).then(result => {
            SetSearchedTags(result.data.Data);
            SetSearchString("");
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
            <Portlet>
                <PortletHeader
                    title="تگ ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <TextField
                                label={"جستجو"}
                                variant={"outlined"}
                                size={"small"}
                                value={searchString}
                                onChange={e => SetSearchString(e.target.value)||""}
                            />
                            {searchString&&<IconButton onClick={() => addTag()}>
                                <AddIcon/>
                            </IconButton>}
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>
                    <Row>
                        {searchedTags?.content?.map(item=>(
                            <Chip sx={{p: 1, m: 1}} key={"Tag" + item.Id}
                                  color={"default"}
                                  size={"small"}
                                  label={item.Name}
                                  variant={"outlined"}
                                  onClick={(e) => addTagToPlace(item)}
                            />
                        ))}
                    </Row>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>

                    <Row>
                        {placeTags?.map(item=>(
                            <Chip sx={{p: 1, m: 1}} key={"Tag" + item.Id}
                                  color={"primary"}
                                  size={"small"}
                                  label={item.Name}
                                  variant={"filled"}
                                  onClick={(e) => removePlaceTags(item)}
                            />
                        ))}
                    </Row>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default PlaceTags;
