import React, {useContext, useState} from 'react';
import {
    Avatar, Button,
    Card,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {personnelRoles} from "../../helper/enums/personnelRoles";
import {PlacesQr_delete} from "../../network/api/placeQr.api";
import {Form} from "react-bootstrap";
import {placePersonnel_delete} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";

const _CoachList = ({personnelList, renewList}) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const [personnelToDelete,SetPersonnelToDelete]= useState(null)
    const [inCoachList,setInCoachList]= useState(personnelList.filter(o=>o.UserRole.startsWith("PLACE_COACH")))

    function renderModalDelete(){
        const deleteItem = (e)=>{
            e.preventDefault()
            placePersonnel_delete({Id:personnelToDelete.Id}).then(result=>{
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
                {personnelToDelete&&<Dialog open={!(!personnelToDelete)} onClose={()=>SetPersonnelToDelete(null)}>
                    <Form onSubmit={(e)=>deleteItem(e)}>
                        <DialogContent>
                            {"آیا از حذف "+(personnelToDelete.User.FullName||"")+"("+personnelToDelete.User.Username+")"+" اطمینان دارید؟"}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>SetPersonnelToDelete(null)}>لغو</Button>
                            <Button type={"submit"}>حذف</Button>
                        </DialogActions>
                    </Form>
                </Dialog>}
            </div>
        );
    }
    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>
                        {inCoachList && inCoachList.map(item => (
                            <div key={"person-" + item.Id}>
                                <Grid container direction={"row"} justifyContent="space-between" sx={{marginY: 1}}>
                                    <ListItemButton alignItems="flex-start" onClick={()=>item.UserRole=="PLACE_OWNER"?"#":navigate("/management/personnelAccess", {state:{user:item.User}})} >
                                        <ListItemAvatar>
                                            <Avatar sx={{width: 40, height: 40}}
                                                    src={item.User.Avatar ? (item.User.Avatar.Url || "") : ""}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            className="text-start"
                                            primary={(item.User?.FullName||item.User?.PhoneNumber||"کاربر پروفایل را تکمیل نکرده")}
                                            secondary={item.User?.Username}
                                        />
                                    </ListItemButton>

                                    <ListItemText
                                        className="text-end"
                                        primary={(<IconButton onClick={(e)=>item.UserRole=="PLACE_OWNER"?{}:SetPersonnelToDelete(item)}>
                                            {item.UserRole=="PLACE_OWNER"?<></>:<DeleteIcon color={"error"}  />}
                                        </IconButton>)}
                                        secondary={personnelRoles[item.UserRole]}
                                    />

                                </Grid>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                            </div>
                        ))}

                    </List>
                    {/*<Pagination variant="outlined" count={1} color="primary"/>*/}
                </CardContent>
            </Card>
            {renderModalDelete()}
        </>

    );
};

export default _CoachList;
