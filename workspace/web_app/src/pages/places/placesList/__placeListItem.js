import React from 'react';
import {Card, Divider, Grid, ListItemText, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {BoyRounded, ChildCare, GirlRounded, LocationOnOutlined, ManRounded, WomanRounded} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {fixTextToSlug, toPriceWithComma} from "../../../helper/utils";

const __placeListItem = ({item}) => {
    return (
        <Grid item component={"a"} href={"/place/" + item.Id+"-"+fixTextToSlug(item.Name)} sx={{textDecoration: "none"}}
              lg={3} md={4} sm={6} xs={12}>
            <Card elevation={8} sx={{margin: 2, padding: 0, borderRadius: 3}}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item
                          sx={{padding: 0, display: "flex", flexDirection: "column-reverse", alignItems: "center"}}>
                        <Image
                            src={item?.Multimedias?.[0] ? (item.Multimedias?.[0]?.Url + "&width=400") : "https://api.gympin.ir/resource/image?Id=11"}
                            width={"100%"}
                            rounded={3}/>
                        {/*<Box sx={{width:"160px",marginTop:1,height:"30px",opacity:"0.6",backgroundColor:"black",position:"absolute",borderRadius:"15px 15px 0 0"}}>*/}

                        {/*</Box>*/}
                        {/*<Rating name="read-only" value={4} sx={{position:"absolute",marginBottom:"5px"}}  />*/}
                    </Grid>
                    <Grid item sx={{padding: 1, minHeight: "88px", width: "100%"}}>

                        <Grid container
                              direction="row"
                              justifyContent={"space-between"}
                              alignItems="center">

                            <Grid>

                                <Typography className={"sportBullet"} sx={{paddingTop: 0.5, paddingBottom: 0.5}}
                                            variant={"h5"}>
                                    {item.Name}
                                </Typography>
                            </Grid>
                            <Grid>
                                {/*{item.Genders && item.Genders.map((gender, number) => (*/}
                                {/*    <div key={"kh" + number} className={"d-inline"}>*/}
                                {/*        {gender === "MALE" && <ManRounded sx={{fontSize: 20, color: "#cc0f0f"}}/>}*/}
                                {/*        {gender === "FEMALE" && <WomanRounded sx={{fontSize: 20, color: "#cc0f0f"}}/>}*/}
                                {/*        {gender === "BOYS" && <BoyRounded sx={{fontSize: 20, color: "#cc0f0f"}}/>}*/}
                                {/*        {gender === "GIRLS" && <GirlRounded sx={{fontSize: 20, color: "#cc0f0f"}}/>}*/}
                                {/*        {gender === "KIDS" && <ChildCare sx={{fontSize: 20, color: "#cc0f0f"}}/>}*/}
                                {/*    </div>))}*/}
                            </Grid>
                        </Grid>
                        <Typography sx={{paddingY: 0.5}} variant={"body1"} component={"div"}>
                            {item.Location && <>
                                <LocationOnOutlined sx={{fontSize: 15, color: "#cc0f0f"}}/> {item.Location.Name}
                            </>}
                        </Typography>
                        <Typography sx={{paddingY: 0.5}} variant={"body1"} component={"div"}>
                            {item.Sports && item.Sports.map((sport, number) => (
                                <div key={"ph" + number} className={"d-inline"}>
                                    {number<3&&<div className={"d-inline"}>
                                        <FiberManualRecordIcon className={"sportBullet"}
                                                               sx={{fontSize: 8, color: "#cc0f0f"}}/>
                                        {sport.Name}
                                    </div>}
                                    {number>3&&number<7&&<div className={"d-inline"}>
                                        <FiberManualRecordIcon className={"sportBullet"}
                                                               sx={{fontSize: 8, color: "#cc0f0f"}}/>
                                    </div>}
                                </div>
                            ))}
                        </Typography>
                        <Divider variant="inset" sx={{marginY: 1, marginLeft: 0, marginRight: 0}} component="div"/>
                        <Grid sx={{width: "100%"}}
                              container
                              direction="row"
                              alignItems={"center"}
                              justifyContent={"center"}

                        >
                            {item?.MinPrice && <Typography sx={{color: "#757575",fontWeight:200}} variant={"subtitle2"}>
                                {"شروع قیمت از "}
                            </Typography>}
                            <ListItemText
                                sx={{mt:"0px",flex:"none"}}
                                primary={item?.MinPriceBeforeDiscount &&
                                <Typography sx={{paddingRight: 1, color: "#b06161",textDecoration:"line-through", fontWeight: 500,lineHeight:1}} variant={"subtitle1"}>
                                    {toPriceWithComma(item?.MinPriceBeforeDiscount) }
                                </Typography>}
                                primaryTypographyProps={{p:0,m:0,lineHeight:0}}
                                secondaryTypographyProps={{p:0,m:0,lineHeight:0}}
                                secondary= {item?.MinPrice &&
                                <Typography sx={{paddingRight: 1, color: "#26881a", fontWeight: 700,lineHeight:1}} variant={"subtitle1"}>
                                    {toPriceWithComma(item.MinPrice) + " تومان"}
                                </Typography>}
                            />


                            {!item.MinPrice && <Typography sx={{color: "#757575"}} variant={"subtitle1"}>
                                {"بدون پلن فعال "}
                            </Typography>}
                        </Grid>
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    );
};

export default __placeListItem;
