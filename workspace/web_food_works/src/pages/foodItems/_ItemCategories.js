import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {
    TicketFoods_ClearCategory,
    TicketFoods_GetAllCategoriesByCatering,
    TicketFoods_SetCategory
} from "../../network/api/TicketFoods.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Card, Chip, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {Add, Check, Close} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const _ItemCategories = ({selectedItem, setSelectedItem, updateList}) => {

    const error = useContext(ErrorContext);
    const catering = useSelector(({catering}) => catering.catering);
    const [sudgestList, setSudgestList] = useState(null);
    const [newGroupText, setNewGroupText] = useState("");
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        getSudgests()
    }, []);

    function getSudgests() {
        TicketFoods_GetAllCategoriesByCatering({Id: catering.Id})
            .then(data => {
                setSudgestList(data.data.Data);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function setNewGroup(item) {
        TicketFoods_SetCategory({Id: selectedItem.Id, Category: item})
            .then(data => {
                updateList()
                setAddMode(false);
                // setSelectedItem(null);
                getSudgests();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function removeGroup() {
        TicketFoods_ClearCategory({Id: selectedItem.Id})
            .then(data => {
                updateList()
                setAddMode(false);
                setSelectedItem(null);
                getSudgests();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>

            <Card variant={"outlined"} sx={{p: 2, m: 1}}>
                <Grid container justifyContent={"space-between"}>
                    <Grid>گروه این آیتم</Grid>
                    {!addMode && <Grid onClick={(e) => {
                        setAddMode(true)
                    }}><Add/></Grid>}
                    {addMode && <Grid direction={"row"} container>

                        <FormControl size={"small"} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">گروه جدید</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                value={newGroupText}
                                onChange={e => setNewGroupText(e.target.value)}
                                startAdornment={
                                    <Close sx={{cursor: "pointer"}} onClick={(e) => setAddMode(false)}/>
                                }
                                endAdornment={
                                    <Check color={"success"} sx={{cursor: "pointer"}} onClick={(e) => setNewGroup(newGroupText)}/>
                                }
                                label="گروه جدید"
                            />
                        </FormControl>

                    </Grid>}
                </Grid>
                {sudgestList && sudgestList.map(item => item && (
                    <Chip key={item} sx={{m: 1}} label={item} color={selectedItem?.Category == item ? "success" : ""}
                          onClick={(e) => selectedItem?.Category == item ? removeGroup() : setNewGroup(item)}/>
                ))}
            </Card>


        </>
    );
};

export default _ItemCategories;
