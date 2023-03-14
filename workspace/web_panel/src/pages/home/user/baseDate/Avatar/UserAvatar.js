import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Avatar, Grid} from "@mui/material";
import ImagePicker from "../../../media/Pickers/ImagePicker";
import {user_UpdateUserAvatar, user_UpdateUserStatus} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const UserAvatar = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const [openModalSelectAvatar,setOpenModalSelectAvatar] = useState(false)
    const [userAvatar,setUserAvatar] = useState(currentUser.Avatar||{Url:""})

    function setAvatar() {
        return setOpenModalSelectAvatar(true);
    }

    function selectImage(image) {
        user_UpdateUserAvatar({UserId:currentUser.Id,MultimediaId:image.Id}).then(result=>{
            setUserAvatar(result.data.Data.Avatar||{Url:""});
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
                <PortletHeader title="تصویر کاربر" />

                <PortletBody>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                            <Avatar onClick={()=>setAvatar()}  alt="Remy Sharp" src={userAvatar.Url||""}  sx={{margin:1,width:160,height:160}} />
                    </Grid>
                </PortletBody>
            </Portlet>

            {openModalSelectAvatar&&<ImagePicker
                setClose={()=>setOpenModalSelectAvatar(false)}
                onSelect={selectImage}
                options={{rowCount: 4,isSingle:true,filters:{CategoryId:2}}} />}
        </>
    );
};

export default UserAvatar;
