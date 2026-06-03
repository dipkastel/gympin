import React, {useState} from 'react';
import _EpBase from "../../partials/_EpBase";
import {Add} from "@mui/icons-material";
import {Button, Grid} from "@mui/material";
import _epBaseAddOrEditItem from "../../partials/_epBaseAddOrEditItem";
import Typography from "@mui/material/Typography";

const _EpBannerFull = ({items, elements, icon, parent, reloadPage}) => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    return (
        <>
            <Grid  sx={{placeItems: "center", alignItems: "center", alignContent: "center", mt: 1}} spacing={1} alignItems={"center"}
                  alignContent={"center"} textAlign={"center"} direction={"row"} container>
            {items?.sort((a, b) => {
                return a.Priority - b.Priority
            }).map(item => (
                <Grid item size={{xs: 12, md: 4}}>
                    <_EpBase item={item} elements={elements} parent={parent} icon={icon} reloadPage={reloadPage}>
                            <img width={"100%"} src={item?.multimedia?.Url}/>
                            <Typography sx={{fontWeight: "600", textAlign: "center", mt: 1}} variant={"body2"}>{item.ViewType}</Typography>
                    </_EpBase>
                </Grid>
            ))}
            </Grid>

            <Grid justifyContent={"center"} alignContent={"center"} sx={{m: 2}}>
                <Button variant={"outlined"} onClick={(e) => setOpenModalAdd(true)}><Add/> </Button>
            </Grid>

            <_epBaseAddOrEditItem elements={elements} itemToEdit={null} parent={parent} openModal={openModalAdd}
                                  onClose={(e) => setOpenModalAdd(false)} reloadPage={reloadPage}/>
        </>
    );
};

export default _EpBannerFull;
