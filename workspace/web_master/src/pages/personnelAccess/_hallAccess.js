import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {
    placePersonnel_getGateAccess,
    placePersonnel_updatePersonnelGateAccess
} from "../../network/api/placePersonnel.api";
import {Card, CardContent, FormControlLabel, List, Switch} from "@mui/material";

const _hallAccess = ({user}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userAccess, SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);


    function getAccess() {

        placePersonnel_getGateAccess({placeId: place.Id, userId: user.Id}).then(result => {
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
        placePersonnel_updatePersonnelGateAccess([item]).then(result => {
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
                            <div key={"access-" + item.Gate.Id}>
                                <FormControlLabel
                                    sx={{mr:0}}
                                    control={
                                    <Switch
                                        id={item.Gate.Id}
                                        checked={item.Access}
                                        onChange={(e) => changeAccess(item, e)}

                                    />
                                } label={"دسترسی به گیت "+item.Gate.Name}/>
                                <hr className={"p-0 m-1"}/>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </>
    );
};

export default _hallAccess;
