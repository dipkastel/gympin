import React from 'react';
import {Box, Link} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeClickableBanner =(props) => {
    return (

        <div>
                <Link href={"/"+props.item.Destination} underline="none" color="inherit" fontWeight="800">
                    <Box>
                        <Image width={"100%"}  src={props.item.multimedia.Url}/>
                    </Box>
                </Link>
        </div>
    );
};


export default HomeClickableBanner;
