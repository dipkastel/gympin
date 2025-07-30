import React, {useContext, useEffect, useState} from 'react';
import {Box, Card, CircularProgress, Container, Grid2 as Grid, Link, Typography} from "@mui/material";
import {Place_query} from "../../../network/api/place.api";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import Slick from "react-slick";
import {Image} from "react-bootstrap";
import __placeListItemSlick from "../../places/placesList/__placeListItemSlick";
import {useSelector} from "react-redux";

const _HomePlaceList = ({title,query,ls,playSpeed}) => {


    const error = useContext(ErrorContext);
    const [places,setPlaces] = useState(null);
    const currentUser = useSelector(state => state.auth.user);


    const settings = {
        // dots: true,
        // slidesToShow: 4,
        // slidesToScroll: 2,
        infinite: true,
        centerMode:true,
        // cssEase: 'linear',
        swipeToSlide:true,
        // slidesToShow:4,
        //  initialSlide: 1,
        autoplay: true,
        rows: 1,
        // focusOnSelect:true,
        autoplaySpeed: playSpeed*32,
        pauseOnHover: false,
        arrows: false,
        rtl: false,
        responsive: [
            {
                breakpoint: 2500,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1
                }
            }
        ]

    };

    useEffect(() => {
        getPlaces();
    }, []);

    function getPlaces(){
        Place_query({
            queryType: "FILTER",
            Status: "Active",
            ParentParentLocationId:currentUser?.Location?.Id,
            ...query,
            // Name: searchString,
            // Sports:filters.find(f=>f.type==="Sports").value,
            // LocationId:filters.find(f=>f.type==="location").value,
            // Gender:filters.find(f=>f.type==="gender")?filters.find(f=>f.type==="gender").value:null,
            // Option: null,
            // paging: {Page: 0, Size: 20, Desc: true, OrderBy: "Id"}
        }).then(result => {
            setPlaces(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    };

    return (
        <>
            <Grid sx={{my:2}} direction={"column"} container>
                <Grid sx={{mx:3}}>
                    <Typography sx={{fontWeight:600}} >{title}</Typography>
                </Grid>
                    <Container sx={{px:0}} maxWidth>
                        <div dir={"ltr"}>
                            {places?.content&&<Slick {...settings}>
                                {places?.content?.map((item,Number)=>(
                                    <div  key={ls+Number}>
                                        <__placeListItemSlick item={item}/>
                                    </div>
                                ))}
                            </Slick>}
                        </div>
                    </Container>

                {!places&&<Grid textAlign={"center"}>
                    <CircularProgress/>
                </Grid>}
            </Grid>
        </>
    );
};

export default _HomePlaceList;
