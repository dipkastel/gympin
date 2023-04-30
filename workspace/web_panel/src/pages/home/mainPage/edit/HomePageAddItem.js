import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import Select from "react-select";
import {Button} from "@mui/material";
import ImagePicker from "../../media/Pickers/ImagePicker";
import {homepage_add, homepage_getAllDestinations, homepage_getAllTypes} from "../../../../network/api/homepage.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const HomePageAddItem = ({elements,selectedParent,type,setType,destinations}) => {
    const error = useContext(ErrorContext);
    const [formVisibleElements, setFormVisibleElements] = useState({Title: false, Description: false})
    const [openModalSelectImage, setOpenModalSelectImage] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [destination, setDestination] = useState(null)
    const [formData, setFormData] = useState("")
    const [image, setImage] = useState(null)


    function addItem(e) {
        e.preventDefault()
        var maxPriority = selectedParent.Items ? Math.max(...selectedParent.Items.map(o => o.Priority)) : -1;
        var data = {
            Type: type.value,
            Title: title,
            Description: description,
            Destination: (destination) ? destinations.find(d=>d.Id==destination.value) : null,
            Data: formData,
            ImageId: image?image.Id:null,
            parent: selectedParent,
            Priority: (maxPriority + 1)
        }
        data.parent.Items = null;
        homepage_add(data).then(result => {
            error.showError({message: "عملیات موفق",});
            setType(null)
            onTypeChange(null)
            // setRenderId(Math.random())
        }).catch(e => {
            console.log(e);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function onTypeChange(value) {
        setType(value)
        setDescription("")
        setDestination(null)
        setFormData("")
        setTitle("")
        setImage(null)
        var items = {};
        value&&elements.find(e => e.Type === value.value).Elements.forEach(item => {
            items = {...items, [item]: true}
        })
        setFormVisibleElements(items);

    }

    function ImageSelect(image) {
        setImage(image)
    }

    return (
        <>
            <Modal aria-labelledby="parent-modal-editor"
                   aria-describedby="parent-description-editor" show={type !== null} onHide={() => setType(null)}>
                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => addItem(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"افزودن المنت به " + selectedParent.Title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formType">
                            <Form.Label>نوع آیتم مورد نظر را انتخاب کنید</Form.Label>
                            <Select
                                className={"dropdown"}
                                inputId="select-type"
                                options={elements&&elements.map(item => {
                                    return {label: item.Name, value: item.Type}
                                })}
                                onChange={(e) => onTypeChange({label: e.value, value: e.value})}
                                defaultValue={type}
                            />

                            <Form.Text className="text-muted">
                                {(type && elements && elements.find(e => e.Type === type.value)) && elements.find(e => e.Type === type.value).Description}
                            </Form.Text>
                        </Form.Group>

                        {formVisibleElements["Title"] && <Form.Group>
                            <Form.Label>عنوان</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </Form.Group>}
                        {formVisibleElements["Multimedia"] && (
                            (image) ? (<>
                                <img className={"home-add-form-image"} src={image.Url}/>
                            </>) : (<>
                                <Form.Group>
                                    <Form.Label>تصویر</Form.Label>
                                    <Button
                                        fullWidth
                                        variant={"outlined"}
                                        onClick={() => setOpenModalSelectImage(true)}
                                    >انتخاب تصویر</Button>
                                </Form.Group>
                            </>)
                        )
                        }
                        {formVisibleElements["Description"] && <Form.Group>
                            <Form.Label>توضیح :</Form.Label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </Form.Group>}
                        {formVisibleElements["Destination"] && <Form.Group controlId="formAddSport">
                            <Form.Label>مقصد را انتخاب کنید</Form.Label>
                            <Select
                                className={"dropdown"}
                                inputId="select-Destination"
                                options={destinations.map(item => {
                                    return {label: item.Name, value: item.Id}
                                })}
                                onChange={(e) => setDestination({label: e.label, value: e.value})}
                                value={destination}
                            />
                        </Form.Group>}
                        {destination && <Form.Group>
                            <Form.Label>مقادیر به مقصد</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData}
                                onChange={(e) => {
                                    setFormData(e.target.value)
                                }}
                            />
                        </Form.Group>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className={"button_edit"}
                            onClick={() => setType(null)}
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
                </Form>
            </Modal>

            {openModalSelectImage&&<ImagePicker setClose={()=>setOpenModalSelectImage(false)} onSelect={ImageSelect} options={{rowCount: 4,isSingle:true}} />}
        </>
    );
};

export default HomePageAddItem;
