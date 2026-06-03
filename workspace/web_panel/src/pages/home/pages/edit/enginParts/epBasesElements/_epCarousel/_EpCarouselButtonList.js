import React, {useState} from 'react';
import _EpBase from "../../partials/_EpBase";
import {Add} from "@mui/icons-material";
import {Button, Grid} from "@mui/material";
import _epBaseAddOrEditItem from "../../partials/_epBaseAddOrEditItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const _EpCarouselButtonList = ({items,elements,icon,parent,reloadPage}) => {

    const [openModalAdd,setOpenModalAdd] = useState(false);

    return (
        <>
            {items?.sort((a, b) => {
                return a.Priority - b.Priority
            }).map(item=>(
                <_EpBase item={item} elements={elements} icon={icon} parent={parent} reloadPage={reloadPage}>
                    <Grid sx={{placeItems: "center", alignItems: "center", alignContent: "center", mt: 1}} alignItems={"center"}
                          alignContent={"center"} textAlign={"center"} direction={"column"} container >
                        <Paper sx={{m: "auto", width: "100px", borderRadius: 8, p: 2}} >
                            <img width={64} src={item?.multimedia?.Url}/>
                        </Paper>
                        <Typography sx={{fontWeight: "600", textAlign: "center", mt: 1}} variant={"body2"}>{item?.Title}</Typography>
                    </Grid>
                </_EpBase>
            ))}

            <Grid  justifyContent={"center"} alignContent={"center"} sx={{m: 2}} >
                <Button variant={"outlined"} onClick={(e)=>setOpenModalAdd(true)}><Add/> </Button>
            </Grid>

            <_epBaseAddOrEditItem elements={elements} itemToEdit={null} parent={parent} openModal={openModalAdd}
                                  onClose={(e) => setOpenModalAdd(false)} reloadPage={reloadPage}/>
        </>
    );
};

export default _EpCarouselButtonList;
