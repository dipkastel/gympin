import React, {useState} from 'react';
import _EpBase from "../../partials/_EpBase";
import {Add} from "@mui/icons-material";
import {Button, Grid} from "@mui/material";
import _epBaseAddOrEditItem from "../../partials/_epBaseAddOrEditItem";

const _EpCarouselSimpleList = ({items,elements,icon,parent,reloadPage}) => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    return (
        <>
            {items?.map(item=>(
                <_EpBase item={item} elements={elements} icon={icon} parent={parent} reloadPage={reloadPage}>
                    {item.Type+" - "+item.ViewType}
                </_EpBase>
            ))}

             <Grid justifyContent={"center"} alignContent={"center"} sx={{m: 2}}>
                <Button variant={"outlined"} onClick={(e) => setOpenModalAdd(true)}><Add/> </Button>
            </Grid>

            <_epBaseAddOrEditItem elements={elements} itemToEdit={null} parent={parent} openModal={openModalAdd}
                                  onClose={(e) => setOpenModalAdd(false)} reloadPage={reloadPage}/>
        </>
    );
};

export default _EpCarouselSimpleList;
