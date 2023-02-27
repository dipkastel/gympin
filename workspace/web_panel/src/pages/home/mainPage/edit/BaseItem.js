import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {homepage_getById, homepage_update} from "../../../../network/api/homepage.api";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const BaseItem = ({itemId}) => {
    const error = useContext(ErrorContext);
    const [homeItems,setHomeItems] = useState([])
    useEffect(() => {
        getBaseData();
    }, []);
    function getBaseData(){
        homepage_getById({id:itemId}).then(result=>{
            setHomeItems(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function formSubmit(e){
        e.preventDefault()
        homepage_update(homeItems).then(result=>{
            error.showError({message: "عملیات موفق",});
            getBaseData();
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
            <Portlet>
                <PortletHeader
                    title="صفحه ها"
                />

                <PortletBody>
                    <Form onSubmit={(e) => formSubmit(e)}>
                        <Form.Group>
                            <Form.Label>عنوان</Form.Label>
                            <Form.Control
                                name="Title"
                                type="text"
                                value={homeItems.Title||""}
                                onChange={(e)=>{setHomeItems({...homeItems,Title:e.target.value})}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>توضیح :</Form.Label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={homeItems.Description||""}
                                onChange={(e)=>{setHomeItems({...homeItems,Description:e.target.value})}}
                                name="Description"
                            />
                            <Form.Text className="text-muted">
                                یک توضیح کامل برای صفحه ای که می سازید وارد نمایید تا دیگران بعد از گذشت زمان متوجه شوند.
                                <br/>
                                مثلا برای کدام اپلیکیشن و برای چه کمپینی یا مناسبتی این صفحه ساخته شده.
                            </Form.Text>
                        </Form.Group>
                            <Button
                                variant={"contained"}
                                className={"button_danger"}
                                type={"submit"}
                            >
                                ثبت
                            </Button>
                    </Form>

                </PortletBody>
            </Portlet>
        </div>
    );
};

export default BaseItem;
