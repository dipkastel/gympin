import React, {useContext, useEffect, useState} from 'react';
import _UserList from "./_UserList";
import {Button, Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import Grid from "@mui/material/Grid2";

const NewUserPage = () => {

    return (
        <>
            <Container maxWidth>
                <_UserList />
            </Container>
        </>
    );
};

export default NewUserPage;
