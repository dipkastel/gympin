import React, {useContext} from 'react';
import {Badge, Card, CardContent, Grid2 as Grid, Link, Rating, Typography} from "@mui/material";
import {ChatBubbleOutline, Comment} from "@mui/icons-material";
import {PlaceRate_AddRate} from "../../../../network/api/placeRateAndComment.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _placeBaseInfo = ({place, currentUser}) => {

    const error = useContext(ErrorContext);

    function setRankForPlace(e, place) {
        PlaceRate_AddRate({
            Rate: parseFloat(e.target.value),
            PlaceId: place.Id,
            UserId: currentUser.Id,
        }).then(result => {
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>

            <div className={"nopadding"}>
                <Card elevation={3} sx={{mx: 2, mt: 4, mb: 2, padding: 1}}>
                    <CardContent>
                        <Typography variant="h1" fontWeight="bold" textAlign={"left"}
                                    sx={{mt: -5, bgcolor: "#FFFFFF", position: "absolute", px: 3,fontSize:"1.2rem"}} gutterBottom>
                            {"مجموعه " + place.Name}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems="stretch"
                            sx={{mt: 2}}
                        >

                            <Grid container direction={"row"}>
                                <Rating size={"large"} name="half-rating" value={place.Rate || 5} precision={1} sx={{pt:0.5}}
                                        onChange={(e) => setRankForPlace(e, place)}/>
                                {place?.Rate && <Typography sx={{px: 1, pt: 1}} variant={"subtitle1"}>
                                    {place.Rate + " از 5"}
                                </Typography>}
                            </Grid>
                            <Grid component={"a"} color={"black"} href={"#Comments"}  container direction={"row"} sx={{pt:1.2,textDecoration:"none"}}>
                                <Badge variant={"standard"}
                                       anchorOrigin={{
                                           vertical: 'top',
                                           horizontal: 'left',
                                       }}  color={"error"} badgeContent={place?.CommentCount} >
                                        <ChatBubbleOutline sx={{fontSize:"1.3rem"}}/>
                                </Badge>
                                <Typography sx={{mx:0.3}} variant={"subtitle2"}>
                                    {"نظرات"}
                                </Typography>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default _placeBaseInfo;
