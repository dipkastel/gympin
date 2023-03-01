import React from 'react';
import {Box} from "@mui/material";
import {Image} from "react-bootstrap";

const HomeBanner =(props) => {
    return (

        <div>
                <Box>
                    <Image width={"100%"}  src={props.item.multimedia.Url}/>
                </Box>
        </div>
    );
};


export default HomeBanner;
