import React, {useContext, useEffect, useState} from 'react';
import {Card, Grid, IconButton, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {place_getAll, Place_query} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Filter, Filter3, FilterAltRounded} from "@mui/icons-material";
import {compareObjs} from "../../helper/utils";
import _Filter, {defaultFilters} from "./_Filter";
import {useSelector} from "react-redux";


const _PlacesList = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [places, SetPlaces] = useState([])
    const [filters, SetFilters] = useState([...defaultFilters,{
        type: "gender",
        name: "جنسیت",
        value: currentUser?currentUser.Gender:null,
        selectedName: ""
    }])
    const [sortBy, SetSortBy] = useState("Id")
    const [openModalFilter, setOpenModalFilter] = useState(false)
    useEffect(() => {
        console.log(filters.find(f=>f.type==="gender")?filters.find(f=>f.type==="gender").value:null)
        Place_query({
            queryType: "FILTER",
            Status:"Active",
            Sports:filters.find(f=>f.type==="Sports").value,
            LocationId:filters.find(f=>f.type==="location").value,
            Gender:filters.find(f=>f.type==="gender")?filters.find(f=>f.type==="gender").value:null,
            Option:null,
            paging: {Page: page, Size: rowsPerPage,Desc:false,OrderBy:sortBy}
        }).then(result => {
            SetPlaces(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [filters,sortBy]);

    return (
        <>
            <_Filter setBaseFilters={(e)=>SetFilters(e)} setBaseSortBy={(e)=>SetSortBy(e)} />
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.content&&places.content.map(item => (
                        <Grid key={item.Id} item component={"a"} href={"/place/" + item.Id} sx={{textDecoration: "none"}}
                              lg={3} md={4} sm={6} xs={6}>
                            <Card elevation={3} sx={{margin: 0.5, padding: 0.5}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item md={6} sm={6} xs={12} sx={{padding: 0.5}}>
                                        <Image src={item.Multimedias[0] ? (item.Multimedias[0].Url+"&width=200") : "https://api.gympin.ir/resource/image?Id=11"} width={"100%"}
                                               rounded={3}/>
                                    </Grid>
                                    <Grid item sx={{padding: 0,minHeight:"88px"}} md={6} sm={6} xs={12}>
                                        <Typography variant={"h5"}>
                                            {item.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {item.Location&&item.Location.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {item.Sports&&item.Sports.map((sport, number) => (
                                                sport.Name + ((number !== (item.Sports.length - 1)) ? ",\t" : "")
                                            ))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
};

export default _PlacesList;
