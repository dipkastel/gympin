import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Container, Typography} from "@mui/material";

const HomeTitle = (prop) => {
    const [data] = useState(prop.item);
    return (<>

                    <div className={"home-title"}>
                        <Typography variant={"subtitle1"}>
                            {data.Title}
                        </Typography>
                    </div>

        </>
    );
};

export default HomeTitle;
