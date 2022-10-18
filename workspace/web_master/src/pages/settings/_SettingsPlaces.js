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
import {getAllPlaces} from "../../network/api/place.api";
import {authActions} from "../../helper/redux/actions/authActions";

const _SettingsPlaces = (props) => {
    const user = useSelector(({auth}) => auth.user);
    const [selectedPlace,SetSelectedPlace] = useState(useSelector(({auth}) => auth.place))
    const [places, SetPlaces] = useState([]);
    useEffect(() => {
        console.log(selectedPlace);
        getAllPlaces(user).then(result => {
            SetPlaces(result.data.Data)
        }).catch(e => console.log(e));
    }, []);

    function selectedPlaceChanged(event) {
        const place = places.find(r=>r.Id==event.target.value);
        SetSelectedPlace(place);
        props.userPlaceSelected(place);
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"مجموعه های من"}
                action={(<>
                    <Button variant={"outlined"}>افزودن</Button>
                </>)}
            />
            <CardContent>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>

                    <FormControl
                        style={{width:"100%"}}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={(selectedPlace)?selectedPlace.Id:9999}
                            onChange={event => selectedPlaceChanged(event)}
                        >
                            {places.map((item, number) => (
                                <div key={number} >
                                    <Grid
                                        container
                                    justifyContent={"space-between"}
                                        direction="start"
                                        sx={{padding:1}}
                                    >

                                        <FormControlLabel value={item.Id} control={<Radio/>} label={item.Name}/>
                                        <Button size={"small"} variant={"outlined"} href={"/management/place?id=" + item.Id}>
                                            ویرایش
                                        </Button>

                                    </Grid>
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

export default connect(null, authActions)(_SettingsPlaces)
