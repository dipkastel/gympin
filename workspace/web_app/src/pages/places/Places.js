import React, {useEffect} from 'react';
import _PlacesList from "./placesList/_PlacesList";
import {Alert, Link} from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {useNavigate} from "react-router-dom";

const Places = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'مراکز';
    }, []);


    return (
        <>
            {/*<div className={"mapIcon"}>*/}
            {/*    <Fab color={"primary"} href={"/placesMap"} aria-label="map">*/}
            {/*        <Public />*/}
            {/*    </Fab>*/}
            {/*</div>*/}
            <div>
                <Alert sx={{mx: 1,mt:2}} variant={"outlined"} onClick={(e) => navigate("/placesMap")} icon={<TravelExploreIcon fontSize="inherit"/>} severity={"info"}>
                    <Link href={"/placesMap"}>
                        برای مشاهده مراکز روی نقشه اینجا کلیک کنید
                    </Link>
                </Alert>
            </div>
            <_PlacesList/>
        </>
    );
};

export default Places;
