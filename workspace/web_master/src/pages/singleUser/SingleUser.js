import React, {useContext, useEffect, useState} from 'react';
import _userDetails from "./_userDetails";
import _userTickets from "./_userTickets";
import _userActions from "./_userActions";
import {useSearchParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {user_getById} from "../../network/api/user.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const SingleUser = (props) => {

    const error = useContext(ErrorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [user,setUser]= useState(null)


    useEffect(() => {
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
        return (<></>);

    if(!user)
        return (<><Loading width={"100%"} height={"Calc(100Vh - 120px)"}/></>);

    return (
        <>
            <_userDetails user={user}/>
            <_userTickets user={user}/>
        </>
    );
};

export default SingleUser;
