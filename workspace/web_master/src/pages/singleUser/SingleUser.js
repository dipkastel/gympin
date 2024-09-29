import React, {useContext, useEffect, useState} from 'react';
import _userDetails from "./_userDetails";
import _userSubscribes from "./_userSubscribes";
import _userActions from "./_userActions";
import {useParams, useSearchParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {user_getById, user_getByUserName} from "../../network/api/user.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";

const SingleUser = (props) => {

    const error = useContext(ErrorContext);
    const {userId} = useParams()
    const [user,setUser]= useState(null)


    useEffect(() => {
        document.title = 'مدیریت کاربر';
        console.log(userId)
        user_getByUserName(userId).then(result=>{
            setUser(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);

    if(!getAccessOf(personnelAccessEnumT.UserDetail))
        return <AccessDenied/>;

    if(!user)
        return (<><Loading width={"100%"} height={"Calc(100Vh - 120px)"}/></>);

    return (
        <>
            <_userDetails user={user}/>
            <_userSubscribes user={user}/>
        </>
    );
};

export default SingleUser;
