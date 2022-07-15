import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function ModalDelete(props){
    console.log(props)
    const [modalShow, SetModalShow] = useState(()=>props.deleteItem!=null);
    return (<>
            <Modal
                show={modalShow}
                onHide={()=>SetModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button variant="danger" onClick={props.onDelete()}>delete</Button>*/}
                    </Modal.Footer>
                </Modal.Header>
            </Modal>
        </>
    );
};

export default ModalDelete;

