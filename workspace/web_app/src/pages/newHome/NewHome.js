import React from 'react';
import {Grid2 as Grid} from "@mui/material";
import _HomeCategories from "./subs/_HomeCategories";
import _HomePlaceList from "./subs/_HomePlaceList";
import _HomeBanner from "./subs/_HomeBanner";
import _HomeArticleList from "./subs/_HomeArticleList";
import {useNavigate} from "react-router-dom";

const NewHome = () => {

    const navigate = useNavigate();
    return (
        <>
            <Grid>
                <_HomeCategories />
            </Grid>
            <Grid>
                <_HomeBanner
                    smImage={"/assets/images/banner/psy-dash.jpg"}
                    xlImage={"/assets/images/banner/psy-dash-full.jpg"}
                    sx={{mt:4,mb:2}}
                    onClick={()=>{navigate("/place/268")}} />
            </Grid>
            <>
                <_HomePlaceList title={"مجموعه‌های جدید"} query={{paging: {Page: 0, Size: 10, Desc: true, OrderBy: "Id"}}} ls={"new"} playSpeed={3000} />
            </>
            <Grid>
                <_HomeBanner
                    smImage={"/assets/images/banner/MassageBanner.jpg"}
                    xlImage={"/assets/images/banner/MassageBanner-full.jpg"}
                    sx={{mt:0}}
                    onClick={()=>{navigate("/places/49")}}
                />
            </Grid>
            <>
                <_HomePlaceList title={"برترین‌های این ماه"} query={{paging: {Page: 0, Size: 10, Desc: true, OrderBy: "order"}}} ls={"moon"} playSpeed={4000}/>
            </>
            <Grid>
                <_HomePlaceList title={"برترین مجموعه‌های آبی"} query={{Sports:36,paging: {Page: 0, Size: 10, Desc: true, OrderBy: "Id"}}} ls={"water"} playSpeed={3500} />
            </Grid>
            <>
                {/*<_HomeBanner*/}
                {/*    smImage={"/assets/images/banner/BadansaziBanner.jpg"}*/}
                {/*    xlImage={"/assets/images/banner/BadansaziBanner-full.jpg"}*/}
                {/*    sx={{mt:0}}*/}
                {/*    onClick={()=>{navigate("/places/11")}}*/}
                {/*/>*/}

                <Grid>
                    <_HomeBanner
                        smImage={"/assets/images/banner/MapBanner.jpg"}
                        xlImage={"/assets/images/banner/MapBanner-full.jpg"}
                        sx={{mt:4,mb:2}}
                        onClick={()=>{navigate("/placesMap")}} />
                </Grid>
            </>

            <Grid>
                <_HomePlaceList title={"ماساژ و اسپا"} query={{Sports:49,paging: {Page: 0, Size: 10, Desc: true, OrderBy: "Id"}}} ls={"water"} playSpeed={3500} />
            </Grid>
            {/*<Grid>*/}

            {/*    <_HomeArticleList title={"آخرین مقالات سایت"} />*/}
            {/*</Grid>*/}
        </>
    );
};

export default NewHome;
