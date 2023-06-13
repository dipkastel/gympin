import React, {useState} from 'react';
import Slick from "react-slick";
import {Box, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import _PlaceMap from "./_PlaceMap";

const _PlaceImages = ({place}) => {
    const [showDetails,setShowDetails] = useState(true);
    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        initialSlide: 1,
        autoplay: true,
        rows: 1,
        autoplaySpeed: 500000,
        pauseOnHover: true,
        arrows: false,
        rtl: true

    };
    return (
        <>
            <div className={"pdata"} onClick={()=>setShowDetails(!showDetails)}>
                {showDetails&&<Typography className={"ptext"} variant={"h5"}>
                    {"مجموعه "+place.Name}
                </Typography>}
                {showDetails&&<Typography className={"ptext"} variant={"body2"}>
                    {place.Location.Name} -
                    {place.Address}

                </Typography>}
            </div>
            <Slick className={"mb--8"} {...settings}>
                {place.Multimedias.map((item, index) => (
                    <div key={index}  onClick={()=>setShowDetails(!showDetails)}>
                         <Link  underline="none" color="inherit" fontWeight="800">
                            <Box>
                                <Image width={"100%"} src={item.Url}/>
                            </Box>
                        </Link>
                    </div>
                ))}
            </Slick>
        </>
    );
};

export default _PlaceImages;
