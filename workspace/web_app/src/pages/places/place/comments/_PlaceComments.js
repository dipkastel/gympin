import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    AlertTitle, Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List, ListItem, ListItemText, Paper,
    TextField,
    Typography
} from "@mui/material";
import {PlaceComment_AddComment, PlaceComment_query} from "../../../../network/api/placeRateAndComment.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {SportsHockeyRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const _PlaceComments = ({place,currentUser}) => {

    const [loading, setLoading] = useState(true);
    const [comments,SetComments] = useState(null);
    const [comment,setComment] = useState(null);
    const navigate = useNavigate();
    const error = useContext(ErrorContext);

    useEffect(() => {

        if(place?.Id)
            getComments();

    }, [place]);

    function getComments(){
        setLoading(true);
        PlaceComment_query({
            queryType: "FILTER",
            PlaceId:place.Id,
            paging: {Page: 0, Size: 50, Desc: true}
        }).then(result => {
            setLoading(false);
            SetComments(result.data.Data);
        }).catch(e => {
            setLoading(false);
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });



    }

    function addNewComment(e){
        e.preventDefault();
        if(!currentUser?.Id){
            error.showError({
                clickable: true,
                message: 'برای ثبت نظر باید وارد شوید',
                buttonTitle: 'ورود',
                duration: 8000,
                onClick: () => {
                    navigate("/auth/login", {replace: false});
                }
            });
            return ;
        }
        PlaceComment_AddComment({
            Comment: e.target.comment.value,
            PlaceId: place.Id,
            UserId: currentUser.Id,
        }).then(result => {
            error.showError({message: "نظر شما با موفقیت ثبت شد! پس از تایید، منتشر خواهد شد.",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <section id={"Comments"}>

            <Card elevation={3}  sx={{mx: 2,mt:4,mb:2, padding: 1}}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt:-5,bgcolor:"#FFFFFF",position:"absolute",px:3}} gutterBottom>
                        نظرات کاربران
                    </Typography>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                            <CircularProgress color="error" />
                        </Box>
                    ) : comments?.content?.length === 0 ? (
                        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 2 }}>
                            شما اولین نظر را ثبت کنید.
                        </Typography>
                    ) : (
                        <List sx={{ mb: 2 }}>
                            {comments?.content?.map((comment, index) => (
                                <Grid container direction={"row"} justifyContent={"space-between"} sx={{width:"100%"}}>
                                    <Paper key={index} sx={{ backgroundColor: "#f9f9f9",pl:2,pt:2,pr:1, borderRadius: 2, mb: 1 ,width:"100%"}}>
                                        <ListItemText primary={comment.Comment} primaryTypographyProps={{width:"100%"}} />
                                        <ListItemText primaryTypographyProps={{variant:"caption",color:"#999999"}}  sx={{width:"100%",direction:"rtl",mt:2}} primary={"کاربر جیم پین"} />
                                        {comment?.CreatedDate&&<ListItemText primaryTypographyProps={{variant:"caption",color:"#999999"}}  sx={{width:"100%",direction:"rtl"}} primary={new Date(comment?.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                        })} />}
                                    </Paper>
                                </Grid>
                            ))}
                        </List>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* فرم ارسال کامنت */}
                    <form onSubmit={addNewComment}>
                        <TextField
                            multiline
                            minRows={3}
                            name={"comment"}
                            fullWidth
                            placeholder="نظر خود را بنویسید..."
                            value={comment||""}
                            inputProps={{ minLength: 10, maxLength: 300 }}
                            helperText="نظر باید بین ۱۰ تا ۳۰۰ کاراکتر باشد"
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                mb: 2,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#C8102E",
                                fontWeight: "bold",
                                py: 1.5,
                                "&:hover": { backgroundColor: "#a50e26" },
                            }}
                        >
                            ارسال نظر
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default _PlaceComments;
