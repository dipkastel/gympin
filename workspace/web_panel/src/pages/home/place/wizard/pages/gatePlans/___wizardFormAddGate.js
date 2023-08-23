import React, {useContext} from 'react';
import {gates_add} from "../../../../../../network/api/gates.api";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";

const ___wizardFormAddGate = ({getTimingByPlace,setOpenCollapsableAddGate}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    function addGate(e) {
        e.preventDefault()
        gates_add({Place: {Id: placeId}, Name: e.target.Name.value})
            .then(data => {
                getTimingByPlace();
                setOpenCollapsableAddGate(false);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (

        <form onSubmit={(e) => addGate(e)}>
            <Form.Group>
                <Form.Control
                    name="Name"
                    type="text"
                    placeholder="نام درگاه"
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

export default ___wizardFormAddGate;
