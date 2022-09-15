import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as collection from "../../../../api/HomeCollection.api";

const ModalDeleteCollection = ({deleteItem,SetDeleteItem,SetDataChanges})=>{
    return (

        <Formik
            initialValues={{Id:deleteItem.Id}}
            onSubmit={(values, {setStatus, setSubmitting}) => {
                collection._delete(values).then(data=>{
                    SetDataChanges(data);
                    SetDeleteItem(null)
                }).catch(ex=>{
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
                show={deleteItem}
                onHide={()=>SetDeleteItem(null)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        حذف صفحه اصلی
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>حذف صفحه اصلی {deleteItem.CollectionName}</h4>
                    <p>
                        این کار بسیار خطرناک است ممکن است اپلیکیشنی که از این صفحه استفاده میکند دیگر اجرا نشود لطفا حتما بررسی های لازم را پیش از حذف انجام دهید
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleSubmit} >حذف</Button>
                    <Button variant="info" onClick={()=>SetDeleteItem(null)} >انصراف</Button>
                </Modal.Footer>
            </Modal>

            )}
        </Formik>
    );
};

export default ModalDeleteCollection;

