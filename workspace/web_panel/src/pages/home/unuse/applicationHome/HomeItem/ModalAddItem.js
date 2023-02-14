import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as HomeItems from "../../../../../network/api/homeItem.api";
import {widgetList} from "../widgetList";

const ModalAddItem = ({openModalAdd, SetOpenModalAdd, SetDataChanges}) => {
    return (
        <Formik
            initialValues={{
                Name: "",
                Type: "",
                Priority: 10,
            }}
            onSubmit={(values, {setStatus, setSubmitting}) => {
                HomeItems._add(values).then(data => {
                    SetDataChanges(data.data);
                    SetOpenModalAdd(false)
                }).catch(ex => {
                    console.log(ex);
                })

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
                                    label="نام آیتم"
                                    margin="normal"
                                    name={"Name"}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
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

export default ModalAddItem;

