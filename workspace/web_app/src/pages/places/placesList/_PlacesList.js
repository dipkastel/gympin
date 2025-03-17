import React, {useContext, useEffect, useState} from 'react';
import {Card, CircularProgress, Collapse, Container, FormControl, FormControlLabel, Grid2 as Grid, Link, TextField} from "@mui/material";
import {Place_query} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import __placeListItem from "./__placeListItem";
import {sports_query} from "../../../network/api/sport.api";
import {Location_query} from "../../../network/api/location.api";
import {useNavigate, useParams} from "react-router-dom";


export const defaultPlaceFilters = [
    {
        type: "Sports",
        name: "ورزش",
        value: null,
        selectedName: ""
    },
    {
        type: "location",
        name: "منطقه",
        value: null,
        selectedName: ""
    },
    {
        type: "price",
        name: "قیمت",
        value: null,
        selectedName: ""
    }
];
export const genders = [{
    Name: "خانم ها",
    value: "FEMALE"
}, {
    Name: "آقایان",
    value: "MALE"
}];

export const sortPlaceItems = [{
    Id: 0,
    Name: "مرتبط ترین",
    Value: "order",
    Desc: true,
}, {
    Id: 1,
    Name: "جدید ترین",
    Value: "id",
    Desc: true,
}, {
    Id: 2,
    Name: "قدیمی ترین",
    Value: "id",
    Desc: false,
}, {
    Id: 3,
    Name: "آ-ی",
    Value: "name",
    Desc: false,
}, {
    Id: 4,
    Name: "ی-آ",
    Value: "name",
    Desc: true,
}, {
    Id: 5,
    Name: "منطقه (آ-ی)",
    Value: "location",
    Desc: false,
}, {
    Id: 6,
    Name: "منطقه (ی-آ)",
    Value: "location",
    Desc: true,
}]
const _PlacesList = () => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const {sid} = useParams();
    const [places, SetPlaces] = useState(null);
    const [loadedPage, setLoadedPage] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [endOfList, setEndOfList] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    const [value, setValue] = useState("");

    useEffect(() => {
        if(!openSearch)
            setValue(null);
    }, [openSearch]);

    useEffect(() => {
        let debouncer = setTimeout(() => {
            SetPlaces(null);
            getData(0, value);
        }, 1000);
        return () => {
            clearTimeout(debouncer);
        }
    }, [value]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    function getData(page, searchString) {
        if(!searchString)
            searchString = null;
        setIsLoading(true);
        Place_query({
            queryType: "FILTER",
            Status: "Active",
            SearchStr: searchString,
            Sports:sid,
            Option: null,
            paging: {Page: page, Size: 20, Desc: true, OrderBy: "order"}
        }).then(result => {
            setIsLoading(false)
            setLoadedPage(page);
            var content = searchString ? [] : places ? places.content : [];
            content.push(...result.data.Data.content);
            SetPlaces({...result.data.Data, content: content});
            setEndOfList(result.data.Data.last);
            itsStart = false;
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    var itsStart = false;
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 40 < document.documentElement.offsetHeight || isLoading || endOfList || itsStart) {
            return;
        }
        itsStart = true;
        setLoadedPage(loadedPage + 1);

        getData(loadedPage + 1, value);
    };

    return (
        <>{places ? (<>
            <Grid container sx={{px: 1, pt: 3}} columns={60}>
                <Grid sx={{px: 1}} size={{xs: 49, md: 54, lg: 56, xl: 57}}>
                    <Card elevation={0} sx={{width: "100%", borderRadius: 6, p: 2, backgroundImage: 'url("/assets/images/mapp.jpg")'}}
                          onClick={(e) => navigate("/placesMap")}>
                        <img height={25} width={25} src={"/logo192.png"} />
                        <Link sx={{textDecoration: "none", color: "#222222"}} color={"primary"} href={"/placesMap"}>
                            {" مشاهده مراکز روی نقشه"}
                        </Link>
                    </Card>
                </Grid>
                <Grid sx={{px: 1}} size={{xs:11, md:6, lg:4, xl:3}} textAlign={"center"}>
                    <Card elevation={0} sx={{width: "100%", borderRadius: 6, p: 2, bgcolor: "#dfdfdf"}}
                          onClick={(e) => setOpenSearch(!openSearch)}>
                        <img src={"/assets/images/search.svg"} />
                    </Card>
                </Grid>
            </Grid>
            <Container maxWidth>
                <Collapse in={openSearch} timeout={"auto"} unmountOnExit>
                    <TextField
                        id="outlined-adornment-password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        label={"جستجو (نام مرکز)"}
                    />
                </Collapse>
            </Container>

            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.content && places.content.map(item => (
                    <Grid item component={"a"} key={"5i" + item.Id} sx={{textDecoration: "none"}}
                          lg={3} size={{md: 4, sm: 6, xs: 12}}>
                        <__placeListItem  item={item}/>
                    </Grid>
                    )
                )}
                {isLoading && <div>
                    <CircularProgress/>
                </div>}
            </Grid>
        </>) : (<Grid
                container
                sx={{width: "100%", height: "80vh"}}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress/>
            </Grid>
        )}</>
    );
};

export default _PlacesList;
