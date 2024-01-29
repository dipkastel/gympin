import React from 'react';
import {Avatar, Card, Divider, Grid, Rating, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {BoyRounded, ChildCare, GirlRounded, LocationOnOutlined, ManRounded, WomanRounded} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {toPriceWithComma} from "../../helper/utils";

const __coachListItem = ({item}) => {
    return (
        <Grid item component={"a"} href={"/coach/" + item.Id} sx={{textDecoration: "none"}}
              lg={3} md={3} sm={4} xs={6}>
            <Card elevation={8} sx={{margin: 1, padding: 0,borderRadius:3}} >
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item  sx={{padding: 0,display:"flex",flexDirection:"column-reverse",alignItems:"center"}}>
                        <Avatar
                            sx={{width: 120, height: 120, marginTop: 3,marginBottom:1}}
                            alt="Remy Sharp"
                            src={item?.Avatar&&item?.Avatar.Url}/>
                        {/*<Box sx={{width:"160px",marginTop:1,height:"30px",opacity:"0.6",backgroundColor:"black",position:"absolute",borderRadius:"15px 15px 0 0"}}>*/}

                        {/*</Box>*/}
                        {/*<Rating name="read-only" value={4} sx={{position:"absolute",marginBottom:"5px"}}  />*/}
                    </Grid>
                    <Grid item sx={{padding: 1,minHeight:"88px",width:"100%"}} >

                        <Grid container
                              direction="row"
                              justifyContent={"center"}
                              alignItems="center">

                            <Grid >

                                <Typography className={"sportBullet"} sx={{paddingTop:0.5,paddingBottom:0.5}} variant={"h5"}>
                                    {item.FullName?item.FullName:item.Username}
                                </Typography>
                            </Grid>
                            <Grid alignItems={"center"} alignContent={"center"} justifyContent={"center"} container direction={"column"} >

                                <Rating name="read-only" value={item.Rate||5} readOnly />
                                <Typography className={"sportBullet"} sx={{paddingTop:0.5,paddingBottom:0.5}} variant={"body2"}>
                                    {(item.Rate||5)+"/5"}
                                </Typography>
                            </Grid>
                        </Grid>


                        {/*<Divider variant="inset" sx={{marginY:1,marginLeft: 0, marginRight: 0}} component="div"/>*/}
                        {/*<Grid sx={{width:"100%"}}*/}
                        {/*      container*/}
                        {/*      direction="row"*/}
                        {/*      alignItems={"center"}*/}
                        {/*      justifyContent={"center"}*/}

                        {/*>*/}
                        {/*    {item.MinPrice&&<Typography sx={{color:"#757575"}} variant={"subtitle2"}>*/}
                        {/*        {"شروع قیمت از "}*/}
                        {/*    </Typography>}*/}
                        {/*    {item.MinPrice&&<Typography sx={{paddingRight:1,color:"#26881a",fontWeight:700}}  variant={"subtitle1"}>*/}
                        {/*        {toPriceWithComma( item.MinPrice)+" تومان"}*/}
                        {/*    </Typography>}*/}
                        {/*    {!item.MinPrice&&<Typography sx={{color:"#757575"}} variant={"subtitle1"}>*/}
                        {/*        {"بدون پلن فعال "}*/}
                        {/*    </Typography>}*/}
                        {/*</Grid>*/}
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    );
};

export default __coachListItem;
