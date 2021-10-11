import React, {Component} from "react";
import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import {Form, Modal, Table} from "react-bootstrap";
import {location_getOwnersPlace} from "../../../../../api/locations.api";
import Select from "react-select";
import {style} from "../../../../../partials/content/generalStyle"

class PlaceClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedClientToDelete: null,
            allUsersArray: [],
            selectedRole:null
        };
    }

    render() {
        const { classes } = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title={"پرسنل "+this.props.place.Name}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e)=>this.toggleAddMode(e)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Paper className={classes.root} hidden={!this.state.addMode}>

                        <form className={classes.container} noValidate autoComplete="off" onSubmit={(e)=>this.addRegion(e)}>
                            <p>افزودن کاربر :</p>
                            <TextField
                                id="standard-user-id"
                                label="شناسه کاربر"
                                className={classes.textField}
                                name="user_id"
                                margin="normal"
                            />

                            <Form.Group controlId="formRole">
                                <Form.Label>سطح دسترسی</Form.Label>
                                <Select
                                    className={classes.dropdown}
                                    inputId="react-select-single"
                                    name="formRole"
                                    options={this.getAccess()}
                                    value={this.state.selectedRole}
                                    onChange={(e) => this.roleSelectedChange(e)}
                                />
                            </Form.Group>
                            <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                                ثبت
                            </Button>
                        </form>
                    </Paper>
                    <div className="kt-separator kt-separator--dashed"/>
                    <Table striped bordered hover className={classes.table}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>نام و نام خانوادگی</th>
                            <th>شماره تلفن</th>
                            <th>دسترسی</th>
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.allUsersArray.map(this.renderUsersRow)}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>

            {this.renderModalDelete(classes,this.state.selectedClientToDelete)}
        </>

    };

    componentDidMount() {
        this.getRegions();
        this.getOwnersPlace();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.place.Id !== this.props.place.Id){
            this.getOwnersPlace();
        }
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedRegionToEdit: null
        }));
        document.querySelector('#standard-user-id').value = ""
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }

    getOwnersPlace() {

        location_getOwnersPlace({"Id":this.props.place.Id}).then(data => {
            console.log(data.data.Data);
            this.setState(() => ({
                allUsersArray:data.data.Data
            }))
        }).catch(e=>{
            console.log(e);
        })
    }
    getRegions(){
        // location_getRegions_byCity({"Id":this.props.city.Id}).then(data=>{
        //     this.setState(() => ({
        //         allRegionsArray: data.data.Data
        //     }));
        // }).catch(e=>{
        //     console.log("fail "+e)
        // })
    };

    deleteRegion(e,region){
        e.preventDefault()
        // location_deleteRegion({
        //     Id:region.Id
        // })
        //     .then(data => {
        //         this.getRegions()
        //         this.closeModalDelete()
        //     }).catch(e => {
        //     console.log(e)
        // })
    }
    addRegion(e) {
        e.preventDefault()
            // location_addRegion({
            //     "Name": e.target.region_name.value,
            //     "City": this.props.city
            // }).then(data => {
            //     this.getRegions();
            //     document.querySelector('#standard-region').value = null
            // }).catch(e => {
            //     console.log(e);
            // })

    }

    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedClientToDelete: null
        }));
    };
    openModalDelete =(e,region)=>{
        this.setState(() => ({
            selectedClientToDelete: region
        }));
    };

    renderModalDelete = (classes,clientToDelete)=>{
        return(<>
                <Modal show={clientToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {clientToDelete&&clientToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteRegion(e, clientToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    renderUsersRow=(client,index)=>{
        console.log(client);
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{client.Id}</td>
                <td>{client.username}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.role}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,client)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
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

    roleSelectedChange(e) {

            this.setState(() => ({
                    selectedRole:e,
                }
            ));
    }
}

export default withStyles(style)(PlaceClients);
