import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {homepage_getById, homepage_getHome, homepage_update} from "../../../../network/api/homepage.api";
import {Form, Modal} from "react-bootstrap";
import {Button} from "@mui/material";

const BaseItem = ({itemId}) => {
    const [homeItems,setHomeItems] = useState([])
    useEffect(() => {
        getBaseData();
    }, []);
    function getBaseData(){
        homepage_getById({id:itemId}).then(result=>{
            setHomeItems(result.data.Data)
        }).catch(e=>console.log(e))
    }
    function formSubmit(e){
        e.preventDefault()
        homepage_update(homeItems).then(result=>{
            getBaseData();
        }).catch(e=>console.log(e))
    }
    return (
        <div>
            <Portlet>
                <PortletHeader
                    title="صفحه ها"
                />

                <PortletBody>
                    <form onSubmit={(e) => formSubmit(e)}>
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
                    </form>

                </PortletBody>
            </Portlet>
        </div>
    );
};

export default BaseItem;
