import React, {useContext, useEffect, useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel,
    List,
    Radio,
    RadioGroup
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {corporateActions} from "../../helper/redux/actions/CorporateActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporatePersonnel_corporateOwnedByUserId} from "../../network/api/corporatePersonnel.api";

const _SettingsCorporate = (props) => {
    const error = useContext(ErrorContext);
    const user = useSelector(({auth}) => auth.user);
    const [selectedCorporate, SetSelectedCorporate] = useState(useSelector(({corporate}) => corporate.corporate))
    const [corporates, SetCorporates] = useState([]);
    useEffect(() => {
        corporatePersonnel_corporateOwnedByUserId({id: user.Id}).then(result => {
            SetCorporates(result.data.Data)
            if (result.data.Data.length == 1) {
                SetSelectedCorporate(result.data.Data[0]);
                props.SetCorporate(result.data.Data[0]);
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function selectedPlaceChanged(event) {
        const place = corporates.find(r => r.Id == event.target.value);
        if (place) {
            SetSelectedCorporate(place);
            props.SetCorporate(place);
        }
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"مجموعه های من"}
                sx={{pb: 0}}
            />
            <CardContent sx={{paddingBottom: 0}}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <FormControl
                        style={{width: "100%"}}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={(selectedCorporate) ? selectedCorporate.Id : 9999}
                            onChange={(event) => selectedPlaceChanged(event)}
                        >
                            {corporates.map((item, number) => (
                                <div key={number}>
                                    <FormControlLabel value={item.Corporate.Id} control={<Radio/>} label={item.Corporate.Name}/>
                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>


                </List>
            </CardContent>
        </Card>
    );
};

export default connect(null, corporateActions)(_SettingsCorporate)
