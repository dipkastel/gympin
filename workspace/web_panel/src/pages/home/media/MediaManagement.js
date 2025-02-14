import React, {useRef, useState} from "react";
import Notice from "../../partials/content/Notice";
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import ImageManager from "./Image/ImageManager";
import VideoManager from "./Video/VideoManager";
import AudioManager from "./Audio/AudioManager";
import "./AddMedia.css"
import {FilterAlt} from "@mui/icons-material";
import AllFilesManager from "./AllFiles/AllFilesManager";


const MediaManagement = () => {
    const [tab, setTab] = useState('IMAGE');

    const openAddModalRef = useRef();
    const openFilterModalRef = useRef();
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
                                <Tab label="AllFiles" value="ALLFILES"/>
                            </TabList>
                        }
                        toolbar={
                            <PortletHeaderToolbar>

                                <div className="kt-section__body">
                                    <TabPanel sx={{padding: 0}} value="IMAGE">
                                        <IconButton aria-label="fingerprint"
                                                    color={"default"}
                                                    onClick={(e) => openAddModalRef.current.OpenModal(tab)}>
                                            <AddIcon/>
                                        </IconButton>

                                        <IconButton aria-label="fingerprint"
                                                    color={"default"}
                                                    onClick={() => openFilterModalRef.current.OpenModal(true)}>
                                            <FilterAlt/>
                                        </IconButton>
                                    </TabPanel>
                                    <TabPanel sx={{padding: 0}} value="VIDEO">

                                    </TabPanel>
                                    <TabPanel sx={{padding: 0}} value="AUDIO">

                                    </TabPanel>
                                    <TabPanel sx={{padding: 0}} value="ALLFILES">

                                    </TabPanel>
                                </div>
                            </PortletHeaderToolbar>
                        }
                    />

                    <PortletBody>
                        <div className="kt-section ">
                            <div className="kt-section__body">
                                <TabPanel sx={{padding: 0}} value="IMAGE">
                                    <ImageManager openAddModalRef={openAddModalRef} openFilterModalRef={openFilterModalRef}/>
                                </TabPanel>
                                <TabPanel sx={{padding: 0}} value="VIDEO">
                                    <VideoManager/>
                                </TabPanel>
                                <TabPanel sx={{padding: 0}} value="AUDIO">
                                    <AudioManager/>
                                </TabPanel>
                                <TabPanel sx={{padding: 0}} value="ALLFILES">
                                    <AllFilesManager/>
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
