import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card, Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Percent} from "@mui/icons-material";
import {TicketFoods_update} from "../../network/api/TicketFoods.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const __EditFoodItem = ({selectedItem,setSelectedItem,updateList}) => {


    const error = useContext(ErrorContext);
    const [itemFood,SetItemFood] = useState(selectedItem);
    const [Loading,SetLoading] = useState(false);
    const [discount, setDiscount] = useState(selectedItem?.ValuePrice>selectedItem?.PlacePrice);

    useEffect(() => {
        SetItemFood(selectedItem);
    }, [selectedItem]);

    function UpdateFoodItem() {
        SetLoading(true);
        TicketFoods_update(itemFood).then((result) => {
            console.log("--------asdasd")
            SetLoading(false);
            updateList();
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

            <Card variant={"outlined"} sx={{p:2,m:1}}>

                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={itemFood?.Name}
                    onChange={(e)=>SetItemFood({...itemFood, Name:e.target.value})}
                    label="نام آیتم"
                    type="text"
                    fullWidth
                    variant={"outlined"}
                />
                <FormControl
                    margin="dense" fullWidth variant="outlined">
                    <InputLabel>قیمت (تومان)</InputLabel>
                    <OutlinedInput
                        type={'text'}
                        name={"PlacePrice"}
                        value={toPriceWithComma(itemFood?.PlacePrice)}
                        onChange={e =>SetItemFood({...itemFood, PlacePrice:toPriceWithoutComma(e.target.value),ValuePrice:toPriceWithoutComma(e.target.value)})}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        'تخفیف'
                                    }
                                    edge="end"
                                    color={discount ? "error" : "inherit"}
                                    onClick={(e) => setDiscount(!discount)}
                                >
                                    {<Percent/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="قیمت (تومان)"
                    />
                </FormControl>
                <Collapse in={discount}>
                    <TextField
                        margin="dense"
                        name="valuePrice"
                        label="ارزش"
                        type="text"
                        value={toPriceWithComma(itemFood?.ValuePrice)}
                        onChange={e =>SetItemFood({...itemFood, ValuePrice:toPriceWithoutComma(e.target.value)})}
                        fullWidth
                        variant={"outlined"}
                    />
                </Collapse>
                <TextField
                    margin="dense"
                    name="minOrderCount"
                    label="حداقل سفارش"
                    value={itemFood?.MinOrderCount}
                    onChange={e =>SetItemFood({...itemFood, MinOrderCount:e.target.value})}
                    type="number"
                    fullWidth
                    variant={"outlined"}
                />
                <TextField
                    margin="dense"
                    name="maxOrderCount"
                    label="حداکثر سفارش"
                    type="number"
                    value={itemFood?.MaxOrderCount}
                    onChange={e =>SetItemFood({...itemFood, MaxOrderCount:e.target.value})}
                    fullWidth
                    variant={"outlined"}
                />
                <FormGroup>
                    <FormControlLabel
                        checked={itemFood?.IsCount}
                        name={"isCount"}
                        onChange={e =>SetItemFood({...itemFood, IsCount:e.target.checked})}
                        control={<Checkbox defaultChecked/>}
                        label="غذای اصلی"/>
                </FormGroup>
                <TextField
                    margin="dense"
                    name="desc"
                    label="توضیحات"
                    value={itemFood?.Description}
                    onChange={e =>SetItemFood({...itemFood, Description:e.target.value})}
                    multiline={true}
                    rows={5}
                    type="text"
                    fullWidth
                    variant={"outlined"}
                />
                <Button
                    fullWidth
                    sx={{p:2,mt:2}}
                    disabled={Loading}
                    onClick={(e)=>UpdateFoodItem()}
                    variant={"contained"}>
                    ثبت تعییرات
                </Button>
            </Card>


        </>
    );
};

export default __EditFoodItem;
