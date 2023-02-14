import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel, Grid,
    List,
    Radio,
    RadioGroup
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {corporate_getByUser} from "../../network/api/corporate.api";
import {corporateActions} from "../../helper/redux/actions/CorporateActions";

const _SettingsCorporate = (props) => {
    const  user  = useSelector(({auth}) => auth.user);
    const [selectedCorporate,SetSelectedCorporate] = useState(useSelector(({corporate}) => corporate.corporate))
    const [corporates, SetCorporates] = useState([]);
    useEffect(() => {
        corporate_getByUser({id:user.Id}).then(result => {
            SetCorporates(result.data.Data)
            if(result.data.Data.length==1){
                SetSelectedCorporate(result.data.Data[0]);
                props.SetCorporate(result.data.Data[0]);
            }
        }).catch(e => console.log(e));
    }, []);

    function selectedPlaceChanged(event) {
        const place = corporates.find(r=>r.Id==event.target.value);
        if(place){
            SetSelectedCorporate(place);
            props.SetCorporate(place);
        }
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"مجموعه های من"}
                sx={{pb:0}}
            />
            <CardContent sx={{paddingBottom:0}}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <FormControl
                        style={{width:"100%"}}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={(selectedCorporate)?selectedCorporate.Id:9999}
                            onChange={(event) => selectedPlaceChanged(event)}
                        >
                            {corporates.map((item, number) => (
                                <div key={number} >
                                    <FormControlLabel value={item.Id} control={<Radio/>} label={item.Name}/>
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
