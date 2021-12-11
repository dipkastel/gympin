import React, {Component} from 'react';
import Notice from "../../../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, ButtonToolbar, Form, Modal, Table} from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import {
    multimediacategory_add, multimediacategory_delete,
    multimediacategory_getAll,
    multimediacategory_update
} from "../../../../api/mediaCategories.api";

class MediaCategoryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            categories: [],
            selectedcatToDelete:null,
            selectedcatToEdit:null
        };
    }

    componentDidMount() {
        this.getAllCategories()
    }


    getAllCategories() {
        multimediacategory_getAll().then(data => {
            this.setState(() => ({
                categories: data.data.Data
            }));

        }).catch(e => {
            console.log(e);
        })
    }


    RenderRaw=(User, index)=>{
        return (
            <tr key={index}>
                <td>{User.Name}</td>
                <td>
                    <div className="raw">
                        <ButtonToolbar>
                            <span className="pr-2">
                                <Button variant="primary" className="pr-4" onClick={(e)=>this.prepareEditUser(e,User)}>ویرایش</Button>
                            </span>
                            <span className="pr-2">
                                <Button variant="danger" className="pr-4" onClick={(e)=>this.openModalDelete(e,User)}>حذف</Button>
                            </span>
                        </ButtonToolbar>
                    </div>
                </td>
            </tr>
        )
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedcatToEdit:null
        }))
    }

    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }
    closeAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: false
        }));
    }
    addMediaCat(e){
        e.preventDefault()
        var that = this;
        if(this.state.selectedcatToEdit){
            multimediacategory_update({"Id":this.state.selectedcatToEdit.Id,"Name":e.target.category_name.value}).then(function (data){
                that.getAllCategories()
                that.toggleAddMode(e)
            }).catch(function (err){
                console.log(err)
            })
        }else{
            multimediacategory_add({"Name":e.target.category_name.value}).then(function (data){
                that.getAllCategories()
                that.toggleAddMode(e)
            }).catch(function (err){
                console.log(err)
            })
        }
    }


    prepareEditUser=(e,data)=>{
        this.openAddMode(e)
        e.preventDefault()
        this.setState(() => ({
            selectedcatToEdit: data
        }),()=>{
            document.querySelector('#form_catName').value = data.Name
        });
    }


    openModalDelete=(e,data)=>{
        e.preventDefault()
        this.setState(() => ({
            selectedcatToDelete: data
        }));
    }

    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedcatToDelete: null
        }));
    };
    renderModalDelete = (catToDelete)=>{
        return(<>
                <Modal show={catToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {catToDelete&&catToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                                <Button variant="primary" className="pr-4" onClick={this.closeModalDelete}>خیر</Button>
                                <Button variant="danger" className="pr-4" onClick={(e) => this.deleteCategory(e, catToDelete)}>حذف</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    deleteCategory(e, catToDelete) {
        e.preventDefault()
        multimediacategory_delete(catToDelete).then((data)=>{
            this.getAllCategories()
            this.closeModalDelete()
        }).catch((e)=>{
            console.log(e)
        })
    }
    render() {
        return (
            <>
                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        مدیریت دسته بندی های رسانه
                    </p>
                </Notice>

                {(this.state.addMode) &&
                    <Portlet>
                        <PortletHeader title="افزودن دسته بندی رسانه ها"/>
                        <PortletBody>
                            <form onSubmit={(e)=>this.addMediaCat(e)}>
                                <Form.Group controlId="form_catName">
                                    <Form.Label>category name</Form.Label>
                                    <Form.Control name="category_name" type="text" placeholder="category name"  />
                                </Form.Group>

                                <Form.Group >
                                    <button className="btn btn-primary">ثبت</button>
                                </Form.Group>

                            </form>
                        </PortletBody>
                    </Portlet>
                }
                <Portlet>
                    <PortletHeader
                        title="دسته بندی های رسانه"
                        toolbar={
                            <PortletHeaderToolbar>
                                <button
                                    type="button"
                                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                    onClick={(e) => this.toggleAddMode(e)}
                                >
                                    <AddIcon/>
                                </button>
                            </PortletHeaderToolbar>
                        }
                    />

                    <PortletBody>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>name</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.categories.map(this.RenderRaw)}
                            </tbody>
                        </Table>
                    </PortletBody>
                </Portlet>


                {this.renderModalDelete(this.state.selectedcatToDelete)}
            </>
        );
    }

}

export default MediaCategoryManagement;
