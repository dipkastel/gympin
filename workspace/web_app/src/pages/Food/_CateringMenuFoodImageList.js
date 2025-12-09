import React,{useState} from 'react';
import {Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    Add,
    Beenhere, ChatBubbleOutline,
    DeleteOutline, PermMedia,
    RemoveCircleOutline,
    StarOutlineSharp,
    StarSharp
} from "@mui/icons-material";
import Slider from "react-slick";
import {Image} from "react-bootstrap";
import {replacePersianNumbers, toPriceWithComma} from "../../helper/utils";

const _CateringMenuFoodImageList = ({title, Items, onAddClick, onMinusClick, selected}) => {

    const settings = {
        centerMode: false,
        infinite: true,
        slidesToShow: 1,
        dots: false,
        rtl:true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />

    };

    const [selectedItem,setSelectedItem] = useState(null);
    const [selectedItemImages,setSelectedItemImages] = useState(null);

    function getDiscountPersent(item) {
        return  Math.round(100-item?.Food?.Price*100/item?.Food?.ValuePrice)
    }


    function Arrow() {
        return (
            <div
                style={{ display: "none" }}
            />
        );
    }

    function renderModalDetails(){

        return(<Dialog
            open={!!selectedItem} onClose={() => setSelectedItem(null)}>
            <DialogTitle>{selectedItem?.Food?.Name}</DialogTitle>
            <DialogContent>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    {selectedItem?.Food?.Description}
                </Typography>
            </DialogContent>
        </Dialog>)
    }

    function renderModalImages(){

        return(<Dialog
            open={!!selectedItemImages} onClose={() => setSelectedItemImages(null)}>
            <DialogTitle>{selectedItemImages?.Food?.Name}</DialogTitle>
            <DialogContent>
                <Slider  {...settings}>
                    {selectedItemImages?.Food?.Multimedias?.map((item,num)=>(
                        <div>
                            <Card className={"rtl"} elevation={4}  sx={{borderRadius: 4,mx:2,my:3}}>
                                <img alt={selectedItemImages?.Food?.Name+" - "+ num} width={"100%"} className={"slider-img"} src={item.Url}/>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </DialogContent>
        </Dialog>)
    }

    return (
        <>

            <Grid sx={{mx: 0.5, mt: 1, mb: 1}}>
                <Card sx={{p: 2, width: "100%", bgcolor: "rgba(199,199,199,0.2)"}} variant={"outlined"}>
                    <Grid container direction={"row"}>
                        <Typography sx={{px: 1}}>{title}</Typography>
                    </Grid>
                </Card>
            </Grid>
            <Grid container columns={12} spacing={0.5}>

                {Items.map((row, number) => (
                    <Grid
                        textAlign={"center"}
                        justifyContent={"center"}
                        justifyItems={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        size={{xs: 12, sm: 12, md: 6, lg: 6, xl: 4}}
                        sx={{px: 0.5}}
                        key={"ooooo" + number + "--" + row?.Id}>
                        <Card sx={{mt: 2, width: "100%"}}>
                            {!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count &&
                            <Grid textAlign={"start"} sx={{pl: 1, bgcolor: "#121235", width: "100%",cursor:"pointer"}}
                                  onClick={(e) => onMinusClick(e, selected?.find(inf => inf.FoodMenu.Id === row?.Id))}>
                                <Beenhere sx={{fontSize: "3rem", color: "#D12121FF", mt: -3, position: "absolute"}}/>
                            </Grid>}
                            <Grid sx={{mt: 2}} container direction={"row"}>
                                <Grid container direction={"column"} alignContent={"start"} alignItems={"start"} size={{xs:7,sm:7}}>
                                    <Grid container
                                        onClick={(e)=>setSelectedItem(row)}
                                        direction={"column"} alignContent={"start"} alignItems={"start"} >
                                        <Typography sx={{mt: 1, ml: 2, fontWeight: 600, color: "#333333"}} variant={"h6"}>
                                            {row.Food.Name}
                                        </Typography>
                                        <Typography sx={{ml: 2, color: "#666666"}} textAlign={"justify"} variant={"subtitle1"}>
                                            {row?.Food?.Description?.substr(0, 120)}
                                            {row?.Food?.Description?.length > 120 && "..."}
                                        </Typography>
                                    </Grid>

                                    <Grid container sx={{cursor: "pointer"}}
                                          onClick={(e) => onAddClick(e, row)} direction={"column"} alignItems={"start"}>
                                        <Grid sx={{ml: 2, mr: 1, color: "#444444"}}>
                                            <Typography sx={{
                                                mr: 1,
                                                px: 0.6,
                                                pt: 0.4,
                                                pb: 2,
                                                borderRadius: 1.5,
                                                bgcolor: "#ffb9b9",
                                                display: "inline-flex",
                                                fontSize: "0.7rem",
                                                fontWeight: 500
                                            }} variant={"body2"}>
                                                {row?.Catering?.Name}
                                            </Typography>
                                            <Typography sx={{
                                                px: 0.6,
                                                pt: 0.4,
                                                pb: 2,
                                                borderRadius: 1.5,
                                                bgcolor: "#ffb9b9",
                                                display: "inline-flex",
                                                fontSize: "0.7rem",
                                                fontWeight: 500
                                            }} variant={"body2"}>
                                                {row?.Category}
                                            </Typography>
                                        </Grid>
                                        <Grid container sx={{ml: 2, mt: -1.5, mb: 3,minHeight:50}}>
                                            <Grid container direction={"row"} alignItems={"center"}
                                                  sx={{bgcolor: "#dcdcdc", borderRadius: 1.5, zIndex: 2}}>
                                                {getDiscountPersent(row)>0&&<Grid>
                                                    <Typography sx={{
                                                        ml: 0.6,
                                                        px: 0.6,
                                                        pt: 0.7,
                                                        pb: 0.4,
                                                        borderRadius: 1.5,
                                                        bgcolor: "#f3a5a5",
                                                        display: "inline-flex",
                                                        color: "#ad2121",
                                                        fontSize: "0.9rem",
                                                        fontWeight: 600
                                                    }} variant={"body2"}>
                                                        {replacePersianNumbers("%" + getDiscountPersent(row))}
                                                    </Typography>
                                                </Grid>}
                                                <Grid container direction={"column"} alignItems={"start"}>
                                                    {getDiscountPersent(row)>0&&<Typography sx={{
                                                        ml: 1,
                                                        mt: 1,
                                                        color: "#777777",
                                                        fontSize: "0.9rem",
                                                        fontWeight: 500,
                                                        textDecoration: "line-through"
                                                    }} variant={"body2"}>
                                                        {replacePersianNumbers(toPriceWithComma(row?.Food?.ValuePrice))}
                                                    </Typography>}
                                                    <Grid container direction={"row"} alignItems={"end"}>
                                                        <Typography sx={{ml: 1, color: "#333333", fontSize: "0.9rem", fontWeight: 500}}
                                                                    variant={"body2"}>
                                                            {replacePersianNumbers(toPriceWithComma(row?.Food?.Price))}
                                                        </Typography>
                                                        <Typography sx={{
                                                            ml: 0.4,
                                                            mr: 1,
                                                            mb: 0.8,
                                                            color: "#666666",
                                                            fontSize: "0.6rem",
                                                            fontWeight: 500
                                                        }} variant={"body2"}>
                                                            {"تومان"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid sx={{height: "100%", zIndex: 1}}>
                                                <Typography sx={{
                                                    height: "100%",
                                                    pr: 1,
                                                    alignContent: "center",
                                                    pl: 2,
                                                    ml: -1,
                                                    color: "#FFFFFF",
                                                    bgcolor: "#d12121",
                                                    borderRadius: 1.5,
                                                    fontSize:"0.8rem"
                                                }} variant={"h5"}>
                                                    رزرو غذا
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                </Grid>
                                <Grid size={{xs:5,sm:5}}>
                                    <Grid container alignContent={"center"} direction={"column"} sx={{width: "100%", p: 0.5}}>
                                        {row?.Food?.Multimedias.length>1&&<PermMedia sx={{color:"#757575",position:"absolute",ml:5,mt:1}}  />}
                                        <Image rounded={"12px"} className={"m-1"}
                                               onClick={(e)=>row?.Food?.Multimedias.length>1&&setSelectedItemImages(row)}
                                               src={(row?.Food?.Multimedias[0]?.Url) || "/assets/images/icons/ic-empty-transaction.svg"}
                                               width={!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count?"50%":"70%"}/>
                                    </Grid>

                                    <Grid sx={{width: "100%", px: 0.5}}>
                                        <Rating
                                            name="simple-controlled"
                                            value={4.1}
                                            readOnly
                                            // onChange={(event, newValue) => {
                                            //     setValue(newValue);
                                            // }}
                                        />
                                    </Grid>
                                    {!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count &&<Grid container direction={"row"} alignItems={"center"} alignContent={"center"} justifyContent={"center"} sx={{width: "100%", px: 0.5,pb:1}}>
                                        <Grid sx={{px:0.5,py:0.4,mx:0.4,borderRadius:1.5,bgcolor:"#eee"}} container direction={"row"}>
                                            <StarOutlineSharp sx={{mr:0.2,mt:0.2,fontSize:"0.9rem"}} />
                                            <Typography
                                                variant={"overline"}  sx={{fontSize:"0.5rem"}} alignContent={"center"} >امتیاز شما</Typography>
                                        </Grid>
                                        <Grid sx={{px:0.5,py:0.3,mx:0.4,borderRadius:1.5,bgcolor:"#eee"}} container direction={"row"}>
                                            <ChatBubbleOutline sx={{mr:0.2,mt:0.2,fontSize:"0.9rem"}}  />
                                            <Typography
                                                variant={"overline"}  sx={{fontSize:"0.5rem"}}  alignContent={"center"}>نظرات</Typography>
                                        </Grid>
                                    </Grid>}
                                    {!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count &&<Grid container direction={"row"} alignItems={"center"} alignContent={"center"} justifyContent={"center"} sx={{width: "100%", px: 0.5}}>
                                        <Grid sx={{px:0.5,py:0.1,mx:0.2,borderRadius:1.5,bgcolor:"#eee"}} container direction={"row"}>
                                            <StarOutlineSharp sx={{mr:0.1,fontSize:"1rem"}} />
                                            <Typography sx={{fontSize:"0.5rem"}}
                                                variant={"overline"} alignContent={"center"} >امتیاز شما</Typography>
                                        </Grid>
                                        <Grid sx={{px:0.5,py:0.1,mx:0.2,borderRadius:1.5,bgcolor:"#eee"}} container direction={"row"}>
                                            <ChatBubbleOutline sx={{mr:0.1,fontSize:"0.9rem"}} />
                                            <Typography sx={{fontSize:"0.5rem"}}
                                                variant={"overline"} alignContent={"center"} >نظرات</Typography>
                                        </Grid>
                                        <Grid sx={{px:0.5,py:0.1,mx:0.2,borderRadius:1.5,bgcolor:"#eee"}} container direction={"row"}>
                                            <StarSharp sx={{mr:0.1,fontSize:"1rem",color:"#ff8929"}} />
                                            <Typography sx={{fontSize:"0.5rem"}}
                                                        variant={"overline"} alignContent={"center"} >
                                                {replacePersianNumbers("5")}</Typography>
                                        </Grid>
                                    </Grid>}

                                    {!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count &&
                                    <Grid container justifyContent={"center"} >
                                        <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{width:"90%",bgcolor:"#f0f0f0",mb:1,mt:2,borderRadius:1.5,direction:"rtl"}}>

                                            <IconButton size={"small"} sx={{my: 0.5,mx:1,bgcolor:"#ffffff"}}
                                                        onClick={(e) => onAddClick(e, row)}
                                                        color={"error"}>
                                                <Add />
                                            </IconButton>
                                            <Typography
                                                variant={"subtitle2"}> {replacePersianNumbers((selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count || 0).toString())}</Typography>

                                            <IconButton size={"small"} sx={{my: 0.5,mx:1}}
                                                        onClick={(e) => onMinusClick(e, selected?.find(inf => inf.FoodMenu.Id === row?.Id))}
                                                        color={"default"}>

                                                {selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count > 1 ? <RemoveCircleOutline/> : <DeleteOutline/>}
                                            </IconButton>
                                        </Grid>
                                    </Grid>}

                                </Grid>
                            </Grid>
                        </Card>


                    </Grid>
                ))}

            </Grid>
            {renderModalDetails()}
            {renderModalImages()}
        </>
    );
};

export default _CateringMenuFoodImageList;
