import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, Paper} from "@material-ui/core";
import Select from 'react-select';
import {withStyles} from "@material-ui/styles";
import {
    location_addPlace,
    location_deletePlace,
    location_getAllPlaces,
    location_getAllState,
    location_getCities_byState,
    location_getRegions_byCity,
    location_updatePlace
} from "../../../api/locations.api";
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {Link} from "react-router-dom";
import {style} from "../../../partials/content/generalStyle"

var markerLayer = null;
let leaflet = null;
class PlaceManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMode: true,
            selectState: {
                options:null,
                selectedValue:null
            },
            selectCity: {
                options:null,
                selectedValue:null
            },
            selectRegion: {
                options:null,
                selectedValue:null
            },
            selectedLat:0.0,
            selectedLng:0.0,
            allPlacesArray:[],
            selectedPlace:null,
            selectedPlaceToDelete:null,
            selectedPlaceToEdit:null,
            selectedPlaceToEditTemp:null
        };
    }
    render() {
        const {classes} = this.props;


        return (
            <>

                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        موجودیت اماکن به معنای محلی است که در آن ورزش انجام میشود
                    </p>
                    <p>
                        این اماکن میتواند سر پوشیده یا باز باشد و نوع فعالیت های آنها در قسمت ورزش ها تایین میشود
                    </p>
                </Notice>


                <Portlet>
                    <PortletHeader
                        title="مکان ها"
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
                                  onSubmit={(e) => this.addPlace(e)}>
                                <Form.Group controlId="formPlaceName">
                                    <Form.Label>نام مکان (مجموعه ورزشی)</Form.Label>
                                    <Form.Control name="formName" type="text" placeholder="نام مکان (مجموعه ورزشی)"/>
                                    <Form.Text className="text-muted">
                                        از نوشتن هاشه ها (مجموعه ورزشی ، باشگاه ، استادیوم) خودداری کنید
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formState">
                                    <Form.Label>استان</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formState"
                                        options={this.state.selectState.options}
                                        value={this.state.selectState.selectedValue}
                                        onChange={(e) => this.stateSelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity">
                                    <Form.Label>شهر</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formCity"
                                        options={this.state.selectCity.options}
                                        value={this.state.selectCity.selectedValue}
                                        onChange={(e) => this.citySelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRegion">
                                    <Form.Label>ناحیه (منطقه)</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formRegion"
                                        options={this.state.selectRegion.options}
                                        value={this.state.selectRegion.selectedValue}
                                        onChange={(e) => this.regionSelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>آدرس کامل</Form.Label>
                                    <textarea
                                        className="form-control"
                                        id="exampleTextarea"
                                        rows="3"
                                        name="formAddress"
                                    />
                                </Form.Group>

                                <Form.Group controlId="map">
                                    <div id="kt_leaflet" className={classes.map}/>
                                </Form.Group>
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
                                <th>place Name</th>
                                <th>place Address</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allPlacesArray.map(this.renderPlacesRow)}
                            </tbody>
                        </Table>
                    </PortletBody>
                </Portlet>

                {this.renderModalDelete(classes,this.state.selectedPlaceToDelete)}
            </>
        )
    }
    componentDidMount() {
        this.getStates();
        this.getPlaces();
        this.prepareMap();

        this.setState(() => ({
            addMode: false
        }));
    }
    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedCityToEdit: null
        }));
        this.clearForm()
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }
    addPlace(e) {
        e.preventDefault()
        if(this.state.selectedPlaceToEdit){

            location_updatePlace({
                "Id":this.state.selectedPlaceToEdit.Id,
                "Address": e.target.formAddress.value,
                "Latitude": this.state.selectedLat,
                "Longitude": this.state.selectedLng,
                "Name": e.target.formName.value,
                "Region": {
                    "Id": e.target.formRegion.value
                }
            }).then(data => {
                this.getPlaces()
                this.toggleAddMode(e)
            }).catch(e => {
                console.log(e)
            })
        }else {
            location_addPlace({
                "Address": e.target.formAddress.value,
                "Latitude": this.state.selectedLat,
                "Longitude": this.state.selectedLng,
                "Name": e.target.formName.value,
                "Region": {
                    "Id": e.target.formRegion.value
                }
            }).then(data => {
                this.getPlaces()
                this.toggleAddMode(e)
            }).catch(e => {
                console.log(e);
            })
        }
    }
    prepareMap() {

        leaflet = L.map('kt_leaflet', {
            center: [35.70190, 51.41712],
            zoom: 11
        });
        leaflet.panTo(leaflet.getCenter());

        // set leaflet tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(leaflet);

        markerLayer=L.layerGroup().addTo(leaflet);

        // Map onClick Action
        leaflet.on('click', function (e) {
            this.addMarker(e.latlng)
        },this);
    }
    addMarker(latlng) {

        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: 'leaflet-marker'
        });

        markerLayer.clearLayers();
        L.marker(latlng, {icon: leafletIcon}).addTo(markerLayer);

        this.setState(() => ({
            selectedLat: latlng.lat,
            selectedLng: latlng.lng
        }));

        function getIconHtml() {
            return (`<span class="svg-icon svg-icon-danger svg-icon-3x">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 21 21" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="25" height="25"/>
                    <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                    </svg>
                    </span>`)
        }

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
    deletePlace(e,place) {
        e.preventDefault()
        location_deletePlace({
            Id:place.Id
        })
            .then(data => {
                this.getPlaces()
                this.closeModalDelete()
                this.clearForm()
            }).catch(e => {
            console.log(e)
        })
    }
    getPlaces() {

        location_getAllPlaces().then(data => {
            this.setState(() => ({
                allPlacesArray: data.data.Data
            }));
        })
    }
    stateSelectedChange(e) {

        this.setState(() => ({
            selectState:{
                options:this.state.selectState.options,
                selectedValue:e
            },

            selectCity:{ options: null,selectedValue:null},

            selectRegion:{ options: null,selectedValue:null}
        }));
        location_getCities_byState({Id: e.value}).then(data => {
            var cityOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                selectCity:{ options: cityOptions,selectedValue:null}
            }));
            if(this.state.selectedPlaceToEditTemp){
                this.citySelectedChange({
                    label:this.state.selectedPlaceToEdit.Region.City.Name,
                    value:this.state.selectedPlaceToEdit.Region.City.Id
                });
            }
        })
        console.log(this.state.selectState);
    }
    citySelectedChange(e) {
        this.setState(() => ({
            selectCity:{
                options:this.state.selectCity.options,
                selectedValue:e
            },
            selectRegion:{ options: null,selectedValue:null}
        }));
        location_getRegions_byCity({Id: e.value}).then(data => {
            var RegionOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                selectRegion:{options: RegionOptions,selectedValue:null}
            }));
            if(this.state.selectedPlaceToEditTemp){
                this.regionSelectedChange({
                    label:this.state.selectedPlaceToEdit.Region.Name,
                    value:this.state.selectedPlaceToEdit.Region.Id
                });
            }
        })
    }
    regionSelectedChange(e) {

        this.setState(() => ({
            selectRegion:{
                options:this.state.selectRegion.options,
                selectedValue:e
            },
            selectedPlaceToEditTemp:null
        }));

    }
    renderPlacesRow=(place, index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{place.Id}</td>
                <td>{place.Name}</td>
                <td>{place.Address}</td>
                <td>
                    <Link   to={'place/details?placeId='+place.Id} >
                        <Button variant="contained" color="primary" className={classes.button} >
                            جزئیات
                        </Button>
                    </Link>
                    <Button variant="contained" color="primary" className={classes.button_edit} onClick={e=>this.prepareEditPlace(e,place)}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,place)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }
    renderModalDelete = (classes,placeToDelete)=>{
        return(<>
                <Modal show={placeToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {placeToDelete&&placeToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deletePlace(e, placeToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    openModalDelete =(e,place)=>{
        this.setState(() => ({
            selectedPlaceToDelete: place
        }));
    };
    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedPlaceToDelete: null
        }));
    };
    prepareEditPlace=(e,place)=>{
        e.preventDefault()
        this.openAddMode(e)
        document.querySelector('[name="formName"]').value = place.Name
        document.querySelector('[name="formAddress"]').value = place.Address
        console.log(this.state.selectedState);
        this.setState(() => ({
            selectedPlaceToEdit: place,
            selectedPlaceToEditTemp:place
        }));
        this.stateSelectedChange({
            label:place.Region.City.State.Name,
            value:place.Region.City.State.Id
        });
        this.addMarker({lat:place.Latitude,lng:place.Longitude})
        leaflet.panTo({lat:place.Latitude,lng:place.Longitude});
        console.log(this.state.selectedState);
    }
    clearForm(){
        document.querySelector('[name="formName"]').value = null
        document.querySelector('[name="formAddress"]').value = null
        this.setState(() => ({
            selectedPlaceToEdit: null,
            selectedPlaceToEditTemp:null,
            selectedLat: 0.0,
            selectedLng: 0.0
        }));
        markerLayer.clearLayers();

        this.setState(() => ({
            selectState:{
                options:this.state.selectState.options,
                selectedValue:null
            },

            selectCity:{ options: null,selectedValue:null},

            selectRegion:{ options: null,selectedValue:null}
        }));
    }
}

export default withStyles(style)(PlaceManagement);
