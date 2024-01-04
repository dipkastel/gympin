import React, {useContext} from 'react';
import {halls_add} from "../../../../../../../network/api/hall.api";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";

const ___wizardFormAddHall = ({getTimesByPlace,setOpenCollapsableAddHall}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    function addHall(e) {
        e.preventDefault()
        halls_add({Place: {Id: placeId}, Name: e.target.Name.value})
            .then(data => {
                getTimesByPlace();
                setOpenCollapsableAddHall(false);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (

        <form onSubmit={(e) => addHall(e)}>
            <Form.Group>
                <Form.Control
                    name="Name"
                    type="text"
                    placeholder="نام سالن"
                />
            </Form.Group>

            <Button
                variant={"contained"}
                color={"success"}
                type={"submit"}
            >
                اضافه
            </Button>
        </form>
    );
};

export default ___wizardFormAddHall;
