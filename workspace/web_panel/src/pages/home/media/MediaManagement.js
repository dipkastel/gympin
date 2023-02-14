import React, {useRef, useState} from "react";
import Notice from "../../partials/content/Notice";
import {Button, Card, CardContent, CardHeader, Grid, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import ImageManager from "./Image/ImageManager";
import VideoManager from "./Video/VideoManager";
import AudioManager from "./Audio/AudioManager";
import "./AddMedia.css"


const MediaManagement = () => {
    const [tab, setTab] = useState('IMAGE');
    const openAddModalRef = useRef();
    const changeTab = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>مدیریت رسانه ها</p>
            </Notice>
            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={"دسته بندی"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت دسته بندی رسانه
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/media-category"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مدیریت
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <TabContext value={tab}>
                <Portlet>
                    <PortletHeader
                        title={
                            <TabList onChange={changeTab} sx={{margin: 0}} aria-label="lab API tabs example">
                                <Tab label="Images" value="IMAGE"/>
                                <Tab label="Videos" value="VIDEO"/>
                                <Tab label="Audios" value="AUDIO"/>
                            </TabList>
                        }
                        toolbar={
                            <PortletHeaderToolbar>
                                <button
                                    type="button"
                                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                    onClick={(e) =>openAddModalRef.current.OpenModal(tab)}
                                >
                                    <AddIcon/>
                                </button>
                            </PortletHeaderToolbar>
                        }
                    />

                    <PortletBody>
                        <div className="kt-section ">
                            <div className="kt-section__body">
                                <TabPanel sx={{padding: 0}} value="IMAGE">
                                    <ImageManager ref={openAddModalRef}/>
                                </TabPanel>
                                <TabPanel sx={{padding: 0}} value="VIDEO">
                                    <VideoManager ref={openAddModalRef}/>
                                </TabPanel>
                                <TabPanel sx={{padding: 0}} value="AUDIO">
                                    <AudioManager ref={openAddModalRef}/>
                                </TabPanel>
                            </div>
                        </div>
                    </PortletBody>
                </Portlet>
            </TabContext>

        </>
    );

}

export default MediaManagement;
