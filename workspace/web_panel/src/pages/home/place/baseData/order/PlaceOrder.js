import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Button, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Place_updateOrder} from "../../../../../network/api/place.api";

const PlaceOrder = ({place,updatePlace}) => {

    const error = useContext(ErrorContext);
    const [inplaceOrder, setInplaceOrder] = useState(place.Order);

    function UpdatePlaceOrder(e) {
        e.preventDefault()
        Place_updateOrder({Id: place.Id, Order: inplaceOrder}).then(result => {
            setInplaceOrder(result.data.Data.Order);
            error.showError({message: "ثبت موفق",});
            updatePlace(place);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <Portlet>
            <PortletHeader
                title={"اولویت " + place.Name}
            />
            <PortletBody>
                <Form.Group>
                    <TextField
                        id="standard-full-width"
                        label="نام مجموعه"
                        style={{margin: 8}}
                        type={"number"}
                        placeholder="5000"
                        value={inplaceOrder}
                        onChange={(e) => setInplaceOrder(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Form.Group>

                <Button variant={"contained"} color={"info"} onClick={(e) => UpdatePlaceOrder(e)}> ثبت </Button>
            </PortletBody>
        </Portlet>
    );
};

export default PlaceOrder;
