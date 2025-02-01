import React, {useState} from 'react';
import {
    Button,
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid2 as Grid,
    Rating,
    Typography
} from "@mui/material";
import {
    ChildCare,
    Face2Outlined,
    Face3Outlined,
    Face6Outlined,
    GroupOutlined, MapTwoTone,
    SentimentSatisfiedAltOutlined,
    SupervisedUserCircleOutlined
} from "@mui/icons-material";
import _PlaceMap from "./_PlaceMap";

const _placeBaseInfo = ({place}) => {

    const [openModalDirection,setOpenModalDirection] = useState(false);

    function renderModalDirection() {
        return(<Dialog
            open={openModalDirection} onClose={() => setOpenModalDirection(false)}>
            <DialogContent>
                <_PlaceMap place={place} />
            </DialogContent>
        </Dialog>)
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 2, padding: 2}}>
                <Grid
                    container
                    direction={"column"}
                    alignContent={"start"}
                >
                    <Grid>
                        <Typography sx={{fontSize: "1.5rem", fontWeight: 900}} variant={"h1"}>
                            {place.Name}
                        </Typography>
                    </Grid>
                    <Grid direction={"row"} sx={{mt:2}} container>
                        <Rating sx={{mt:1}} name="half-rating" value={5} precision={0.5}/>
                        <Typography sx={{mt:1.5, px:1}} variant={"caption"}>
                            {"5 از 5"}
                        </Typography>
                        <Typography sx={{mt:1.5, pl:3}} variant={"caption"}>
                            {"0 دیدگاه کاربران"}
                        </Typography>
                    </Grid>
                    <Divider variant={"fullWidth"} sx={{width:"100%",borderColor:"#555555",mt:2}}  />
                    {place?.Genders?.length > 0 && <Grid container
                                                         direction="row"
                                                         sx={{mt: 3}}
                                                         justifyContent={"space-between"}
                                                         alignItems="center">
                        <Grid>
                            {place?.Genders?.map((gender, number) => (
                                <div key={"kh" + number} className={"d-inline"}>
                                    {gender === "MALE" && <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff" ,mx:0.5}}
                                                                label={<><SentimentSatisfiedAltOutlined
                                                                    sx={{color: "#ffffff"}}/><Typography variant={"caption"} sx={{px: 1}}>آقایان</Typography></>}/>}
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
                    </Grid>}
                    <Divider variant={"fullWidth"} sx={{width:"100%",mt:3,borderColor:"#555555"}}  />
                    <Grid container columns={3} sx={{mt:2}} justifyContent={"space-between"}>
                        <Typography variant={"subtitle2"}>
                            {place?.Location?.parentName2}
                        </Typography>
                        <Typography variant={"subtitle2"}>
                            {place?.Location?.parentName}
                        </Typography>
                        <Typography variant={"subtitle2"}>
                            {place?.Location?.Name}
                        </Typography>
                    </Grid>
                    <Grid sx={{mt:1}}>
                        <Typography variant={"h2"} sx={{fontSize:"1rem",fontWeight:500,display:"inline"}} >
                            {"آدرس : "}
                        </Typography>
                        <Typography variant={"h2"} sx={{fontSize:"1rem",fontWeight:900,display:"inline"}} >
                            {place.Address}
                        </Typography>
                    </Grid>
                    <Button onClick={(e)=>setOpenModalDirection(true)} sx={{mt:1}} variant={"contained"} size={"large"} color={"inherit"} startIcon={<MapTwoTone />} > مشاهده روی نقشه و مسیریابی </Button>

                    <Divider variant={"fullWidth"} sx={{width:"100%",mt:2,borderColor:"#555555"}}  />

                    <Grid sx={{mt:2}}>
                        <Typography variant={"h2"} sx={{fontSize:"1rem",fontWeight:500,display:"inline"}} >
                            {"ورزش ها : "}
                        </Typography>
                        <Grid sx={{mt:1}}>
                            {place?.Sports?.map((sport, number) => (<Chip variant={"outlined"} sx={{mx:0.5}} key={number} label={sport.Name}/>))}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            {renderModalDirection()}
        </>
    );
};

export default _placeBaseInfo;
