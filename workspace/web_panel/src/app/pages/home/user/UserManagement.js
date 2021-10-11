import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, Paper} from "@material-ui/core";
import Select from 'react-select';
import {withStyles} from "@material-ui/styles";
import {
    user_add,
    user_getAll,
    user_delete,
    user_update
} from "../../../api/user.api";
import 'leaflet/dist/leaflet.css';
import {style} from "../../../partials/content/generalStyle";


class UserManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMode: true,
            allUsersArray:[],
            selectedUserToDelete:null,
            selectedAccess:null
        };
    }
    render() {
        const {classes} = this.props;


        return (
            <>

                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        مدیریت کاربران
                    </p>
                </Notice>


                <Portlet>
                    <PortletHeader
                        title="کاربران"
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

                        <Paper className={classes.root} hidden={!this.state.addMode}>
                            <Form className={classes.container} noValidate autoComplete="off"
                                  onSubmit={(e) => this.addUser(e)}>
                                <Form.Group controlId="form_UserName">
                                    <Form.Label>نام کاربر (نام و نام خانوادگی)</Form.Label>
                                    <Form.Control name="formUserName" type="text" placeholder="نام کاربر (نام و نام خانوادگی)"/>
                                </Form.Group>

                                <Form.Group controlId="form_PhoneNumber">
                                    <Form.Label>شماره موبایل</Form.Label>
                                    <Form.Control name="formPhoneNumber" type="text" placeholder="شماره موبایل"/>
                                </Form.Group>

                                <Form.Group controlId="formRegion">
                                    <Form.Label>دسترسی</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formUserAccess"
                                        TextFieldProps={{
                                            label: 'UserAccess',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        value={this.state.selectedAccess}
                                        options={this.getAccess()}
                                        onChange={(e) => this.accessSelectedChange(e)}
                                    />
                                </Form.Group>
                                <input
                                    className={classes.hidden_input}
                                    value={this.state.selectedLat}
                                    name="formLat"
                                />
                                <input
                                    className={classes.hidden_input}
                                    value={this.state.selectedLng}
                                    name="formLng"
                                />
                                <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                                    ثبت
                                </Button>
                            </Form>
                        </Paper>
                        <div className="kt-separator kt-separator--dashed"/>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>username</th>
                                <th>phoneNumber</th>
                                <th>role</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allUsersArray.map(this.renderUsersRow)}
                            </tbody>
                        </Table>
                    </PortletBody>
                </Portlet>

                {this.renderModalDelete(classes,this.state.selectedUserToDelete)}
            </>
        )
    }
    componentDidMount() {
        this.getUsers();
        this.setState(() => ({
            addMode: false
        }));
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedUserToEdit: null
        }));
        this.clearForm()
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
    addUser(e) {
        e.preventDefault()
        if(this.state.selectedUserToEdit){
            user_update({
                "Id":this.state.selectedUserToEdit.Id,
                "username": e.target.form_UserName.value,
                "phoneNumber":e.target.form_PhoneNumber.value,
                "role":this.state.selectedAccess.label
            }).then(data => {
                this.getUsers();

                this.setState(() => ({
                    selectedUserToEdit: null
                }));
                this.closeAddMode(e)
                this.clearForm()
            }).catch(e => {
                console.log(e);
            })
        }else {
            user_add({
                "username": e.target.form_UserName.value,
                "phoneNumber":e.target.form_PhoneNumber.value,
                "role":this.state.selectedAccess.label
            }).then(data => {

                this.getUsers()
                this.clearForm()
                this.closeAddMode(e)
            }).catch(e => {
                console.log(e);
            })
        }
    }
    deleteUser(e,user) {
        console.log(user)
        e.preventDefault()
        user_delete({
            "Id": user.Id

        }).then(data=>{
            this.getUsers()
            this.closeModalDelete()
            this.clearForm()
        }).catch(e=>{
            console.log(e);
        })
    }

    openModalDelete =(e,user)=>{
        this.setState(() => ({
            selectedUserToDelete: user
        }));
    };
    getUsers() {

        user_getAll().then(data=>{
            this.setState(() => ({
                allUsersArray: data.data.Data
            }));

        }).catch(e=>{
            console.log(e);
        })
    }
    renderUsersRow=(User, index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{User.Id}</td>
                <td>{User.username}</td>
                <td>{User.phoneNumber}</td>
                <td>{User.role}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button_edit} onClick={(e)=>this.prepareEditUser(e,User)}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,User)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }

    prepareEditUser=(e,user)=>{

        e.preventDefault()
        this.openAddMode(e)
        console.log(this.getAccess().filter(p=>p.label === user.role))
        this.setState(() => ({
            selectedUserToEdit: user,
            selectedAccess:this.getAccess().filter(p=>p.label === user.role)
        }));
         document.querySelector('#form_UserName').value = user.username
        document.querySelector('#form_PhoneNumber').value = user.phoneNumber
    }


    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedUserToDelete: null
        }));
    };
    renderModalDelete = (classes,UserToDelete)=>{
        console.log(this.state.selectedAccess)
        return(<>
                <Modal show={UserToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {UserToDelete&&UserToDelete.username}</Modal.Body>
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

    getAccess() {
        return [{
            label: "USER",
            value: 1
        },{
            label: "CONTENT",
            value: 2
        },{
            label: "MARKET",
            value: 3
        },{
            label: "ADMIN",
            value: 4
        },{
            label: "SUPERADMIN",
            value: 5
        },{
            label: "MANAGER",
            value: 6
        },{
            label: "ATHLETE",
            value: 7
        },{
            label: "COACH",
            value: 8
        }]

    }

    accessSelectedChange(e) {

        this.setState(() => ({
                selectedAccess:e,
            }
        ));
    }

    clearForm(){

        this.setState(() => ({
                selectedAccess:null,
            }
        ));
        document.querySelector('#form_UserName').value = ""
        document.querySelector('#form_PhoneNumber').value = ""
    }
}

export default withStyles(style)(UserManagement);
