import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import Notice from "../../../../../partials/content/Notice";
import _wizardSubscribe from "./ticketSubscribe/_wizardSubscribe";

const _wizardTickets = ({allowNext}) => {
    const sections={
        subscribe:"مدیریت عضویت ها",
        course:"مدیریت کلاس ها",
        reserve:"مدیریت رزرو ها",
        product:"مدیریت اجناس فروشی",
        food:"مدیریت غذا ها",
        workout:"مدیریت برنامه های ورزشی",
        diet:"مدیریت برنامه های غذایی",
        service:"مدیریت خدمات و سرویس ها"}
    const [selectedSection,setSelectedSection] = useState(null);

    allowNext(true);

    function renderMenu(){
        return (
            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"عضویت ها"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت عضویت ها
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.subscribe)}
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مدیریت
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"کلاس ها"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت کلاس ها
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.course)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"رزرو ها"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت رزرو ها
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.reserve)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"فروشگاه"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت اجناس فروشی
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.product)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"غذا ها"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت غذا ها
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.food)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"برنامه ورزشی"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت برنامه های ورزشی
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.workout)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"برنامه غذایی"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت برنامه های غذایی
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.diet)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"خدمات"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت خدمات و سرویس ها
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e)=>setSelectedSection(sections.service)}
                                sx={{marginRight: "auto"}}
                                size="large"
                                disabled={true}
                            >
                                به زودی
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
    function renderBackMenu(){
        return (<>
            <Notice icon="kt-font-primary">
                <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                    <Grid>{selectedSection}</Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e)=>setSelectedSection(null)}
                            sx={{marginRight: "auto"}}
                            size="large"
                        >
                            بازگشت
                        </Button>
                    </Grid>
                </Grid>
            </Notice>
        </>)
    }

    function renderSwitch(){
        switch (selectedSection) {
            case null:{
               return  renderMenu();
            }
            case sections.subscribe:{
                return (<>
                    {renderBackMenu()}
                    <_wizardSubscribe />
                </>);

            }
            case sections.course:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.reserve:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.product:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.food:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.workout:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.diet:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
            case sections.service:{
                return (<>
                    {renderBackMenu()}
                </>);

            }
        }
    }

    return renderSwitch()
};

export default _wizardTickets;
