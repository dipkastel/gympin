import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {
    location_addState,
    location_getAllState,
    location_updateState,
    location_deleteState
} from "../../../../api/locations.api";
import CitiesManagement from "../cities/citiesManagement";
import {Modal, Table} from "react-bootstrap";
import {style} from "../../../../partials/content/generalStyle";

class StatesManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedStateToOpenCities: null,
            selectedStateToEdit: null,
            selectedStateToDelete: null,
            allStatesArray: []
        };
    }

    render() {
        const {classes} = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title="استان ها"
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

                        <form className={classes.container} noValidate autoComplete="off"
                              onSubmit={(e) => this.addState(e)}>
                            <p>افزودن استان :</p>
                            <TextField
                                id="standard-name"
                                label="نام استان"
                                className={classes.textField}
                                name="state_name"
                                margin="normal"
                            />
                            <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                                ثبت
                            </Button>
                        </form>
                    </Paper>

                    <div className="kt-separator kt-separator--dashed"></div>
                    <Table striped bordered hover className={classes.table}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>نام استان</th>
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.allStatesArray.map(this.renderStateRow)}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>
            {this.state.selectedStateToOpenCities &&
            <CitiesManagement state={this.state.selectedStateToOpenCities}/>
            }
            {this.renderModalDelete(classes,this.state.selectedStateToDelete)}

        </>

    };
    componentDidMount() {
        this.getAllStates();
    }
    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedStateToEdit: null
        }));
        document.querySelector('#standard-name').value = ""
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }
    getAllStates() {
        location_getAllState().then(data => {

            this.setState(() => ({
                allStatesArray: data.data.Data
            }));
        }).catch(e => {
            console.log(e);
        })
    }
    openCities(e, state) {
        e.preventDefault()
        this.setState(() => ({
            selectedStateToOpenCities: state
        }));
    }
    deleteState(e, state) {
        e.preventDefault()
        console.log(state.Id)
        location_deleteState(state)
            .then(data => {
                this.getAllStates()
                this.closeModalDelete()
            }).catch(e => {
            console.log(e)
        })
    }
    addState(e) {
        e.preventDefault()
        if(this.state.selectedStateToEdit){
            location_updateState({
                "Name": e.target.state_name.value,
                "Id":this.state.selectedStateToEdit.Id
            }).then(data => {
                this.getAllStates();
                document.querySelector('#standard-name').value = ""
                this.setState(() => ({
                    addMode: false,
                    selectedStateToEdit: null
                }));
            }).catch(e => {
                console.log(e);
            })
        }else{
            location_addState({
                "Name": e.target.state_name.value
            }).then(data => {
                this.getAllStates();
                document.querySelector('#standard-name').value = ""
                console.log(data);
            }).catch(e => {
                console.log(e);
            })
        }
    }
    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedStateToDelete: null
        }));
    };
    openModalDelete =(e,state)=>{
        this.setState(() => ({
            selectedStateToDelete: state
        }));
    };
    prepareEditState=(e,State)=>{

        e.preventDefault()
        this.openAddMode(e)
        this.setState(() => ({
            selectedStateToEdit: State
        }));
        document.querySelector('#standard-name').value = State.Name
    }
    renderModalDelete = (classes,stateToDelete)=>{
        return(<>
                <Modal show={stateToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {stateToDelete&&stateToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteState(e, stateToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
        );
    }
    renderStateRow = (state, index) => {
        const {classes} = this.props;
        return (
            <>
                <tr key={index}>
                    <td>{state.Id}</td>
                    <td>{state.Name}</td>
                    <td>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={(e) => this.openCities(e, state)}>
                            مشاهده شهر ها
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button_edit}
                                onClick={(e)=>this.prepareEditState(e,state)}>
                            ویرایش
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button_danger}
                                onClick={(e) => this.openModalDelete(e, state)}>
                            حذف
                        </Button>
                    </td>
                </tr>
            </>

        )
    }

}

export default withStyles(style)(StatesManagement);
