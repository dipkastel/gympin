import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardHeader} from "@mui/material";
import Select from "react-select";
import _OptionItem from "./_OptionItem";
import {Form, Modal} from "react-bootstrap";
import {placeOption_getAll} from "../../network/api/placeOptions.api";
import {optionOfPlace_add, optionOfPlace_getByPlaceId} from "../../network/api/optionOfPlace.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const Option = () => {
    const error = useContext(ErrorContext);

    const place = useSelector(({place}) => place.place)

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [options, SetOptions] = useState([])
    const [placeOptions, SetPlaceOption] = useState([])

    useEffect(() => {
        placeOption_getAll().then(result => {
            SetOptions(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);
    useEffect(() => {
        getPlaceOptions()
    }, []);
    function getPlaceOptions(){
        optionOfPlace_getByPlaceId({id: place.Id}).then(result => {
            SetPlaceOption(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function addPlaceOption(e) {
        e.preventDefault()
        optionOfPlace_add({
            Place: {
                Id: place.Id
            },
            PlaceOption: {
                Id: e.target.formOption.value
            }
        }).then(result=>{
            setOpenModalAdd(false)
            getPlaceOptions()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementOptions))
        return (<></>);

    function ModalAddOption() {
        return (
            <div>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form onSubmit={(e) => addPlaceOption(e)}>

                        <Modal.Header>
                            <Modal.Title>{"افزودن امکانات"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Select
                                fullWidth

                                className={"top-100"}
                                name="formOption"
                                options={options.map(data =>
                                    ({label: data.Name, value: data.Id})
                                )}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت امکانات"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        امکانات</Button>}/>
            </Card>
            {placeOptions && placeOptions.map(item => (
                <div key={item.Id}>
                    <_OptionItem onDelete={()=>getPlaceOptions()} optionOfPlace={item}/>
                </div>
            ))}

            {ModalAddOption()}
        </>

    );
};
export default Option;
