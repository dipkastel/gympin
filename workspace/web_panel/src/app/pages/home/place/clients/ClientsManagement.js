import React, {Component} from "react";
import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Modal, Table} from "react-bootstrap";
import {location_getAllState} from "../../../../api/locations.api";

const style = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: "fit-content",
        "align-self": "center",
    },
    table: {
        marginTop:theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button_danger: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor:"#aa2222",
        "&:hover":{
            backgroundColor:"#770d0d",
        },
        color: "#fff"
    },
    button_edit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor:"#227aaa",
        "&:hover":{
            backgroundColor:"#124a88",
        },
        color: "#fff"
    },
    container: {
        display: "inline-grid"
    }
})
class ClientsManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedClientToDelete: null,
            allUsersArray: []
        };
    }

    render() {
        const { classes } = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title={"پرسنل "+this.props.state.Name}
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
                                id="standard-region"
                                label="نام منطقه"
                                className={classes.textField}
                                name="region_name"
                                margin="normal"
                            />
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
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>

            {this.renderModalDelete(classes,this.state.selectedClientToDelete)}
        </>

    };

    componentDidMount() {
        this.getRegions();
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedRegionToEdit: null
        }));
        document.querySelector('#standard-region').value = ""
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }

    getStates() {

        location_getAllState().then(data => {
            var statesOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                selectState:{options : statesOptions,
                    selectedValue:null}
            }))
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
    renderRegions=(client,index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{client.Id}</td>
                <td>{client.username}</td>
                <td>{client.phoneNumber}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,client)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }
}

export default withStyles(style)(ClientsManagement);
