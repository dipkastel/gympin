import React, {useState} from 'react';
import {Alert, Box, Card, Chip, Collapse, Divider, Grid2 as Grid, ListItemText, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {
    AvTimerOutlined,
    ChildCare,
    Face2Outlined,
    Face3Outlined,
    Face6Outlined,
    GroupOutlined,
    NewReleases,
    SentimentSatisfiedAltOutlined,
    SupervisedUserCircleOutlined
} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {fixTextToSlug, toPriceWithComma} from "../../../helper/utils";
import {useNavigate} from "react-router-dom";

const __placeListItem = ({item}) => {
    const navigate = useNavigate();
    const [showActiveTime, setShowActiveTime] = useState(false)
    const chipSx = {bgcolor: "#838383", color: "#ffffff",fontSize:"0.6rem",p:"2px",height:"16px",m:0.2}
    return (
        <Card elevation={8} sx={{margin: 2, padding: 0, borderRadius: 3}}>
            <Grid container
                  direction="row"
                  sx={{direction: "ltr"}}
                  justifyContent="center"
                  alignItems="center">
                <Grid item
                      onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))}
                      sx={{padding: 0, display: "flex",direction:"rtl", flexDirection: "row", alignItems: "end"}}>
                    <Image

                        src={item?.Multimedias?.[0] ? (item.Multimedias?.[0]?.Url + "&width=400") : "https://api.gympin.ir/resource/image?Id=11"}
                        width={"100%"}/>
                    {item?.Location?.Name &&
                    <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"s"} sx={{height: "30px", position: "absolute",m:"auto"}} >
                        <Box alignItems={"center"} sx={{m:"auto",px: 1,height:"30px", backgroundColor: "white", borderRadius: "0 8px 0 0", display: "flex"}}>
                            <img src={"/logo192.png"} height={"18px"} width={"18px"}/>
                            <Typography sx={{paddingY: 0.5, pl: 1, display: "inline-block"}} variant={"caption"} component={"div"}>
                                {item.Location.Name}
                            </Typography>
                        </Box>
                        <img src={"/assets/images/cornerShape.svg"}  style={{marginLeft: "-1px"}}  height={"30px"} width={"30px"}/>


                    </Grid>}


                    {/*<Rating name="read-only" value={4} sx={{position:"absolute",marginBottom:"5px"}}  />*/}
                </Grid>
                <Grid item sx={{padding: 1, minHeight: "88px", width: "100%"}}>

                    <Typography
                        sx={{paddingTop: 0.5, paddingBottom: 0.5,fontSize:"0.9rem"}}
                        variant={"h5"}>
                        {item.Name}
                    </Typography>
                    <Grid container
                          direction="row"
                          sx={{mt: 1}}
                          justifyContent={"space-between"}
                          alignItems="center">
                        <Grid>
                            <GroupOutlined/>
                            <Typography sx={{mx: 0.5, fontSize: "0.6rem"}}
                                        variant={"caption"}>
                                جنسیت
                            </Typography>
                        </Grid>
                        <Grid>
                            {item.Genders.length < 1 && <Chip size={"small"} sx={chipSx}
                                                              label={<><NewReleases
                                                                  sx={{color: "#cccccc",fontSize:"0.6rem"}}/><Typography variant={"caption"}
                                                                                                       sx={{px: 1,fontSize:"0.5rem"}}>ثبت
                                                                  نشده</Typography></>}/>}
                            {item?.Genders?.map((gender, number) => (
                                <div key={"kh" + number} className={"d-inline"}>
                                    {gender === "MALE" && <Chip size={"small"} sx={chipSx}
                                                                label={<><SentimentSatisfiedAltOutlined
                                                                    sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography variant={"caption"}
                                                                                                         sx={{px: 0.3,fontSize:"0.5rem"}}>آقایان</Typography></>}/>}
                                    {gender === "FEMALE" && <Chip size={"small"} sx={chipSx}
                                                                  label={<><Face3Outlined sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography
                                                                      variant={"caption"} sx={{px: 0.3,fontSize:"0.5rem"}}>خانم‌ها</Typography></>}/>}
                                    {gender === "BOYS" && <Chip size={"small"} sx={chipSx}
                                                                label={<><Face6Outlined sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography
                                                                    variant={"caption"} sx={{px: 0.3,fontSize:"0.5rem"}}>پسرها</Typography></>}/>}
                                    {gender === "GIRLS" && <Chip size={"small"} sx={chipSx}
                                                                 label={<><Face2Outlined sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography
                                                                     variant={"caption"} sx={{px: 0.3,fontSize:"0.5rem"}}>دخترها</Typography></>}/>}
                                    {gender === "KIDS" && <Chip size={"small"} sx={chipSx}
                                                                label={<><ChildCare sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography
                                                                    variant={"caption"} sx={{px: 0.3,fontSize:"0.5rem"}}>کودکان</Typography></>}/>}
                                    {gender === "NONE" && <Chip size={"small"} sx={chipSx}
                                                                label={<><SupervisedUserCircleOutlined
                                                                    sx={{color: "#ffffff",fontSize:"0.6rem"}}/><Typography variant={"caption"}
                                                                                                         sx={{px: 0.3,fontSize:"0.5rem"}}>همه</Typography></>}/>}
                                </div>))}
                        </Grid>
                    </Grid>
                    <Grid container
                          direction="row"
                          sx={{mt: 1}}
                          justifyContent={"space-between"}
                          alignItems="center">
                        <Grid>
                            <AvTimerOutlined/>
                            <Typography sx={{mx: 0.5, fontSize: "0.6rem"}}
                                        variant={"caption"}>
                                زمان فعالیت
                            </Typography>
                        </Grid>
                        <Grid>
                            {item.ActiveTimes && <Chip size={"small"} sx={{bgcolor: "#838383", color: "#ffffff",fontSize:"0.6rem",p:"2px",height:"16px"}} onClick={() => {
                                setShowActiveTime(!showActiveTime)
                            }}
                                                       label={<Typography variant={"caption"} sx={{px: 1,fontSize:"0.5rem"}}>مشاهده</Typography>}/>
                            }
                            {!item.ActiveTimes && <Chip size={"small"} sx={{bgcolor: "#cccccc", color: "#838383",fontSize:"0.6rem",p:"2px",height:"16px"}}
                                                        label={<><NewReleases
                                                            sx={{color: "#cccccc",fontSize:"0.6rem"}}/><Typography variant={"caption"}
                                                                                                 sx={{px: 1,fontSize:"0.5rem"}}>ثبت
                                                            نشده</Typography></>}/>
                            }
                        </Grid>
                    </Grid>
                    <Collapse in={showActiveTime}>
                        <Alert icon={false} sx={{fontSize:"0.6rem"}}>{item.ActiveTimes}</Alert>
                    </Collapse>

                    <Typography sx={{mt: 1, paddingY: 0.5}} variant={"body1"} component={"div"}>
                        {item.Sports && item.Sports.map((sport, number) => (
                            <div key={"ph" + number} className={"d-inline"}>
                                {number < 3 && <div className={"d-inline"}>
                                    <FiberManualRecordIcon className={"sportBullet"}
                                                           sx={{fontSize: "0.3rem", color: "#cc0f0f"}}/>
                                    <Typography sx={{fontSize:"0.55rem"}} variant={"caption"}>
                                        {sport.Name}
                                    </Typography>
                                </div>}
                                {number > 3 && number < 7 && <div className={"d-inline"}>
                                    <FiberManualRecordIcon className={"sportBullet"}
                                                           sx={{fontSize: "0.3rem", color: "#cc0f0f"}}/>
                                </div>}
                            </div>
                        ))}
                    </Typography>
                    <Divider variant="inset" sx={{marginY: 1, marginLeft: 0, marginRight: 0}} component="div"/>
                    <Grid
                        container
                        direction={"row"}
                        alignItems={"center"}
                        columns={22}
                        sx={{minHeight:50}}
                        onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))}
                    >
                        <Grid textAlign={"end"} size={7}>{item?.MinPrice &&
                        <Typography sx={{color: "#757575", fontWeight: 200, pr:1 ,fontSize:"0.6rem"}} variant={"subtitle2"}>
                            {"شروع قیمت از "}
                        </Typography>}</Grid>
                        <Grid textAlign={"start"} size={8}>
                            <ListItemText
                                sx={{mt: "0px", flex: "none"}}
                                primary={item?.MinPriceBeforeDiscount &&
                                <Typography
                                    sx={{
                                        paddingRight: 1,
                                        color: "#b06161",
                                        textDecoration: "line-through",
                                        fontWeight: 500,
                                        lineHeight: 1,fontSize:"0.7rem"
                                    }}
                                    variant={"subtitle1"}>
                                    {toPriceWithComma(item?.MinPriceBeforeDiscount)}
                                </Typography>}
                                primaryTypographyProps={{p: 0, m: 0, lineHeight: 0}}
                                secondaryTypographyProps={{p: 0, m: 0, lineHeight: 0}}
                                secondary={item?.MinPrice &&
                                <Typography sx={{paddingRight: 1, color: "#26881a", fontWeight: 700, lineHeight: 1,fontSize:"0.7rem"}}
                                            variant={"subtitle1"}>
                                    {toPriceWithComma(item.MinPrice) + " تومان"}
                                </Typography>}
                            />
                        </Grid>
                        {item?.MinPriceBeforeDiscount && <><Grid textAlign={"start"} size={1}>
                            <Divider orientation="vertical"
                                     sx={{height: "45px", width: "1px", borderColor: "gray.darker", borderStyle: "dashed"}}
                                     component="div"/>
                        </Grid>
                            <Grid direction={"column"} container size={6}>

                                <Grid>
                                    <Typography variant={"caption"} color={"primary"} sx={{
                                        fontWeight: 400,fontSize:"0.6rem"
                                    }}>{toPriceWithComma(item?.MinPriceBeforeDiscount - item.MinPrice)}</Typography>
                                    <Typography variant={"caption"} color={"primary"}
                                                sx={{fontSize: "0.6rem", fontWeight: 400}}>{" تومان"}</Typography>
                                </Grid>
                                <Grid sx={{display:"flex"}}>
                                    <img src={"/assets/images/discountIcon.svg"} width={"12px"}/>
                                    <Typography variant={"caption"} color={"primary"}
                                                sx={{fontSize: "0.6rem", fontWeight: 900, pl: 0.5}}>تخفیف</Typography>
                                </Grid>
                            </Grid></>}
                        {!item.MinPrice && <Grid textAlign={"center"} size={22}>
                            <Typography sx={{color: "#757575",fontSize:"0.6rem"}} variant={item?.MinPriceBeforeDiscount?"subtitle1":"h6"}>
                                {"بدون پلن فعال "}
                            </Typography>
                        </Grid>}


                    </Grid>
                </Grid>

            </Grid>
        </Card>
    );
};

export default __placeListItem;
