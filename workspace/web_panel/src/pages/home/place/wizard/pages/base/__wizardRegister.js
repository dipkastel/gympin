import React, {useContext} from 'react';
import {Portlet, PortletBody} from "../../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {Place_addPlace} from "../../../../../../network/api/place.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const __wizardRegister = ({setPlace}) => {

    const error = useContext(ErrorContext);

    function addPlace(e) {
        e.preventDefault();
        if (!e.target.formName.value){
            error.showError({message:"نام مجموعه الزامی است"});
            return;
        }
        Place_addPlace({Address: "", Name: e.target.formName.value , Region: {Id: 1}})
            .then((data) => {
                error.showError({message: "عملیات موفق",});
                setPlace(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }
    function validate(e){
        return false;
    }
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Form
                        noValidate
                        validated={e=>validate(e)}
                        autoComplete="off"
                        onSubmit={(e) => addPlace(e)}>
                        <Form.Group controlId="formPlaceName">
                            <Form.Control
                                name="formName"
                                type="text"
                                placeholder="نام مکان (مجموعه ورزشی)"
                                required
                            />
                            <Form.Text className="text-muted">
                                از نوشتن هاشیه ها (مجموعه ورزشی ، باشگاه ، استادیوم) خودداری
                                کنید
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant={"contained"}
                            className={"w-100"}

                            type={"submit"}
                        >
                            اضافه
                        </Button>
                    </Form>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default __wizardRegister;
