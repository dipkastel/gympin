import React, {useContext, useEffect, useState} from 'react';
import _userDetails from "./_userDetails";
import _userSubscribes from "./_userSubscribes";
import _userActions from "./_userActions";
import {useSearchParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {user_getById} from "../../network/api/user.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";

const SingleUser = (props) => {

    const error = useContext(ErrorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [user,setUser]= useState(null)


    useEffect(() => {
        document.title = 'مدیریت کاربر';
        user_getById(searchParams.get("id")).then(result=>{
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
