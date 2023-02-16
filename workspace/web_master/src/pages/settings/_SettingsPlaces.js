import React, {useContext, useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    List,
    Radio,
    RadioGroup
} from "@mui/material";
import {connect, useDispatch, useSelector} from "react-redux";
import {Places_getPlacesByUserId} from "../../network/api/place.api";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useNavigate} from "react-router-dom";
import {accessActions} from "../../helper/redux/actions/AccessActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _SettingsPlaces = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const access = useSelector(({access}) => access.access);
    const dispatch = useDispatch();
    const [selectedPlace, SetSelectedPlace] = useState(useSelector(({place}) => place.place))
    const [places, SetPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Places_getPlacesByUserId(user.Id).then(result => {
            SetPlaces(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
        if(selectedPlace&&!access){
            forceRefresh(45);
        }
    }, []);

    function selectedPlaceChanged(event) {
        const place = places.find(r => r.Id == event.target.value);
        if (place) {
            SetSelectedPlace(place);
            props.SetPlace(place);
            dispatch(accessActions.SetAccess(null));
            dispatch(sagaActions.RequestPlace(place.Id));
            forceRefresh(5);
        }
    }


    function forceRefresh(time){
        setLoading(true);
        setTimeout(function () {
            navigate(0);
        }, time*1000);
    }

    return (<>
            {!loading && <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مجموعه های من"}
                />
                <CardContent>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        <FormControl
                            style={{width: "100%"}}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={(selectedPlace) ? selectedPlace.Id : 9999}
                                onChange={(event) => selectedPlaceChanged(event)}
                            >
                                {places.map((item, number) => (
                                    <div key={number}>
                                        <Grid
                                            container
                                            justifyContent={"space-between"}
                                            sx={{padding: 1}}
                                        >

                                            <FormControlLabel value={item.Id} control={<Radio/>} label={item.Name}/>
                                            <Button size={"small"} variant={"outlined"}
                                                    href={"/management/place?id=" + item.Id}>
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
            </Card>}
            {loading && <Box sx={{width:"100%",height:"100vh", display: 'flex'}}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                        هشدار : تا پایان عملیات هیچ دکمه ای را فشار ندهید!!
                        <CircularProgress/>

                </Grid>
                </Backdrop>
            </Box>}

        </>

    );
};

export default connect(null, placeActions)(_SettingsPlaces)
