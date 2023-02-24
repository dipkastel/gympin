import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {TextField} from "@mui/material";
import * as collection from "../../../../../network/api/homeCollection.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const ModalAddCollection = ({openModalAdd, SetOpenModalAdd,SetDataChanges}) => {
    const error = useContext(ErrorContext);
    return (
        <Formik
            initialValues={{CollectionName: ""}}
            onSubmit={(values, {setStatus, setSubmitting}) => {
                collection._add(values).then(data=>{
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
                            افزودن صفحه اصلی
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <div className="form-group">
                            <TextField
                                type="CollectionName"
                                label="CollectionName"
                                margin="normal"
                                fullWidth={true}
                                name="CollectionName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.CollectionName}
                                helperText={touched.CollectionName && errors.CollectionName}
                                error={Boolean(touched.CollectionName && errors.CollectionName)}
                            />
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

export default ModalAddCollection;

