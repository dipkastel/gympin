import { JSX } from "react";

import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface ImageTextProps {
  image: string;
  alt: string;
  title?: string;
  text: string;
}

export default function ImageText({
  image,
  alt,
  title,
  text,
}: ImageTextProps): JSX.Element {
  return (
    <section>
      <Container>
        <Grid
          container
          columns={4}
          sx={{
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Grid
            size={{ md: 2, xs: 4 }}
            sx={{
              px: 3,
            }}
          >
            <img
              alt={alt}
              className="apps-img"
              src={image}
            />
          </Grid>

          <Grid
            size={{ md: 2, xs: 4 }}
            sx={{
              px: 6,
            }}
          >
            {title && (
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mt: 8,
                }}
              >
                {title}
              </Typography>
            )}

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                lineHeight: "2rem",
                mt: 2,
                mb: 3,
                textAlign: "justify",
              }}
            >
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
