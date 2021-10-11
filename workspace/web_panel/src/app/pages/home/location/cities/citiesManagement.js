import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {
    location_addCity, location_deleteCity,
    location_getCities_byState, location_updateCity
} from "../../../../api/locations.api";
import {Modal, Table} from "react-bootstrap";
import RegionsManagement from "../regions/regionsManagement";
import {style} from "../../../../partials/content/generalStyle";

class citiesManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedCityToOpenRegions: null,
            selectedCityToEdit: null,
            selectedCityToDelete: null,
            allCitiesArray: []
        };
    }

    render() {
        const { classes } = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title={"شهر های "+this.props.state.Name}
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

                        <form className={classes.container} noValidate autoComplete="off" onSubmit={(e)=>this.addCity(e)}>
                            <p>افزودن شهر :</p>
                            <TextField
                                id="standard-city"
                                label="نام شهر"
                                className={classes.textField}
                                name="city_name"
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
                            <th>نام شهر</th>
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.allCitiesArray.map(this.renderCitiesRow)}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>
            {this.state.selectedCityToOpenRegions&&
            <RegionsManagement city={this.state.selectedCityToOpenRegions} />}

            {this.renderModalDelete(classes,this.state.selectedCityToDelete)}

        </>

    };
    componentDidMount() {
        this.getCities();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.state.Id !== this.props.state.Id){
            this.getCities();
            this.setState(() => ({
                addMode: false,
                selectedCityToOpenRegions: null,
            }));

        }
    }
    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedCityToEdit: null
        }));
        document.querySelector('#standard-city').value = ""
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }
    getCities(){
        location_getCities_byState(this.props.state).then(data=>{
            this.setState(() => ({
                allCitiesArray: data.data.Data
            }));
        }).catch(e=>{
            console.log("fail "+e)
        })
    };
    openRegions(e,city){
        e.preventDefault()
        this.setState(() => ({
            selectedCityToOpenRegions: city
        }));
    }
    deleteCity(e,city){
        e.preventDefault()
        console.log("delete : "+city.Id)
        location_deleteCity({
            Id:city.Id
        })
            .then(data => {
                this.getCities()
                this.closeModalDelete()
            }).catch(e => {
            console.log(e)
        })
    }
    addCity(e) {
        e.preventDefault()

        if(this.state.selectedCityToEdit){
            location_updateCity({
                "Name": e.target.city_name.value,
                "Id":this.state.selectedCityToEdit.Id
            }).then(data => {
                this.getCities();
                document.querySelector('#standard-city').value = null
                this.setState(() => ({
                    addMode: false,
                    selectedCityToEdit: null
                }));
            }).catch(e => {
                console.log(e);
            })
        }else{
        location_addCity({
            "Name": e.target.city_name.value,
            "State": this.props.state
        }).then(data=>{
            this.getCities();
            document.querySelector('#standard-city').value = null
        }).catch(e=>{
            console.log(e);
        })
        }
    }
    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedCityToDelete: null
        }));
    };
    openModalDelete =(e,state)=>{
        this.setState(() => ({
            selectedCityToDelete: state
        }));
    };
    prepareEditCity=(e,State)=>{

        e.preventDefault()
        this.openAddMode(e)
        this.setState(() => ({
            selectedCityToEdit: State
        }));
        document.querySelector('#standard-city').value = State.Name
    }
    renderModalDelete = (classes,CityToDelete)=>{
        return(<>
                <Modal show={CityToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {CityToDelete&&CityToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteCity(e, CityToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    renderCitiesRow=(city,index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{city.Id}</td>
                <td>{city.Name}</td>
                <td>

                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={(e)=>this.openRegions(e,city)}>
                        مشاهده محله ها
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_edit}
                            onClick={(e)=>this.prepareEditCity(e,city)}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger}
                            onClick={(e)=>this.openModalDelete(e, city)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }
}

export default withStyles(style)(citiesManagement);
