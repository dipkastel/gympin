import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import {Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import 'leaflet/dist/leaflet.css';
import AddMedia from "./AddMedia";
import AllImages from "./AllImages";


class MediaManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagesToUpload: [],
            addMode: false,
            selectedCatToDelete:[]
        };
    }

    render() {
        return (
            <>
                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        مدیریت رسانه ها
                    </p>
                    <p>
                        <a className="btn btn-primary" href="/media-category">مدیریت دسته بندی</a>
                    </p>
                </Notice>

                {this.state.addMode &&
                <AddMedia/>
                }
                <AllImages addMode={(e) => this.toggleAddMode(e)}/>
            </>
        )
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
    }

    openModalDelete = (e, data) => {
        this.setState(() => ({
            selectedCatToDelete: data
        }));
    };
    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedCatToDelete: null
        }));
    };
    renderModalDelete = (classes, UserToDelete) => {
        console.log(this.state.selectedAccess)
        return (<>
                <Modal show={UserToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {UserToDelete && UserToDelete.username}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteUser(e, UserToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

export default MediaManagement;
