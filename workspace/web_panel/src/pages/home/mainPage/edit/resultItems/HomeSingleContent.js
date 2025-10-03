import React from 'react';
import {Card, CardContent, CardMedia, Link, Typography} from "@mui/material";

const HomeSingleContent =(props) => {
    return (
        <>
                    <div >
                        <Link href={"/"+props?.item?.Destination} underline="none" color="inherit" fontWeight="800">
                            <Card sx={{margin:1}} elevation={3}>

                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={props?.item?.multimedia?.Url}
                                    alt={props?.item?.Title}
                                />
                                <CardContent>
                                    <Typography variant="h5" textAlign={"center"} color="text.secondary">
                                        {props?.item?.Title}
                                    </Typography>
                                    <Typography sx={{mt:1}} variant={"body2"} textAlign={"center"} color="text.secondary">
                                        {props?.item?.Description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
        </>
    );
};


export default HomeSingleContent;
