import React, {useState} from 'react';
import _EpBase from "../../partials/_EpBase";
import {Add} from "@mui/icons-material";
import {Button, Grid} from "@mui/material";
import _epBaseAddOrEditItem from "../../partials/_epBaseAddOrEditItem";
import Typography from "@mui/material/Typography";

const _EpTextTitleMore = ({items, elements, icon, parent, reloadPage}) => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    return (
        <>
            {items?.sort((a, b) => {
                return a.Priority - b.Priority
            }).map(item => (
                <_EpBase item={item} elements={elements} parent={parent} icon={icon} reloadPage={reloadPage}>
                    <Typography sx={{fontWeight: "600", textAlign: "center", mt: 1}} variant={"body2"}>{item?.Title}</Typography>
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

export default _EpTextTitleMore;
