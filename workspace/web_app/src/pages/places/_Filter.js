import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Typography
} from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {getAllSports, sports_query} from "../../network/api/sport.api";
import GetStringPrice from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Location_query} from "../../network/api/location.api";
import {useSelector} from "react-redux";

export const defaultFilters = [
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
const _Filter = ({setBaseFilters,BaseFilters, setBaseSortBy}) => {
    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);
    const [sortBy, SetSortBy] = useState("id")
    const minPrice = 10000;
    const maxPrice = 2000000;
    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = React.useState([minPrice, maxPrice])
    const [sports, SetSports] = useState([])
    const genders = [{
        Name: "خانم ها",
        value: "FEMALE"
    },{
        Name: "آقایان",
        value: "MALE"
    }
    // ,{
    //     Name: "پسرها(نوجوان)",
    //     value: "BOYS"
    // },{
    //     Name: "دخترها(نوجوان)",
    //     value: "GIRLS"
    // },{
    //     Name: "بدون تفکیک جنسیت",
    //     value: "NONE"
    // },{
    //     Name: "کودکان",
    //     value: "KIDS"
    // }
    ]
    const sortItems = [{
        Name: "جدید ترین",
        Value: "id"
    }, {
        Name: "الفبا",
        Value: "name"
    }, {
        Name: "منطقه (الفبا)",
        Value: "location"
    }]
    const [region, SetRegions] = useState([])
    const [filters, SetFilters] = useState([...defaultFilters,{
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

    function handleChange(evt, allItems) {
        if (evt.target.value === null) {
            removeFilter(evt.target.name)
            return
        }

        const item = filters.find(o => o.type === evt.target.name);
        item.value = evt.target.value
        item.selectedName = allItems.find(p => p.Id === evt.target.value).Name
        SetFilters([...filters]);
        setOpenModal(false);
        setBaseFilters([...filters])
    }

    function handleChangeGender(evt, allItems) {
        if (evt.value === null) {
            removeFilter(evt.name)
            return
        }
        const item = filters.find(o => o.type === evt.name);
        item.value = evt.value
        item.selectedName = allItems.find(p => p.value === evt.value).Name
        SetFilters([...filters]);
        setOpenModal(false);
        setBaseFilters([...filters])
    }

    const handleChangeSlider = (event, newValue) => {
        setValue(newValue);

        if (newValue[0] === minPrice && newValue[1] === maxPrice) {
            removeFilter("price")
            return
        }
        const item = filters.find(o => o.type === "price");
        item.value = newValue
        item.selectedName = GetStringPrice(newValue[0]) + " تا " + GetStringPrice(newValue[1]) + " تومان"
        SetFilters([...filters]);
        setOpenModal(false);
        setBaseFilters([...filters])
    };

    function getLable(value) {
        return `${value}°C`;
    }

    function removeFilter(type) {
        const item = filters.find(o => o.type === type);
        item.value = null;
        item.selectedName = "";
        SetFilters([...filters]);
        setBaseFilters([...filters])
    }

    function changeSort(e) {
        SetSortBy(e)
        setBaseSortBy(e);
    }

    return (
        <>
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
                        value={sortBy}
                        variant={"outlined"}
                        onChange={(e) => changeSort(e.target.value)}
                    >
                        {sortItems.map(item => (
                            <MenuItem key={item.Value} value={item.Value}>{item.Name}</MenuItem>
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
                    {/*<FormControl*/}
                    {/*    sx={{p: 2}}*/}
                    {/*    className={"mt-3"}*/}
                    {/*    fullWidth>*/}

                    {/*    <Box sx={{width: "100%"}}>*/}
                    {/*        <Typography id="input-slider" gutterBottom>*/}
                    {/*            {"قیمت از "*/}
                    {/*            + GetStringPrice(value[0]) +*/}
                    {/*            " تا "*/}
                    {/*            + GetStringPrice(value[1])}*/}
                    {/*        </Typography>*/}
                    {/*        <Slider*/}
                    {/*            getAriaLabel={() => 'Price range'}*/}
                    {/*            value={value}*/}
                    {/*            onChange={handleChangeSlider}*/}
                    {/*            valueLabelDisplay="auto"*/}
                    {/*            min={minPrice}*/}
                    {/*            max={maxPrice}*/}
                    {/*            step={10000}*/}
                    {/*            getAriaValueText={getLable}*/}
                    {/*        />*/}
                    {/*    </Box>*/}

                    {/*</FormControl>*/}
                </DialogContent>
            </Dialog>

        </>
    );
};

export default _Filter;
