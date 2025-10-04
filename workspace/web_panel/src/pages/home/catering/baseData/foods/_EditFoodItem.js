import React, {useContext, useState} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid, IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Switch,
    TextField
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {TicketFoods_update} from "../../../../../network/api/TicketFoods.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import DeleteIcon from "@mui/icons-material/Delete";
import _FoodItemEditImage from "./_FoodItemEditImage";

const _EditFoodItem = ({selectedItem, setSelectedItem, refreshList}) => {

    const error = useContext(ErrorContext);

    function updateFoodItem(e) {
        e.preventDefault();
        TicketFoods_update({
            Id: selectedItem?.Id,
            Place: {Id: selectedItem?.Place?.Id},
            Name: e?.target?.Name?.value,
            PlacePrice: toPriceWithoutComma(e?.target?.PlacePrice?.value),
            ValuePrice: toPriceWithoutComma(e?.target?.ValuePrice?.value),
            MinOrderCount:e?.target?.MinOrderCount?.value,
            MaxOrderCount:e?.target?.MaxOrderCount?.value,
            IsCount: e?.target?.IsCount?.checked,
            Enable: e?.target?.Enable?.checked,
            Description: e?.target?.Description?.value
        })
            .then(data => {
                error.showError({message: "عملیات موفق",});
                setSelectedItem(null);
                refreshList();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    return (
        <div>

            {selectedItem && <Portlet>
                <PortletHeader
                    title={"ویرایش " + selectedItem?.Name}
                />
                <form onSubmit={(e) => updateFoodItem(e)}>
                    <PortletBody>
                        <_FoodItemEditImage selectedFoodItem={selectedItem} />
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    id="standard-full-width"
                                    label="نام غذا"
                                    placeholder="نام غذا"
                                    name={"Name"}
                                    type={"text"}
                                    fullWidth
                                    defaultValue={selectedItem?.Name}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid size={6}>

                                <TextField
                                    id="standard-full-width"
                                    label="ارزش به تومان"
                                    placeholder="ارزش به تومان"
                                    defaultValue={selectedItem?.Price}
                                    name={"ValuePrice"}
                                    onChange={e =>
                                        e.target.value = toPriceWithComma(e.target.value)
                                    }
                                    type={"text"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>
                            <Grid size={6}>

                                <TextField
                                    id="standard-full-width"
                                    label="قیمت به تومان"
                                    name={"PlacePrice"}
                                    placeholder="قیمت به تومان"
                                    defaultValue={selectedItem?.Price}
                                    onChange={e =>
                                        e.target.value = toPriceWithComma(e.target.value)
                                    }
                                    type={"text"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid size={6}>

                                <TextField
                                    name="MinOrderCount"
                                    label="حداقل سفارش"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedItem.MinOrderCount}
                                    variant={"outlined"}
                                />
                            </Grid>
                            <Grid size={6}>

                                <TextField
                                    name="MaxOrderCount"
                                    label="حداکثر سفارش"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedItem.MaxOrderCount}
                                    variant={"outlined"}
                                />
                            </Grid>
                            <Grid size={6}>

                                <FormGroup>
                                    <FormControlLabel
                                        name={"IsCount"}
                                        control={<Checkbox defaultChecked={selectedItem.IsCount}/>}
                                        label="غذای اصلی"/>
                                </FormGroup>
                            </Grid>
                            <Grid size={6}>

                                <FormGroup>
                                    <FormControlLabel
                                        name={"Enable"}
                                        control={<Checkbox defaultChecked={selectedItem.Enable}/>}
                                        label="فعال"/>
                                </FormGroup>
                            </Grid>
                            <Grid size={12}>

                                <TextField
                                    margin="dense"
                                    name="Description"
                                    label="توضیحات"
                                    multiline={true}
                                    rows={5}
                                    type="text"
                                    fullWidth
                                    defaultValue={selectedItem.Description}
                                    variant={"outlined"}
                                />
                            </Grid>
                        </Grid>
                    </PortletBody>
                    <PortletFooter>
                        <div className="text-right">
                            <Button variant={"contained"} color={"primary"} sx={{mx:1}} onClick={(e) => setSelectedItem(null)}> خیر </Button>
                            <Button variant={"contained"} color={"success"} sx={{mx:1}} type={"submit"}> ویرایش </Button>
                        </div>
                    </PortletFooter>
                </form>
            </Portlet>}
        </div>
    );
};

export default _EditFoodItem;
