import React, {useCallback, useContext, useEffect, useState} from 'react';
import {media_addImage} from "../../../../network/api/media.api";
import {Form, Modal} from "react-bootstrap";
import {Button, Fab} from "@mui/material";
import {useDropzone} from "react-dropzone";
import Select from "react-select";
import {multimediacategory_getAll} from "../../../../network/api/mediaCategories.api";
import DeleteIcon from "@mui/icons-material/Delete";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const AddImageModal = ({setOpenAddImage, done: uploadComplete}) => {
    const error = useContext(ErrorContext);
    const [addItem, setAddItem] = useState({});
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setAddItem({});
        multimediacategory_getAll().then(data => {
            setCategories(data.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);


    function addOption(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("MediaType", "IMAGE");
        if (addItem.file&&addItem.file.length > 0)
            formData.append("File", addItem.file[0]);
        else{
            error.showError({message: "فایل انتخاب نشده",});
            return
        }
        if(addItem.category){
            formData.append("CategoryId", addItem.category);
        }else{
            error.showError({message: "دسته بندی نا مشخص",});
            return
        }
        if(addItem.title){
            formData.append("Title", addItem.title);
        }else{
            error.showError({message: "نام تصویر نا مشخص",});
            return
        }
        formData.append("Description", addItem.description);
        media_addImage(formData)
            .then(data => {
                error.showError({message: "عملیات موفق",});
                if (data.status === 200)
                    uploadComplete(data);
            }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    function MyDropzone() {
        const onDrop = useCallback(acceptedFiles => {
            if (acceptedFiles.length > 0)
                setAddItem({...addItem, file: acceptedFiles});
        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({
            accept: {
                'image/jpeg': [],
                'image/png': []
            },
            onDrop
        })
        return (
            <div {...getRootProps()}>
                <input accept="image/png, image/gif, image/jpeg"  {...getInputProps()} />
                {
                    isDragActive ?
                        <p className={"drag-div"}>Drop</p> : (
                            <div className={"drag-div"}>
                                <p>Drag and drop some image here</p>
                                <p>...or...</p>
                                <p><Button variant={"contained"} color={"primary"}>select image</Button></p>
                            </div>
                        )
                }
            </div>
        )
    }

    return (
        <>
            <Modal
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description" show={true} onHide={() => setOpenAddImage(false)}>


                <Modal.Header closeButton>
                    <Modal.Title>{"افزودن تصویر "}</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form.Group>
                        <Form.Label>دسته بندی</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="react-select-single"
                            name="formState"
                            options={categories.map(data => {
                                return {label: data.Name, value: data.Id}
                            })}
                            onChange={e => setAddItem({...addItem, category: e.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="نام تصویر"
                            value={addItem.title}
                            onChange={e => setAddItem({...addItem, title: e.target.value})}
                        />
                    </Form.Group>
                    {addItem.file ? (<>
                        <div className={"image-div"}>

                            <Fab size={"small"} className={"delete-image-Upload"}
                                 onClick={() => setAddItem({...addItem, file: null})}>
                                <DeleteIcon fontSize={"large"} color={"error"}/>
                            </Fab>
                            <img className={"upload-img"} src={URL.createObjectURL(addItem.file[0])}/>
                        </div>
                    </>) : <MyDropzone/>}
                    <Form.Group className={"mt-5"}>
                            <textarea
                                className="form-control"
                                id="exampleTextarea"
                                rows="3"
                                placeholder="توضیح تصویر"
                                value={addItem.description}
                                onChange={e => setAddItem({...addItem, description: e.target.value})}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={"button_edit"}
                        onClick={() => setOpenAddImage(false)}
                    >
                        خیر
                    </Button>
                    <Button
                        className={"button_danger"}
                        type={"submit"}
                        onClick={(e) => addOption(e)}
                    >
                        اضافه
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


};

export default AddImageModal;
