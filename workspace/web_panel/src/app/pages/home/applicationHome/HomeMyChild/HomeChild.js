import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import * as HomeItemApi from "../../../../api/HomeItem.api";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Container, Grid, IconButton, Link} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectItem from "../HomeItem/SelectItem";
import SelectChild from "./SelectChild";

const HomeChild = ({selectedHomeItem,SetDataChanges}) => {
    const [showAdd, SetShowAdd] = useState(false);
    console.log("selectedHomeItem",selectedHomeItem)


    function removeItem(item) {
        const update_data = {
            Id:selectedHomeItem.Id,
            Name:selectedHomeItem.Name,
            Items: selectedHomeItem.Items.filter(p => p.Id !== item.Id).map(o=>{ return { Id:o.Id}})
        };
        console.log(update_data)
        HomeItemApi._update(update_data).then(result => {
            console.log(result)
            SetDataChanges(selectedHomeItem.Items.filter(p => p.Id !== item.Id))
        }).catch(e => console.log(e))
    }

    function addItem(item) {
        const update_data = {
            Id:selectedHomeItem.Id,
            Name:selectedHomeItem.Name,
            Items: selectedHomeItem.Items.concat(item).map(o=>{ return { Id:o.Id}})
        };
        HomeItemApi._update(update_data).then(result => {
            console.log(result)
            SetDataChanges(selectedHomeItem.Items.filter(p => p.Id !== item.Id))
        }).catch(e => console.log(e))
    }

    function renderCollectionsRow(data, index) {
        return (
            <div className="kt-widget4__item " key={index}>
                <div className="kt-widget4__pic kt-widget4__pic--pic ">
                    <img alt="" src={toAbsoluteUrl("/media/users/100_11.jpg")}/>
                </div>
                <div className="kt-widget4__info ">
                        <Container>


                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems={"start"}
                            >
                                <Grid item>
                                    {data.ImageUrl && (<><br/><Image src={data.ImageUrl} height={"100px"}/> </>)}
                                </Grid>
                                <Grid item sx={{margin: 1}}>
                                    {data.Title && (<><br/>{data.Title}</>)}
                                    {data.Description && (<><br/>{data.Description}</>)}
                                    {data.Destination && (<><br/>{data.Destination + " - " + data.Data}</>)}
                                </Grid>

                            </Grid>
                        </Container>
                </div>
                <span className="pr-1">

                <IconButton onClick={() => removeItem(data)}>
                   <DeleteIcon/>
                </IconButton>
        </span>
            </div>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={selectedHomeItem.Type + " - " + selectedHomeItem.Priority}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={()=>SetShowAdd(!showAdd)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {selectedHomeItem.Items && selectedHomeItem.Items.map(renderCollectionsRow)}
                        </div>
                    </div>
                </div>
            </Portlet>

            {showAdd&&<SelectChild addItemToList={addItem}/>}
        </>
    );
};

export default HomeChild;


