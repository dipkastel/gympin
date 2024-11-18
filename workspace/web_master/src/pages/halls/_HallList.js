import React, {useContext, useState} from 'react';
import {
    Avatar, Button,
    Card,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    Grid,
    IconButton,
    List, ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {personnelRoles} from "../../helper/enums/personnelRoles";
import {PlacesQr_delete} from "../../network/api/placeQr.api";
import {Form} from "react-bootstrap";
import {placePersonnel_delete} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {Halls_delete} from "../../network/api/halls.api";

const _HallList = ({hallList, renewList}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const [hallToDelete,SetHallToDelete]= useState(null)
    function renderModalDelete(){
        const deleteItem = (e)=>{
            e.preventDefault()
            Halls_delete({Id:hallToDelete.Id}).then(result=>{
                renewList()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
        return (
            <div>
                {hallToDelete&&<Dialog open={!(!hallToDelete)} onClose={()=>SetHallToDelete(null)}>
                    <Form onSubmit={(e)=>deleteItem(e)}>
                        <DialogContent>
                            {"آیا از حذف "+hallToDelete.Name+" اطمینان دارید؟"}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>SetHallToDelete(null)}>لغو</Button>
                            <Button type={"submit"}>حذف</Button>
                        </DialogActions>
                    </Form>
                </Dialog>}
            </div>
        );
    }
    return (
        <>
            {hallList && hallList.map((item,number) => (
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}} key={"hl1-"+number}>
                <CardContent sx={{margin: 0, paddingY: "5px !important"}}>
                    <List>
                            <div key={"person-" + item.Id}>
                                <Grid container direction={"row"} alignContent={"center"} justifyContent="space-between" sx={{marginY: 0}}>
                                    <Typography variant={"subtitle1"} onClick={()=>navigate("/management/hall/"+item.Id, {replace: true})} >
                                        {item.Name||""}
                                    </Typography>
                                    <IconButton onClick={(e)=>SetHallToDelete(item)}>
                                        <DeleteIcon color={"error"}  />
                                    </IconButton>
                                </Grid>
                            </div>
                    </List>
                </CardContent>
            </Card>
            ))}

            {renderModalDelete()}
        </>

    );
};

export default _HallList;
