import React, {useEffect, useState} from 'react';
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
    Select, Slider, SliderMarkLabel, SliderValueLabel, Typography
} from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {getAllSports} from "../../network/api/sport.api";
import {getAllByCity} from "../../network/api/region.api";
import GetStringPrice from "../../helper/utils";

const _Filter = () => {
    const [sortBy, SetSortBy] = useState(0)
    const minPrice = 10000;
    const maxPrice = 2000000;
    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = React.useState([minPrice, maxPrice])
    const [sports, SetSports] = useState([])
    const genders = [{
        Name:"آقایان",
        Id:1
    },{
        Name:"خانم ها",
        Id:2
    }]
    const sortItems = [{
        Name:"جدید ترین",
        Id:1
    },{
        Name:"بیشترین امتیاز",
        Id:2
    },{
        Name:"نزدیک ترین",
        Id:3
    }]
    const [region, SetRegions] = useState([])
    const [filters, SetFilters] = useState([
        {
            type: "sport",
            name: "ورزش",
            value: 0,
            selectedName: ""
        },
        {
            type: "location",
            name: "منطقه",
            value: 0,
            selectedName: ""
        },
        {
            type: "price",
            name: "قیمت",
            value: 0,
            selectedName: ""
        },
        {
            type: "gender",
            name: "جنسیت",
            value: 0,
            selectedName: ""
        }
    ])
    useEffect(() => {
        getAllSports().then(result => {
            SetSports(result.data.Data)
            console.log("sports", result.data.Data)
        }).catch(e => console.log(e))
        getAllByCity(1).then(result => {
            SetRegions(result.data.Data)
            console.log("states", result)
        }).catch(e => console.log(e))
    }, []);


    function handleChange(evt, allItems) {
        if (evt.target.value === 0) {
            removeFilter(evt.target.name)
            return
        }
        const item = filters.find(o => o.type === evt.target.name);
        item.value = evt.target.value
        item.selectedName = allItems.find(p => p.Id === evt.target.value).Name
        SetFilters([...filters]);
    }

    const handleChangeSlider = (event, newValue) => {
        setValue(newValue);

        if (newValue[0] === minPrice&&newValue[1]===maxPrice) {
            removeFilter("price")
            return
        }
        const item = filters.find(o => o.type === "price");
        item.value = newValue
        item.selectedName = GetStringPrice(newValue[0])+ " تا "+GetStringPrice(newValue[1]) +" تومان"
        SetFilters([...filters]);
    };

    function getLable(value) {
        return `${value}°C`;
    }

    function removeFilter(type) {
        const item = filters.find(o => o.type === type);
        item.value = 0;
        item.selectedName = "";
        SetFilters([...filters]);
    }

    return (
        <>
            <Grid container direction={"row"} justifyContent={"start"}>
                <IconButton onClick={() => setOpenModal(!openModal)} sx={{color: "#000000"}} aria-label=""
                            name="filter">
                    <FilterAltOutlinedIcon/>
                </IconButton>
                {filters.filter(item => item.value !== 0).map(item => (
                        <Chip key={item.type} label={item.selectedName} variant="outlined"
                              onDelete={() => removeFilter(item.type)}/>
                    )
                )}
            </Grid>

            <Grid container direction={"row"} justifyContent={"start"}>
                {(sortBy!==0)&&
                "چیدمان به ترتیب : "+sortItems.find(p=>p.Id===sortBy).Name
                }
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
                        <InputLabel id="sort-select-label">ترتیب چیدمان</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            id="sort-select"
                            name={"sort"}
                            value={sortBy}
                            label="ترتیب چیدمان"
                            onChange={(e) => SetSortBy(e.target.value)}
                        >
                            <MenuItem value={0}>انتخاب نشده</MenuItem>
                            {sortItems.map(item => (
                                <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={"mt-3"}
                        fullWidth>
                        <InputLabel id="sport-select-label">ورزش</InputLabel>
                        <Select
                            labelId="sport-select-label"
                            id="sport-select"
                            name={"sport"}
                            value={filters.find(o => o.type === "sport").value}
                            label="ورزش"
                            onChange={(e) => handleChange(e, sports)}
                        >
                            <MenuItem value={0}>انتخاب نشده</MenuItem>
                            {sports.map(item => (
                                <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
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
                            <MenuItem value={0}>انتخاب نشده</MenuItem>
                            {region.map(item => (
                                <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
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
                            value={filters.find(o => o.type === "gender").value}
                            label="جنسیت"
                            onChange={(e) => handleChange(e, genders)}
                        >
                            <MenuItem value={0}>انتخاب نشده</MenuItem>
                            {genders.map(item => (
                                <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={"mt-3"}
                        fullWidth>

                        <Box sx={{ width: "90%" }}>
                            <Typography id="input-slider" gutterBottom>
                                { "قیمت از "
                                    +GetStringPrice(value[0])+
                                " تا "
                                +GetStringPrice(value[1])}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={value}
                                 onChange={handleChangeSlider}
                                valueLabelDisplay="auto"
                                min={minPrice}
                                max={maxPrice}
                                step={10000}
                                getAriaValueText={getLable}
                            />
                        </Box>

                    </FormControl>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default _Filter;
