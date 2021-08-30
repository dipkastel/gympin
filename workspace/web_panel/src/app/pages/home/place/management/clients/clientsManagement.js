import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import {Modal, Table} from "react-bootstrap";

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
            selectedRegionToEdit: null,
            selectedRegionToDelete: null,
            allRegionsArray: []
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
                            <p>افزودن منطقه :</p>
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
                    <div className="kt-separator kt-separator--dashed"></div>
                    <Table striped bordered hover className={classes.table}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>نام شهر</th>
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{this.state.allRegionsArray.map(this.renderRegions)}*/}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>

            {/*{this.renderModalDelete(classes,this.state.selectedRegionToDelete)}*/}
        </>

    };

    componentDidMount() {
        this.getRegions();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.city.Id !== this.props.city.Id){
        //     this.getRegions();
        //     this.setState(() => ({
        //         addMode: false
        //     }));
        //
        // }
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
        // if(this.state.selectedRegionToEdit){
        //     location_updateRegion({
        //         "Name": e.target.region_name.value,
        //         "Id":this.state.selectedRegionToEdit.Id
        //     }).then(data => {
        //         this.getRegions();
        //         document.querySelector('#standard-region').value = null
        //         this.setState(() => ({
        //             addMode: false,
        //             selectedRegionToEdit: null
        //         }));
        //     }).catch(e => {
        //         console.log(e);
        //     })
        // }else {
        //     location_addRegion({
        //         "Name": e.target.region_name.value,
        //         "City": this.props.city
        //     }).then(data => {
        //         this.getRegions();
        //         document.querySelector('#standard-region').value = null
        //     }).catch(e => {
        //         console.log(e);
        //     })
        // }
    }

    closeModalDelete = ()=> {
        // this.setState(() => ({
        //     selectedRegionToDelete: null
        // }));
    };
    openModalDelete =(e,region)=>{
        // this.setState(() => ({
        //     selectedRegionToDelete: region
        // }));
    };

    prepareEditRegion=(e,region)=>{

        e.preventDefault()
        this.openAddMode(e)
        this.setState(() => ({
            selectedRegionToEdit: region
        }));
        document.querySelector('#standard-region').value = region.Name
    }

    renderModalDelete = (classes,regionToDelete)=>{
        // return(<>
        //         <Modal show={regionToDelete} onHide={this.closeModalDelete}>
        //             <Modal.Header closeButton>
        //                 <Modal.Title>delete</Modal.Title>
        //             </Modal.Header>
        //             <Modal.Body>حذف {regionToDelete&&regionToDelete.Name}</Modal.Body>
        //             <Modal.Footer>
        //                 <Button className={classes.button_edit} onClick={this.closeModalDelete}>
        //                     خیر
        //                 </Button>
        //                 <Button className={classes.button_danger} onClick={(e) => this.deleteRegion(e, regionToDelete)}>
        //                     حذف
        //                 </Button>
        //             </Modal.Footer>
        //         </Modal>
        //     </>
        // );
    }
    renderRegions=(region,index)=>{
        // const { classes } = this.props;
        // return (
        //     <tr key={index}>
        //         <td>{region.Id}</td>
        //         <td>{region.Name}</td>
        //         <td>
        //             <Button variant="contained" color="primary" className={classes.button_edit} onClick={e=>this.prepareEditRegion(e,region)}>
        //                 ویرایش
        //             </Button>
        //             <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,region)}>
        //                 حذف
        //             </Button>
        //
        //         </td>
        //     </tr>
        // )
    }
}

export default withStyles(style)(ClientsManagement);
