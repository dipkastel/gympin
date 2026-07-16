"use client";

import { JSX, useState } from "react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
} from "@mui/material";

import {
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";

import { faqSources } from "@/lib/data/faqData";

export default function FaqAccordion(): JSX.Element {
    const [expanded, setExpanded] =
    useState<number>(0);

    const handleChange =
        (index: number) =>
            (_event: React.SyntheticEvent, isExpanded: boolean) => {
                setExpanded(isExpanded ? index : -1);
            };

    return (
        <section>
            <Container>
                <div className="accordion-faq">
                    {faqSources.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === index}
                            onChange={handleChange(index)}
                            disableGutters
                            elevation={0}
                            sx={{
                                m: 3,
                                borderRadius: "12px !important",
                                border: "1px solid #dddddd",
                                overflow: "hidden",

                                "&::before": {
                                    display: "none",
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    expanded === index ? (
                                        <ExpandMore />
                                    ) : (
                                        <ExpandLess />
                                    )
                                }
                                sx={{
                                    minHeight: 72,

                                    "& .MuiAccordionSummary-content": {
                                        my: 2,
                                    },
                                }}
                            >
                                <Typography variant="body1">
                                    {item.q}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography
                                    className="answer"
                                    variant="body2"
                                >
                                    {item.a}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </Container>
        </section>
    );
}
