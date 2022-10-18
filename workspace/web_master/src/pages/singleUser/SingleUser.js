import React, {useEffect, useState} from 'react';
import _userDetails from "./_userDetails";
import _userPackages from "./_userPackages";
import _userActions from "./_userActions";
import {useSearchParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {getUserById} from "../../network/api/user.api";

const SingleUser = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [user,setUser]= useState(null)
    useEffect(() => {
        getUserById(searchParams.get("id")).then(result=>{
            setUser(result.data.Data);
        }).catch(e=>console.log(e))
    }, []);

    return user?(
        <>
            <_userDetails user={user}/>
            <_userPackages user={user}/>
            <_userActions user={user}/>
        </>
    ):(
        <>
            <Loading width={"100%"} height={"Calc(100Vh - 120px)"}/>
        </>
    );
};

export default SingleUser;
