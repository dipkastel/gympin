import React, {useEffect, useState} from 'react';
import * as HomeItemApi from "../../../../api/HomeItem.api";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Link, Typography} from "@mui/material";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {widgetList} from "../widgetList";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAddItem from "./ModalAddItem";
import HomeChild from "../HomeMyChild/HomeChild";

const SelectItem = ({addItemToList}) => {

    const [possibleItems, SetPossibleItems] = useState([]);
    const [selectedHomeItem, SetSelectedHomeItem] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [dataChanges, SetDataChanges] = useState([]);

    useEffect(() => {
        HomeItemApi._getAll().then(result => {
            console.log(result)
            SetPossibleItems(result.data.Data)
        }).catch(e => console.log(e))
    }, [dataChanges]);


    function DeleteItem(item) {
        HomeItemApi._delete(item).then(result => {
            SetDataChanges(result)
        }).catch(e => console.log(e))
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={"انتخاب آیتم های کالکشن"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={() => SetOpenModalAdd(!openModalAdd)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {widgetList.map((widget, number) => (
                                <Accordion key={number}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{widget}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        {possibleItems.filter(o => o.Type === widget).map(item => (
                                            <Grid
                                                key={item.Id}
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Link className="row" onClick={() => SetSelectedHomeItem(item)}>
                                                    {item.Name}
                                                </Link>
                                                <Grid>
                                                    <IconButton onClick={() => addItemToList(item)}>
                                                        <FileUploadIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => DeleteItem(item)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>


                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            ))}

                        </div>
                    </div>
                </div>
            </Portlet>
            <ModalAddItem openModalAdd={openModalAdd} SetOpenModalAdd={SetOpenModalAdd}
                          SetDataChanges={SetDataChanges}/>
            {selectedHomeItem && <HomeChild selectedHomeItem={selectedHomeItem} SetDataChanges={SetDataChanges}/>}

        </>

    );
};

export default SelectItem;

