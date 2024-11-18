import React, {useContext, useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    List, ListItemText,
    Radio,
    RadioGroup
} from "@mui/material";
import {connect, useDispatch, useSelector} from "react-redux";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {useNavigate} from "react-router-dom";
import {accessActions} from "../../helper/redux/actions/AccessActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByUser} from "../../network/api/placePersonnel.api";
import {personnelRoles} from "../../helper/enums/personnelRoles";
import {getWizardComplete} from "../../helper/pocket";
import {getFixPlaceName} from "../../helper/utils";

const _SettingsPlaces = ({setUserHasIntro}) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const access = useSelector(({access}) => access.access);
    const dispatch = useDispatch();
    const [selectedPlace, SetSelectedPlace] = useState(useSelector(({place}) => place.place))
    const [placePersonnel, SetPlacePersonnel] = useState([]);
    const [loading, setLoading] = useState(false);
    const introMode=!getWizardComplete()

    useEffect(() => {

        placePersonnel_ByUser({Id:user.Id}).then(result => {
            SetPlacePersonnel(result.data.Data)
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
        const place = placePersonnel.find(r => r.Place.Id == event.target.value).Place;
        if (place) {
            SetSelectedPlace(place);
            dispatch(placeActions.SetPlace(place));
            dispatch(accessActions.SetAccess(null));
            dispatch(sagaActions.RequestPlace(place.Id));
            forceRefresh(5);
        }
    }


    function forceRefresh(time){
        setLoading(true);
        setTimeout(function () {
            // navigate(0);
            navigate('/management/', {replace: false});
        }, time*1000);
    }

    function getPlacePersonel() {
        return introMode?placePersonnel.filter(p=>p.UserRole.includes("PLACE_OWNER")):placePersonnel
    }

    function IsOwner(item) {
        if(item?.UserRole?.includes("PLACE_OWNER")){
            setTimeout(()=>{
                setUserHasIntro(true);
            },1000)
            return true;
        }
        return false;
    }

    return (<>
            {!loading && <>

                <div>
                    <div className={"section-title mt-3"}>مجموعه های من</div>
                </div>
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
                                    {getPlacePersonel().map((item, number) => (

                                        <Card key={"---"+number} elevation={3} sx={{margin: 1,borderRadius:3}}>
                                            <CardContent sx={{p: 0,paddingBottom:"0px !important"}}>
                                        <div >
                                            <Grid
                                                container
                                                justifyContent={"space-between"}
                                                sx={{padding: 1}}
                                            >
                                                <ListItemText
                                                    sx={{p:0,m:0}}
                                                    primary={<FormControlLabel sx={{m:0}} value={item.Place.Id} control={<Radio sx={{pr:0,pt:0}}/>} label={getFixPlaceName(item.Place,30,null)}/>}
                                                    secondary={<>{item.UserRole.map(role=>(<Chip size={"small"} key={role} label={personnelRoles[role]} />))}</>}
                                                    secondaryTypographyProps={{component:"div"}}
                                                />

                                                {user&&!introMode&&IsOwner(item)&&<Button size={"small"} variant={"outlined"}
                                                                                          href={"/management/place?id=" + item.Place.Id}>
                                                    ویرایش
                                                </Button>}
                                            </Grid>
                                        </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </List>
            </>}
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

export default _SettingsPlaces;
