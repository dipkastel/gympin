import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as HomeChild from "../../../../../network/api/homeChild.api";
import {widgetList} from "../widgetList";
import {widgetDestination} from "../widgetDestination";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const ModalAddChild = ({openModalAdd, SetOpenModalAdd, SetDataChanges}) => {
    const error = useContext(ErrorContext);
    return (
        <Formik
            initialValues={{
                Title: "",
                Type: "",
                Data: "",
                Description: "",
                Destination: "",
                ImageUrl: "",
                Priority: 10,
            }}
            onSubmit={(values, {setStatus, setSubmitting}) => {
                HomeChild._add(values).then(data => {
                    error.showError({message: "عملیات موفق",});
                    SetDataChanges(data.data);
                    SetOpenModalAdd(false)
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });

            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <Modal
                    show={openModalAdd}
                    onHide={() => SetOpenModalAdd(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            افزودن آیتم به لیست
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <div>
                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    label="تیتر"
                                    margin="normal"
                                    name={"Title"}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    label="دیتا"
                                    margin="normal"
                                    name={"Data"}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    label="توضیح"
                                    margin="normal"
                                    name={"Description"}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    type="text"
                                    label="آدرس تصویر"
                                    margin="normal"
                                    name={"ImageUrl"}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl sx={{my:1}} fullWidth>
                                <InputLabel id="demo-simple-select-label">نوع</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name={"Type"}
                                    label="Type"
                                    onChange={handleChange}
                                >
                                    {widgetList.map((widget, number) => (
                                        <MenuItem key={number} value={widget}>{widget}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{my:1}} fullWidth>
                                <InputLabel id="demo-simple-select-label">هدف کلیک</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name={"Destination"}
                                    label="Destination"
                                    onChange={handleChange}
                                >
                                    {widgetDestination.map((widget, number) => (
                                        <MenuItem key={number} value={widget}>{widget}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSubmit}>افزودن</Button>
                        <Button variant="info" onClick={() => SetOpenModalAdd(false)}>انصراف</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Formik>
    );
};

export default ModalAddChild;

