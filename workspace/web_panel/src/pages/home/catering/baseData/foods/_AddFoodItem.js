import React, {useContext, useEffect, useState} from 'react';
import {PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {TicketFoods_add} from "../../../../../network/api/TicketFoods.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {Modal} from "react-bootstrap";
import {Button, Checkbox, FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";

const _AddFoodItem = ({catering,refreshList}) => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [addHasNext, setAddHasNext] = useState(false);

    useEffect(() => {
        console.log("NODE_ENV:", process.env.NODE_ENV)
    }, []);


    function renderModalAdd() {

        function add(e) {
            e.preventDefault()
            TicketFoods_add({
                Place: {Id: catering.Id},
                Name: e.target.Name.value,
                PlacePrice: toPriceWithoutComma(e.target.PlacePrice.value),
                ValuePrice: addHasNext?toPriceWithoutComma(e.target.PlacePrice.value):toPriceWithoutComma(e.target.ValuePrice.value),
                maxOrderCount:1000,
                minOrderCount:1,
                Enable:true,
                IsCount:true,
                Description:""
            })
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    if(!addHasNext){
                        setOpenModalAdd(false)
                    }else{
                        e.target.Name.value = null;
                        e.target.PlacePrice.value = null;
                        e.target.Name.focus();
                    }
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
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => add(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن غذا "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="نام غذا"
                                placeholder="نام غذا"
                                name={"Name"}
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {!addHasNext&&<TextField
                                id="standard-full-width"
                                label="ارزش به تومان"
                                placeholder="ارزش به تومان"
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
                            />}
                            <TextField
                                id="standard-full-width"
                                label="قیمت به تومان"
                                name={"PlacePrice"}
                                placeholder="قیمت به تومان"
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


                            {!addHasNext&&<TextField
                                margin="dense"
                                name="MinOrderCount"
                                label="حداقل سفارش"
                                type="number"
                                fullWidth
                                margin="normal"
                                defaultValue={1}
                                variant={"outlined"}
                            />}
                            {!addHasNext&&<TextField
                                margin="dense"
                                name="MaxOrderCount"
                                label="حداکثر سفارش"
                                type="number"
                                fullWidth
                                margin="normal"
                                defaultValue={1000}
                                variant={"outlined"}
                            />}
                            {!addHasNext&&<FormGroup>
                                <FormControlLabel
                                    name={"IsCount"}
                                    control={<Checkbox defaultChecked/>}
                                    label="غذای اصلی"/>
                            </FormGroup>}
                            {!addHasNext&&<FormGroup>
                                <FormControlLabel
                                    name={"Enable"}
                                    control={<Checkbox defaultChecked/>}
                                    label="فعال"/>
                            </FormGroup>}
                            {!addHasNext&&<TextField
                                margin="dense"
                                name="Description"
                                label="توضیحات"
                                multiline={true}
                                rows={5}
                                type="text"
                                fullWidth
                                variant={"outlined"}
                            />}
                            <FormControlLabel
                                name={"hasNext"}
                                checked={addHasNext}
                                onChange={e=>setAddHasNext(e.target.checked)}
                                control={<Switch value="gilad"/>}
                                label="ورود سریع"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>

            <PortletHeaderToolbar>
                <button
                    type="button"
                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                    onClick={(e) => setOpenModalAdd(true)}
                >
                    <AddIcon/>
                </button>
            </PortletHeaderToolbar>


            {renderModalAdd()}
        </>
    );
};

export default _AddFoodItem;
