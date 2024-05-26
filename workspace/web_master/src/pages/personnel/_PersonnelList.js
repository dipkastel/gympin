import React, {useContext, useState} from 'react';
import {
    Avatar, Button,
    Card,
    CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
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
import {
    placePersonnel_addRole,
    placePersonnel_delete,
    placePersonnel_deleteRole
} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";

const _PersonnelList = ({personnelList, renewList}) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const [personnelToDelete,SetPersonnelToDelete]= useState(null)
    const [inPersonnelList,setInPersonnelList]= useState(personnelList)

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

    function deleteRole(role, personnel) {
        placePersonnel_deleteRole({...personnel,UserRole:role}).then(result=>{
            renewList()
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function addRole(role, personnel) {
        placePersonnel_addRole({...personnel,UserRole:role}).then(result=>{
            renewList()
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>
                        {inPersonnelList && inPersonnelList.map(item => (
                            <div key={"person-" + item.Id}>
                                <Grid container direction={"row"} justifyContent="space-between" sx={{marginY: 1}}>
                                    <ListItemButton alignItems="flex-start" onClick={()=>item.UserRole.includes("PLACE_OWNER")?"#":navigate("/management/personnelAccess", {state:{placePersonnel:item}})} >
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
                                    <IconButton onClick={(e)=>item.UserRole.includes("PLACE_OWNER")?{}:SetPersonnelToDelete(item)}>
                                        {item.UserRole.includes("PLACE_OWNER")?<></>:<DeleteIcon color={"error"}  />}
                                    </IconButton>

                                </Grid>
                                <Grid container direction={"row"} justifyContent={"center"} sx={{marginY: 1}}>
                                    {Object.keys(personnelRoles).map(role=>(
                                        <Chip onClick={(e)=>item.UserRole.includes(role)?deleteRole(role,item):addRole(role,item)}
                                            label={personnelRoles[role]}
                                              sx={{mx:1}}
                                              size={"medium"}
                                              color={item.UserRole.includes(role)?"success":"default"}
                                        />
                                    ))}

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

export default _PersonnelList;
