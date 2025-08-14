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

    const imageStyle = {
        minHeight: '200px',
        width: '100%',
        objectFit: 'cover',
    };
    return (
        <Grid container>
            <Card elevation={8} sx={{margin: 2, padding: 0, borderRadius: 3,width:"100%"}}>
                <Grid container
                      direction="row"
                      sx={{direction: "ltr"}}
                      justifyContent="center"
                      alignItems="center">
                    <Grid item
                          onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))}
                          sx={{padding: 0, display: "flex", flexDirection: "column-reverse", alignItems: "end",width:"100%"}}>
                        <Image
                            src={item?.Multimedias?.[0] ? (item.Multimedias?.[0]?.Url + "&width=400") : "https://api.gympin.ir/resource/image?Id=11"}
                            style={imageStyle}
                            width={"100%"}/>
                        {item?.Location?.Name &&
                        <Grid container direction={"row"} sx={{height: "30px", position: "absolute",mb:"-1px"}}>


                            <img src={"/assets/images/cornerShape.svg"} style={{marginLeft: "-1px"}} height={"30px"} width={"30px"}/>
                            <Box alignItems={"center"} sx={{px: 1, backgroundColor: "white", borderRadius: "0 8px 0 0", display: "flex"}}>
                                <img src={"/logo192.png"} height={"18px"} width={"18px"}/>
                                <Typography sx={{paddingY: 0.5, pl: 1, display: "inline-block"}} variant={"body1"} component={"div"}>
                                    {item.Location.Name}
                                </Typography>
                            </Box>
                        </Grid>}


                        {/*<Rating name="read-only" value={4} sx={{position:"absolute",marginBottom:"5px"}}  />*/}
                    </Grid>
                    <Grid item sx={{padding: 1, minHeight: "88px", width: "100%"}}>

                        <Typography
                            onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))} className={"sportBullet"}
                            sx={{paddingTop: 0.5, paddingBottom: 0.5}}
                            variant={"h5"}>
                            {item.Name}
                        </Typography>
                        <Grid container
                              direction="row"
                              sx={{mt: 1}}
                              justifyContent={"space-between"}
                              onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))}
                              alignItems="center">
                            <Grid>
                                <GroupOutlined/>
                                <Typography sx={{mx: 0.5, fontSize: 13}}
                                            variant={"caption"}>
                                    جنسیت
                                </Typography>
                            </Grid>
                            <Grid>
                                {item?.Genders?.length < 1 && <Chip size={"small"} sx={{bgcolor: "#cccccc", color: "#555555"}}
                                                                  label={<><NewReleases
                                                                      sx={{color: "#cccccc"}}/><Typography variant={"caption"}
                                                                                                           sx={{px: 1}}>ثبت
                                                                      نشده</Typography></>}/>}
                                {item?.Genders?.map((gender, number) => (
                                    <div key={"kh" + number} className={"d-inline"}>
                                        {gender === "MALE" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                    label={<><SentimentSatisfiedAltOutlined
                                                                        sx={{color: "#ffffff"}}/><Typography variant={"caption"}
                                                                                                             sx={{px: 1}}>آقایان</Typography></>}/>}
                                        {gender === "FEMALE" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                      label={<><Face3Outlined sx={{color: "#ffffff"}}/><Typography
                                                                          variant={"caption"} sx={{px: 1}}>خانم‌ها</Typography></>}/>}
                                        {gender === "BOYS" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                    label={<><Face6Outlined sx={{color: "#ffffff"}}/><Typography
                                                                        variant={"caption"} sx={{px: 1}}>پسرها</Typography></>}/>}
                                        {gender === "GIRLS" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                     label={<><Face2Outlined sx={{color: "#ffffff"}}/><Typography
                                                                         variant={"caption"} sx={{px: 1}}>دخترها</Typography></>}/>}
                                        {gender === "KIDS" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                    label={<><ChildCare sx={{color: "#ffffff"}}/><Typography
                                                                        variant={"caption"} sx={{px: 1}}>کودکان</Typography></>}/>}
                                        {gender === "NONE" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff",mx:0.5}}
                                                                    label={<><SupervisedUserCircleOutlined
                                                                        sx={{color: "#ffffff"}}/><Typography variant={"caption"}
                                                                                                             sx={{px: 1}}>همه</Typography></>}/>}
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
                                <Typography sx={{mx: 0.5, fontSize: 13}}
                                            variant={"caption"}>
                                    زمان فعالیت
                                </Typography>
                            </Grid>
                            <Grid>
                                {item.ActiveTimes && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}} onClick={() => {
                                    setShowActiveTime(!showActiveTime)
                                }}
                                                           label={<Typography variant={"caption"} sx={{px: 1}}>مشاهده</Typography>}/>
                                }
                                {!item.ActiveTimes && <Chip size={"small"} sx={{bgcolor: "#cccccc", color: "#555555"}}
                                                            label={<><NewReleases
                                                                sx={{color: "#cccccc"}}/><Typography variant={"caption"}
                                                                                                     sx={{px: 1}}>ثبت
                                                                نشده</Typography></>}/>
                                }
                            </Grid>
                        </Grid>
                        <Collapse in={showActiveTime}>
                            <Alert>{item.ActiveTimes}</Alert>
                        </Collapse>

                        <Typography sx={{mt: 1, paddingY: 0.5}} variant={"body1"} component={"div"}
                                    onClick={() => navigate("/place/" + item.Id + "-" + fixTextToSlug(item.Name))}>
                            {item.Sports && item.Sports.map((sport, number) => (
                                <div key={"ph" + number} className={"d-inline"}>
                                    {number < 3 && <div className={"d-inline"}>
                                        <FiberManualRecordIcon className={"sportBullet"}
                                                               sx={{fontSize: 6, color: "#cc0f0f"}}/>
                                        <Typography variant={"caption"}>
                                            {sport.Name}
                                        </Typography>
                                    </div>}
                                    {number > 3 && number < 7 && <div className={"d-inline"}>
                                        <FiberManualRecordIcon className={"sportBullet"}
                                                               sx={{fontSize: 6, color: "#cc0f0f"}}/>
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
                            <Typography sx={{color: "#757575", fontWeight: 200, pr: 1}} variant={"subtitle2"}>
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
                                            lineHeight: 1
                                        }}
                                        variant={"subtitle1"}>
                                        {toPriceWithComma(item?.MinPriceBeforeDiscount)}
                                    </Typography>}
                                    primaryTypographyProps={{p: 0, m: 0, lineHeight: 0}}
                                    secondaryTypographyProps={{p: 0, m: 0, lineHeight: 0}}
                                    secondary={item?.MinPrice &&
                                    <Typography sx={{paddingRight: 1, color: "#26881a", fontWeight: 700, lineHeight: 1}}
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
                                            fontSize: "0.9rem",
                                            fontWeight: 400
                                        }}>{toPriceWithComma(item?.MinPriceBeforeDiscount - item.MinPrice)}</Typography>
                                        <Typography variant={"caption"} color={"primary"}
                                                    sx={{fontSize: "1rem", fontWeight: 400}}>{" تومان"}</Typography>
                                    </Grid>
                                    <Grid>
                                        <img src={"/assets/images/discountIcon.svg"} width={"15px"}/>
                                        <Typography variant={"caption"} color={"primary"}
                                                    sx={{fontSize: "1rem", fontWeight: 900, pl: 0.5}}>تخفیف</Typography>
                                    </Grid>
                                </Grid></>}
                            {!item.MinPrice && <Grid textAlign={"center"} size={22}>
                                <Typography sx={{color: "#757575"}} variant={item?.MinPriceBeforeDiscount?"subtitle1":"h6"}>
                                    {"بدون پلن فعال "}
                                </Typography>
                            </Grid>}


                        </Grid>
                    </Grid>

                </Grid>
            </Card>
        </Grid>

    );
};

export default __placeListItem;
