import {JSX} from "react";

import {Card, CardContent, Grid, Typography} from "@mui/material";

interface SingleGoalProps {
    title: string;
    text: string;
    image: string;
    alt: string;
}

export default function SingleGoal({title, text, image, alt}: SingleGoalProps): JSX.Element {
    return (
        <Grid
            size={{lg: 4, sm: 8, xs: 16}}
            sx={{
                p: 2,
                justifyItems: "center",
            }}
        >
            <Card
                elevation={10}
                sx={{
                    width: "100%",
                    minHeight: 360,
                    borderRadius: 3,
                }}
            >
                <CardContent className="goals">
                    <Grid sx={{
                        display:"flex",
                        flexDirection:"column"
                    }}>
                        <Grid>
                            <img
                                src={image}
                                alt={alt}
                                className="goals-img"
                            />
                        </Grid>

                        <Grid>
                            <Typography
                                component="h3"
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mt: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>

                        <Grid>
                            <Typography
                                variant="body2"
                                className="text"
                            >
                                {text}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
