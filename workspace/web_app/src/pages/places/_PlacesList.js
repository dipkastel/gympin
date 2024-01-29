import React, {useContext, useEffect, useState} from 'react';
import {
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {Place_query} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import __placeListItem from "./__placeListItem";
import {sports_query} from "../../network/api/sport.api";
import {Location_query} from "../../network/api/location.api";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";


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
},{
    Name: "آقایان",
    value: "MALE"
}];

export const sortPlaceItems = [{
    Id:0,
    Name: "جدید ترین",
    Value: "id",
    Desc:true,
},{
    Id:1,
    Name: "قدیمی ترین",
    Value: "id",
    Desc:false,
}, {
    Id:2,
    Name: "آ-ی",
    Value: "name",
    Desc:false,
}, {
    Id:3,
    Name: "ی-آ",
    Value: "name",
    Desc:true,
}, {
    Id:4,
    Name: "منطقه (آ-ی)",
    Value: "location",
    Desc:false,
}, {
    Id:5,
    Name: "منطقه (ی-آ)",
    Value: "location",
    Desc:true,
}]
const _PlacesList = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);

    const [places, SetPlaces] = useState(null);

    const [loadedPage, setLoadedPage] = useState(-1);


    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, SetSortBy] = useState(sortPlaceItems[0])
    const [openModal, setOpenModal] = useState(false)
    const [sports, SetSports] = useState([])
    const [region, SetRegions] = useState([])
    const [filters, SetFilters] = useState([...defaultPlaceFilters,{
            type: "gender",
            name: "جنسیت",
            value: currentUser?currentUser?.Gender:null,
            selectedName: currentUser?genders.find(i=>i.value===currentUser?.Gender)?.Name:null
        }]
    )

    useEffect(() => {
        sports_query({
            queryType: "FILTER",
            HasPlace:0,
            paging:{Page:0,Size:50}
        }).then(result => {
            SetSports(result.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        Location_query({
            queryType: "FILTER",
            ParentId:3,
            HasPlace:0,
            paging:{Page:0,Size:50}
        }).then(result => {
            SetRegions(result.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    useEffect(() => {
        getData(0);
    }, [filters,sortBy]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    function getData(page){
        setIsLoading(true);
        Place_query({
            queryType: "FILTER",
            Status:"Active",
            Sports:filters.find(f=>f.type==="Sports").value,
            LocationId:filters.find(f=>f.type==="location").value,
            Gender:filters.find(f=>f.type==="gender")?filters.find(f=>f.type==="gender").value:null,
            Option:null,
            paging: {Page: page, Size: 3,Desc:sortBy.Desc,OrderBy:sortBy.Value}
        }).then(result => {
            setIsLoading(false)
            setLoadedPage(page);
            var content = places?places.content:[];
            content.push(...result.data.Data.content);
            SetPlaces({...result.data.Data,content:content});
            // SetPlaces(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function handleChange(evt, allItems) {
        SetPlaces(null);
        if (evt.target.value === null) {
            removeFilter(evt.target.name)
            return
        }

        const item = filters.find(o => o.type === evt.target.name);
        item.value = evt.target.value
        item.selectedName = allItems.find(p => p.Id === evt.target.value).Name
        SetFilters([...filters]);
        setOpenModal(false);
    }

    function handleChangeGender(evt, allItems) {
        SetPlaces(null);
        if (evt.value === null) {
            removeFilter(evt.name)
            return
        }
        const item = filters.find(o => o.type === evt.name);
        item.value = evt.value
        item.selectedName = allItems.find(p => p.value === evt.value).Name
        SetFilters([...filters]);
        setOpenModal(false);
    }

    function removeFilter(type) {
        SetPlaces(null);
        const item = filters.find(o => o.type === type);
        item.value = null;
        item.selectedName = "";
        SetFilters([...filters]);
    }

    function changeSort(e) {
        SetPlaces(null);
        SetSortBy(sortPlaceItems.find(f=>f.Id==e))
    }

    const handleScroll = () => {
       if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
         setLoadedPage(loadedPage+1);
         getData(loadedPage+1);
    };

    return (
        <>{places?(<>
            <Grid className={"mt-3 z1040 position-relative"} container direction={"row"} justifyContent={"space-between"} alignContent={"center"} sx={{paddingX:2}}>
                <Grid>
                    <IconButton  onClick={() => setOpenModal(!openModal)} sx={{color: "#000000"}} aria-label=""
                                 name="filter">
                        <FilterAltOutlinedIcon/>
                    </IconButton>
                    {filters.filter(item => item.value !== null).map(item => (
                            <Chip key={item.type} label={item.selectedName} variant="outlined"
                                  onDelete={() => removeFilter(item.type)}/>
                        )
                    )}
                </Grid>

                <Grid >
                    <Select
                        labelId="sort-select-label"
                        id="sort-select"
                        name={"sortby"}
                        size={"small"}
                        value={sortBy.Id}
                        variant={"outlined"}
                        onChange={(e) => changeSort(e.target.value)}
                    >
                        {sortPlaceItems.map(item => (
                            <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <Dialog
                className={"w-100"}
                open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>فیلترها</DialogTitle>
                <DialogContent className={"w-100"}>

                    شما میتوانید با محدود کردن لسیت مراکز به سادگی مرکز مورد نظر خود را بیابید


                    <FormControl
                        className={"mt-3"}
                        fullWidth>
                        <InputLabel id="sport-select-label">ورزش</InputLabel>
                        <Select
                            labelId="sport-select-label"
                            id="sport-select"
                            name={"Sports"}
                            value={filters.find(o => o.type === "Sports")?filters.find(o => o.type === "Sports").value:null}
                            label="ورزش"
                            onChange={(e) => handleChange(e, sports)}
                        >
                            <MenuItem value={null}>انتخاب نشده</MenuItem>
                            {sports.map(item => (
                                <MenuItem key={"S"+item.Id} value={item.Id}>{item.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={"mt-3"}
                        fullWidth>
                        <InputLabel id="location-select-label">منطقه</InputLabel>
                        <Select
                            labelId="location-select-label"
                            id="location-select"
                            name={"location"}
                            value={filters.find(o => o.type === "location").value}
                            label="منطقه"
                            onChange={(e) => handleChange(e, region)}
                        >
                            <MenuItem value={null}>انتخاب نشده</MenuItem>
                            {region.map(item => (
                                <MenuItem key={"L"+item.Id} value={item.Id}>{item.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={"mt-3"}
                        fullWidth>
                        <InputLabel id="gender-select-label">جنسیت</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            name={"gender"}
                            value={filters.find(o => o.type === "gender").value?filters.find(o => o.type === "gender").value:""}
                            label="جنسیت"
                            onChange={(e) => handleChangeGender(e.target, genders)}
                        >
                            {genders.map(item => (
                                <MenuItem key={"G"+item.value} value={item.value}>{item.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
            </Dialog>




            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.content&&places.content.map(item => (
                        <__placeListItem key={"5i"+item.Id} item={item} />
                    )
                )}
                {isLoading&&<div>
                    loading more data ...
                </div>}
            </Grid>
        </>):(<Grid
        container
        sx={{width:"100%",height:"80vh"}}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
    >
        <CircularProgress />
    </Grid>
)}</>
    );
};

export default _PlacesList;
