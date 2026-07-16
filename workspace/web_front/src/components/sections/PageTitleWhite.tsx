import {JSX} from "react";

import {Grid, Typography} from "@mui/material";

type PageTitleWhiteProps = {
    title: string;
    subtitle: string;
};

export default function PageTitleWhite({title, subtitle}: PageTitleWhiteProps): JSX.Element {
    return (
        <section>
            <Grid
                className="headerw"
                direction="column"
                sx={{
                    alignContent: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    className="title"
                    variant="h1"
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        p: 1,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    className="subtitle"
                    variant="h2"
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
