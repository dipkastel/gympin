import {JSX} from "react";

import {Grid, Typography} from "@mui/material";

interface PageTitleProps {
    title: string;
    subtitle: string;
}

export default function PageTitle({
                                      title,
                                      subtitle,
                                  }: PageTitleProps): JSX.Element {
    return (
        <section>
            <Grid
                direction="column"
                className="header"
                sx={{
                    alignContent: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    component="h1"
                    variant="h1"
                    className="title"
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        p: 1,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    component="h2"
                    variant="h2"
                    className="subtitle"
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        p: 3,
                    }}
                >
                    {subtitle}
                </Typography>
            </Grid>
        </section>
    );
}
