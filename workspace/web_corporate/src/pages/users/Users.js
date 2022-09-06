import * as React from 'react';
import _AddPersonel from "./_AddPersonel";
import _PersonelList from "./_PersonelList";
import _ListItem from "../../components/_ListItem";


const Users = () => {
    return (
        <>
            <_AddPersonel/>
            <_ListItem title="افزایش اعتبار گروهی" destination="/users/increasegroupcredit"/>
            <_PersonelList/>
        </>
    );
};

export default Users;
