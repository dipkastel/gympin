import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {
    placePersonnel_getUserPlaceBuyableAccess,
    placePersonnel_updatePersonnelBuyableAccess
} from "../../network/api/placePersonnel.api";
import {Card, CardContent, CircularProgress, FormControlLabel, List, Switch} from "@mui/material";

const _buyableAccess = ({placePersonnel}) => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userAccess, SetUserAccess] = useState([]);
    const [progress, SetProgress] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);


    function getAccess() {

        placePersonnel_getUserPlaceBuyableAccess({placeId: place.Id, userId: placePersonnel?.User?.Id}).then(result => {
            SetProgress([]);
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
        var Body = {};
        Body.Access = e.target.checked;
        Body.PlacePersonelId = placePersonnel.Id;
        Body.Buyable = {Id: item.Buyable.Id}
        SetProgress([...progress, {Id: item.Buyable.Id}])
        placePersonnel_updatePersonnelBuyableAccess([Body]).then(result => {
            setTimeout(function() {
                getAccess();
            }, 1000);
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
                <CardContent>
                    <List>
                        {userAccess && userAccess.map((item,number) => (
                            <div key={"access-" + number}>
                                <FormControlLabel
                                    sx={{mr: 0}}
                                    control={<>
                                        {progress.some(i=>i.Id==item.Buyable.Id)?<CircularProgress/>:<Switch
                                            checked={item.Access}
                                            onChange={(e) => changeAccess(item, e)}
                                        />}
                                    </>
                                    } label={"دسترسی به بلیط " + item.Buyable.Name}/>
                                <hr className={"p-0 m-1"}/>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </>
    );
};

export default _buyableAccess;
