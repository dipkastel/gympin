import React, {useContext, useEffect, useState} from 'react';
import {Box, Card, CircularProgress, Divider, Grid, IconButton, Paper, Rating, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {place_getAll, Place_query} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {
    Boy, BoyRounded, ChildCare,
    ControlPoint, ElderlyWoman,
    Filter,
    Filter3,
    FilterAltRounded, FormatListBulleted, GirlRounded,
    LocationCity,
    LocationOn, LocationOnOutlined, Man, ManOutlined, ManRounded,
    MyLocationOutlined,
    Pin, Woman, WomanOutlined, WomanRounded, WomanSharp
} from "@mui/icons-material";
import {compareObjs, toPriceWithComma} from "../../helper/utils";
import _Filter, {defaultFilters} from "./_Filter";
import {useSelector} from "react-redux";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const _PlacesList = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [places, SetPlaces] = useState(null)
    const [filters, SetFilters] = useState([...defaultFilters,{
        type: "gender",
        name: "جنسیت",
        value: currentUser?currentUser?.Gender:null,
        selectedName: ""
    }])
    const [sortBy, SetSortBy] = useState("Id")
    const [openModalFilter, setOpenModalFilter] = useState(false)
    useEffect(() => {
        Place_query({
            queryType: "FILTER",
            Status:"Active",
            Sports:filters.find(f=>f.type==="Sports").value,
            LocationId:filters.find(f=>f.type==="location").value,
            Gender:filters.find(f=>f.type==="gender")?filters.find(f=>f.type==="gender").value:null,
            Option:null,
            paging: {Page: page, Size: rowsPerPage,Desc:false,OrderBy:sortBy}
        }).then(result => {
            console.log(result.data.Data)
            SetPlaces(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [filters,sortBy]);

    return (
        <>{places?(<>
            <_Filter setBaseFilters={(e)=>SetFilters(e)} setBaseSortBy={(e)=>SetSortBy(e)} />
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.content&&places.content.map(item => (
                        <Grid key={"5i"+item.Id} item component={"a"} href={"/place/" + item.Id} sx={{textDecoration: "none"}}
                              lg={3} md={4} sm={6} xs={12}>
                            <Card elevation={8} sx={{margin: 2, padding: 0,borderRadius:3}} >
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item  sx={{padding: 0,display:"flex",flexDirection:"column-reverse",alignItems:"center"}}>
                                        <Image src={item.Multimedias[0] ? (item.Multimedias[0].Url+"&width=400") : "https://api.gympin.ir/resource/image?Id=11"} width={"100%"}
                                               rounded={3}/>
                                        {/*<Box sx={{width:"160px",marginTop:1,height:"30px",opacity:"0.6",backgroundColor:"black",position:"absolute",borderRadius:"15px 15px 0 0"}}>*/}

                                        {/*</Box>*/}
                                        {/*<Rating name="read-only" value={4} sx={{position:"absolute",marginBottom:"5px"}}  />*/}
                                    </Grid>
                                    <Grid item sx={{padding: 1,minHeight:"88px",width:"100%"}} >

                                        <Grid container
                                              direction="row"
                                              justifyContent={"space-between"}
                                              alignItems="center">

                                            <Grid >

                                                <Typography className={"sportBullet"} sx={{paddingTop:0.5,paddingBottom:0.5}} variant={"h5"}>
                                                    {item.Name}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                {item.Genders&&item.Genders.map((gender,number)=>(<div key={"kh"+number} className={"d-inline"}>
                                                        {gender==="MALE"&&<ManRounded sx={{fontSize:20,color:"#cc0f0f"}}/>}
                                                        {gender==="FEMALE"&&<WomanRounded  sx={{fontSize:20,color:"#cc0f0f"}}/>}
                                                        {gender==="BOYS"&&<BoyRounded  sx={{fontSize:20,color:"#cc0f0f"}}/>}
                                                        {gender==="GIRLS"&&<GirlRounded   sx={{fontSize:20,color:"#cc0f0f"}}/>}
                                                        {gender==="KIDS"&&<ChildCare   sx={{fontSize:20,color:"#cc0f0f"}}/>}
                                                </div>))}
                                            </Grid>
                                        </Grid>
                                        <Typography sx={{paddingY:0.5}} variant={"body1"} component={"div"}>
                                            {item.Location&&<>
                                                <LocationOnOutlined  sx={{fontSize:15,color:"#cc0f0f"}}/>  {item.Location.Name}
                                            </>}
                                        </Typography>
                                        <Typography sx={{paddingY:0.5}} variant={"body1"} component={"div"}>
                                            {item.Sports&&item.Sports.map((sport, number) => (<div key={"ph"+number} className={"d-inline"}>
                                                    <FiberManualRecordIcon  className={"sportBullet"} sx={{fontSize:8,color:"#cc0f0f"}} />
                                                    {sport.Name}
                                            </div>
                                            ))}
                                        </Typography>
                                        <Divider variant="inset" sx={{marginY:1,marginLeft: 0, marginRight: 0}} component="div"/>
                                        <Grid sx={{width:"100%"}}
                                              container
                                              direction="row"
                                              alignItems={"center"}
                                              justifyContent={"center"}

                                        >
                                            {item.MinPrice&&<Typography sx={{color:"#757575"}} variant={"subtitle2"}>
                                                {"شروع قیمت از "}
                                            </Typography>}
                                            {item.MinPrice&&<Typography sx={{paddingRight:1,color:"#26881a",fontWeight:700}}  variant={"subtitle1"}>
                                                {toPriceWithComma( item.MinPrice)+" تومان"}
                                            </Typography>}
                                            {!item.MinPrice&&<Typography sx={{color:"#757575"}} variant={"subtitle1"}>
                                                {"بدون پلن فعال "}
                                            </Typography>}
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>):(<Grid
        container
        sx={{width:"100%",height:"80vh"}}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
    >
        <CircularProgress />
    </Grid>
)}</>
    );
};

export default _PlacesList;
