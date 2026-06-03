import React, {useContext, useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {placeAbout_add, placeAbout_getByPlace, placeAbout_update} from "../../../../../network/api/placeAbout.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";


const CateringAbout = ({catering}) => {
    const error = useContext(ErrorContext);
    const [itemToEdit, setItemToEdit] = useState(null)
    const [itemExist, setItemExist] = useState(null)
    useEffect(() => {
        getAboutsOfCatering();
    }, []);


    function getAboutsOfCatering() {
        placeAbout_getByPlace({Id: catering.Id}).then(data => {
            setItemToEdit(data.data.Data[0]);
            setItemExist(data.data.Data[0])
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }



    function add(e) {
        e.preventDefault()

        placeAbout_add(itemToEdit)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getAboutsOfCatering();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function UpdateAbout(e) {
        e.preventDefault()
        placeAbout_update(itemToEdit)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getAboutsOfCatering()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setFormValues(lable, Value) {
        setItemToEdit({...itemToEdit,Place:{Id:catering.Id},Acceptable:true,Active:true, [lable]: Value})
    }


    return (
        <>
            <Portlet>
                <PortletHeader title="معرفی مجموعه"/>

                <PortletBody>
                    <Form.Group>
                        <Form.Label>نام</Form.Label>
                        <Form.Control
                            name="Name"
                            type="text"
                            placeholder="نام"
                            value={itemToEdit?.Name}
                            onChange={(e) => setFormValues("Name", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label>متن</Form.Label>
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            name={"Description"}
                            rows="3"
                            value={itemToEdit?.Description}
                            onChange={(e) => setFormValues("Description", e.target.value)}
                        />
                    </Form.Group>
                    {!itemExist && <Button
                        className={"button_danger"}
                        variant={"contained"}
                        onClick={e => add(e)}
                    >
                        افزودن
                    </Button>}
                    {itemExist && <Button
                        className={"button_danger"}
                        variant={"contained"}
                        onClick={e => UpdateAbout(e)}
                    >
                        ویرایش
                    </Button>}

                </PortletBody>
            </Portlet>
        </>
    );
};

export default CateringAbout;
