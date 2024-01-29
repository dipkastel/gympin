import React, {useContext, useEffect, useState} from 'react';
import {genders} from "../places/_PlacesList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {sports_query} from "../../network/api/sport.api";
import {User_couchQuery, User_query} from "../../network/api/user.api";
import {CircularProgress, Grid} from "@mui/material";
import __coachListItem from "./__coachListItem";

export const defaultCoachesFilters = [
    {
        type: "Sports",
        name: "ورزش",
        value: null,
        selectedName: ""
    }
];

export const sortCoachItems = [{
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
}]
const _CoachesList = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);

    const [loadedPage, setLoadedPage] = useState(-1);
    const [sports, SetSports] = useState([])
    const [sortBy, SetSortBy] = useState(sortCoachItems[0])
    const [isLoading, setIsLoading] = useState(false);
    const [coaches, SetCoaches] = useState(null);
    const [filters, SetFilters] = useState([...defaultCoachesFilters,{
            type: "gender",
            name: "جنسیت",
            value: currentUser?currentUser?.Gender:null,
            selectedName: currentUser?genders.find(i=>i.value===currentUser?.Gender)?.Name:null
        }]
    )

    // useEffect(() => {
    //     sports_query({
    //         queryType: "FILTER",
    //         HasPlace:0,
    //         paging:{Page:0,Size:50}
    //     }).then(result => {
    //         SetSports(result.data.Data.content)
    //     }).catch(e => {
    //         try {
    //             error.showError({message: e.response.data.Message});
    //         } catch (f) {
    //             error.showError({message: "خطا نا مشخص",});
    //         }
    //     });
    // }, []);

    useEffect(() => {
        getData(0);
    }, [filters,sortBy]);

    useEffect(() => {
        console.log("coaches",coaches)
    }, [coaches]);

    function getData(page){
        setIsLoading(true);
        User_query({
            queryType: "FILTER",
            Role:"COACH",
            paging: {Page: page, Size: 120,Desc:sortBy.Desc,OrderBy:sortBy.Value}
        }).then(result => {
            console.log(result.data.Data);
            setIsLoading(false)
            setLoadedPage(page);
            var content = coaches?coaches.content:[];
            content.push(...result.data.Data.content);
            SetCoaches({...result.data.Data,content:content});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>{coaches?(<>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {coaches.content&&coaches.content.map(item => (
                        <__coachListItem key={"cochis-"+item.Id} item={item} />
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

export default _CoachesList;
