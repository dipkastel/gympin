import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {placeAbout_add, placeAbout_delete, placeAbout_getByPlace} from "../../../../../network/api/placeAbout.api";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, FormControlLabel, FormGroup, IconButton, Switch, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";

const _wizardPlaceAbout = ({allowNext}) => {
    const error = useContext(ErrorContext);
    let {placeId} = useParams();
    const [placeAbouts, SetPlaceAbouts] = useState([])

    useEffect(() => {
        getAboutsOfPlace();
    }, []);

    useEffect(() => {
        allowNext(placeAbouts.length>0)
    }, [placeAbouts]);

    function getAboutsOfPlace() {
        placeAbout_getByPlace({Id: placeId}).then(data => {
            SetPlaceAbouts(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function deleteAbout(e, row) {
        e.preventDefault()

        placeAbout_delete({Id: row.Id})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getAboutsOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addAbout(e) {
        e.preventDefault()

        var newAboutItem={
            Place: {Id: placeId},
            Name: e.target.Name.value,
            Acceptable: e.target.Acceptable.checked,
            Active: e.target.Active.checked,
            Description: e.target.Description.value};
            placeAbout_add(newAboutItem)
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getAboutsOfPlace()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
            e.target.Name.value="";
             e.target.Acceptable.checked=false;
             e.target.Active.checked=false;
             e.target.Description.value="";

    }


    return (
        <>

            <div className={"row"}>

                <div className={"col-md-4"}>
                    <Portlet>
                        <PortletHeader
                            title={"افزودن قوانین"}
                        />
                        <PortletBody>
                            <form onSubmit={(e) => addAbout(e)}>
                                <Form.Group controlId="formPlaceName">
                                    <Form.Control
                                        name="Name"
                                        type="text"
                                        placeholder="نام"
                                    />
                                </Form.Group>
                                <FormGroup>
                                    <FormControlLabel
                                        name={"Active"}
                                        control={<Switch
                                            value="gilad" />}
                                        label="وضعیت"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        name={"Acceptable"}
                                        control={<Switch
                                            value="gilad" />}
                                        label="الزام به تایید قبل از خرید"
                                    />
                                </FormGroup>
                                <Form.Group>

                                    <TextField
                                        label="متن"
                                        className="textField"
                                        name="Description"
                                        multiline
                                        minRows={3}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Form.Group>
                                <Button
                                    variant={"contained"}
                                    fullWidth
                                    type={"submit"}
                                >
                                    اضافه
                                </Button>
                            </form>
                        </PortletBody>
                    </Portlet>
                </div>
            {placeAbouts.map(row => (

                <div className={"col-md-4"}>
                    <Portlet>
                        <PortletHeader
                            title={row.Name}
                            toolbar={<PortletHeaderToolbar>
                                <IconButton aria-label="delete"
                                            color={"error"}
                                            onClick={(e) => deleteAbout(e,row)}>
                                    <DeleteIcon />
                                </IconButton>
                            </PortletHeaderToolbar>}
                        />
                        <PortletBody>
                            <FormGroup>
                                <FormControlLabel
                                    checked={row.Active}
                                    control={<Switch
                                        value="gilad" />}
                                    label="وضعیت"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    checked={row.Acceptable}
                                    control={<Switch
                                        value="gilad" />}
                                    label="الزام به تایید قبل از خرید"
                                />
                            </FormGroup>
                            <Typography variant={"subtitle1"}>{row.Description}</Typography>
                        </PortletBody>
                    </Portlet>
                </div>
            ))}
            </div>
        </>
    );
};

export default _wizardPlaceAbout;
