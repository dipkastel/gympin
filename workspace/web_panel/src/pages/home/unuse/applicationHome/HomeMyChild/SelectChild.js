import React, {useContext, useEffect, useState} from 'react';
import * as HomeChildApi from "../../../../../network/api/homeChild.api";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Grid,
    IconButton,
    Link,
    Typography
} from "@mui/material";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {widgetList} from "../widgetList";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAddChild from "./ModalAddChild";
import {Image} from "react-bootstrap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const SelectChild = ({addItemToList}) => {
    const error = useContext(ErrorContext);

    const [possibleItems, SetPossibleItems] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [dataChanges, SetDataChanges] = useState([]);

    useEffect(() => {
        HomeChildApi._getAll().then(result => {
            SetPossibleItems(result.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, [dataChanges]);


    function DeleteItem(item) {
        HomeChildApi._delete({Id:item.Id}).then(result=>{
            SetDataChanges(result)
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
                    title={"انتخاب آیتم های کالکشن"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={()=>SetOpenModalAdd(!openModalAdd)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {widgetList.map((widget,number) => (
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
                                                <Container>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-start"
                                                        alignItems={"start"}
                                                    >
                                                        <Grid item>
                                                            {item.ImageUrl && (<><br/><Image src={item.ImageUrl} height={"100px"}/> </>)}
                                                        </Grid>
                                                        <Grid item sx={{margin: 1}}>
                                                            {item.Title && (<><br/>{item.Title}</>)}
                                                            {item.Description && (<><br/>{item.Description}</>)}
                                                            {item.Destination && (<><br/>{item.Destination + " - " + item.Data}</>)}
                                                        </Grid>

                                                    </Grid>
                                                </Container>
                                                <Grid>
                                                    <IconButton   onClick={() => addItemToList(item)}>
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
            <ModalAddChild openModalAdd={openModalAdd} SetOpenModalAdd={SetOpenModalAdd} SetDataChanges={SetDataChanges}/>

        </>

    );
};

export default SelectChild;

