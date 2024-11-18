import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, FormControlLabel, InputLabel, List, Switch} from "@mui/material";
import {personnelAccessEnum} from "../../helper/enums/personnelAccessEnum";
import {placePersonnel_getAccess, placePersonnel_updatePersonnelAccess} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";

const _generalAccess = ({user}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userAccess, SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);


    function getAccess() {

        placePersonnel_getAccess({placeId: place.Id, userId: user.Id}).then(result => {
            SetUserAccess(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function changeAccess(item, e) {
        item.Access = e.target.checked;
        placePersonnel_updatePersonnelAccess([item]).then(result => {
            getAccess();
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
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardContent>
                    <List>
                        {userAccess && userAccess.map(item => (
                            <div key={"access-" + item.Section}>
                                <FormControlLabel
                                    sx={{mr:0}} control={
                                    <Switch
                                        checked={item.Access}
                                        onChange={(e) => changeAccess(item, e)}

                                    />
                                } label={personnelAccessEnum[item.Section]}/>
                                <hr className={"p-0 m-1"}/>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </>
    );
};

export default _generalAccess;
