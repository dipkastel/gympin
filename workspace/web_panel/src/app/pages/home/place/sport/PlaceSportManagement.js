import React, {Component} from "react";
import Notice from "../../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, Paper} from "@material-ui/core";
import Select from 'react-select';
import {withStyles} from "@material-ui/styles";
import ClientsManagement from "../clients/ClientsManagement";
import {
    location_addPlace,
    location_getAllPlaces,
    location_getAllState,
    location_getCities_byState,
    location_getRegions_byCity
} from "../../../../api/locations.api";
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';


const style = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: "fit-content",
        "align-self": "center",
    },
    table: {
        marginTop: theme.spacing(2),
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
        backgroundColor: "#aa2222",
        "&:hover": {
            backgroundColor: "#770d0d",
        }
    },
    button_edit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#227aaa",
        "&:hover": {
            backgroundColor: "#124a88",
        }
    },
    container: {
        display: "inline-grid"
    },
    dropdown: {
        width: "180px"
    },
    map: {
        width: "600px",
        height: "300px"
    },
    hidden_input: {
        display: "none"
    }
})

class PlaceSportManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMode: true,
            states: [],
            cities: [],
            regions: [],
            selectedState: null,
            selectedCity: null,
            selectedRegion: null,
            selectedLat:0.0,
            selectedLng:0.0,
            allPlacesArray:[],
            selectedPlace:null,
            selectedPlaceToOpenClients:null
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
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        options={this.state.states}
                                        value={this.state.selectedState}
                                        onChange={(e) => this.stateSelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity">
                                    <Form.Label>شهر</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formCity"
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        options={this.state.cities}
                                        value={this.state.selectedCity}
                                        onChange={(e) => this.citySelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRegion">
                                    <Form.Label>ناحیه (منطقه)</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        name="formRegion"
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        value={this.state.selectedRegion}
                                        options={this.state.regions}
                                        onChange={(e) => this.regionSelectedChange(e)}
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

                {this.state.selectedPlaceToOpenClients &&
                <ClientsManagement state={this.state.selectedPlaceToOpenClients}/>
                }
                {this.renderModalDelete(classes,this.state.selectedStateToDelete)}
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
            addMode: !this.state.addMode
        }));
    }
    addPlace(e) {
        e.preventDefault()
        location_addPlace({
            "Address": e.target.formAddress.value,
            "Latitude": e.target.formLat.value,
            "Longitude": e.target.formLng.value,
            "Name": e.target.formName.value,
            "Region": {
                "Id": e.target.formRegion.value
            }
        }).then(data=>{
            this.getPlaces();
        }).catch(e=>{
            console.log(e);
        })
    }
    prepareMap() {

        // define leaflet
        var leaflet = L.map('kt_leaflet', {
            center: [35.70190, 51.41712],
            zoom: 11
        });
        leaflet.panTo(leaflet.getCenter());

        // set leaflet tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(leaflet);

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

        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: 'leaflet-marker'
        });


        // Define Marker Layer
        var markerLayer = L.layerGroup().addTo(leaflet);

        // Map onClick Action
        leaflet.on('click', function (e) {
            markerLayer.clearLayers();
            L.marker(e.latlng, {icon: leafletIcon}).addTo(markerLayer);

            this.setState(() => ({
                selectedLat: e.latlng.lat,
                selectedLng: e.latlng.lng
            }));
        },this);
    };
    getStates() {

        location_getAllState().then(data => {
            var statesOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                states: statesOptions
            }));
        })
    }
    selectPlace(e,place) {
        e.preventDefault()
        console.log(place)
        this.setState(() => ({
            selectedPlaceToOpenClients: place
        }));
    }
    deletePlace(e,place) {
        e.preventDefault()

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
            selectedState:e.name,
            selectedCity: null,
            selectedRegion: null,
        }));
        location_getCities_byState({Id: e.value}).then(data => {
            var cityOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                cities: cityOptions
            }));
        })
    }
    citySelectedChange(e) {

        this.setState(() => ({
            selectedCity: e.name,
            selectedRegion: null,
        }));
        location_getRegions_byCity({Id: e.value}).then(data => {
            var RegionOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                regions: RegionOptions
            }));
        })
    }
    regionSelectedChange(e) {

        this.setState(() => ({
            selectedRegion: e.name,
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

                    <Button variant="contained" color="primary" className={classes.button} >
                        ورزش ها
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={(e)=>this.selectPlace(e,place)}>
                        مشاهده پرسنل
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_edit}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.deletePlace(e,place)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
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

}

export default withStyles(style)(PlaceSportManagement);
