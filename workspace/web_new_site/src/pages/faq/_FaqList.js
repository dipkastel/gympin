import React, {useState} from 'react';
import {faq_sources} from "../../helper/data/faq_sources";
import {Card, CardContent, CardHeader, Collapse, Container} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const _FaqList = () => {
    const [activeDefault, setActiveDefault] = useState(0);
    return (
        <section>
            <Container>
                <div className="accordion-faq">
                    {faq_sources.map((d, i) => (
                        <div key={i}>
                            <Card className={activeDefault === i && "active"} elevation={0}
                                  sx={{m: 3, borderRadius: 3, border: "1px solid #dddddd"}}
                                  onClick={()=>setActiveDefault(i)}
                            >
                                <CardHeader
                                    title={d.q}
                                    action={activeDefault === i ?<ExpandMore />:<ExpandLess />}
                                />
                                <Collapse in={activeDefault === i } timeout="auto" unmountOnExit>
                                    <CardContent className={"answer"} >
                                        {d.a}
                                    </CardContent>
                                </Collapse>
                            </Card>
                            {/*<div onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className="card__header" id="heading1">*/}
                            {/*    <h5 className="mb-0 title">*/}
                            {/*        <button className="btn btn-link collapsed" type="button" data-toggle="collapse"*/}
                            {/*                data-target="#collapse1" aria-expanded={activeDefault === i ? "true" : "false"}*/}
                            {/*                aria-controls="collapse1">*/}
                            {/*            {d.q}*/}
                            {/*        </button>*/}
                            {/*    </h5>*/}
                            {/*</div>*/}
                            {/*<div id="collapse1" className={`collapse ${activeDefault === i ? "show" : ""}`} aria-labelledby="heading1"*/}
                            {/*     data-parent="#accordionFaq">*/}
                            {/*    <div className="card__body">*/}
                            {/*        <p>{d.a}</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default _FaqList;
