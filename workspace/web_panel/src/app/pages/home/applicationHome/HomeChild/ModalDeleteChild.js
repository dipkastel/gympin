import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalDeleteChild = ({deleteItem,SetDeleteItem})=>{
    return (
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
                    <Button variant="danger" >حذف</Button>
                    <Button variant="info" onClick={()=>SetDeleteItem(null)} >انصراف</Button>
                </Modal.Footer>
            </Modal>
    );
};

export default ModalDeleteChild;

