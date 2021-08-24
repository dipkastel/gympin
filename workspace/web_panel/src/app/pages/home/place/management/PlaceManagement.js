import React, {Component} from "react";
import Notice from "../../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Form, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, Paper, TextField} from "@material-ui/core";
import Select from 'react-select';
import {withStyles} from "@material-ui/styles";
import {
    location_getAllState,
    location_getCities_byState,
    location_getRegions_byCity
} from "../../../../api/locations.api";


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
        }
    },
    button_edit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor:"#227aaa",
        "&:hover":{
            backgroundColor:"#124a88",
        }
    },
    container: {
        display: "inline-grid"
    },
    dropdown: {
        width: "180px"
    }
})

class PlaceManagement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            states:[],
            cities:[],
            regions:[],
            selectedState:null,
            selectedCity:null,
            selectedRegion:null,
        };
    }

    componentDidMount() {
        this.getStates();
    }


    toggleAddMode(e){
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
    }

  getPlaces() {

    return (
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
    );
  }


    render() {
        const { classes } = this.props;
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
                                    onClick={(e)=>this.toggleAddMode(e)}
                                >
                                    <AddIcon/>
                                </button>
                            </PortletHeaderToolbar>
                        }
                    />

                    <PortletBody>



                        <Paper className={classes.root} hidden={!this.state.addMode}>
                            <Form className={classes.container} noValidate autoComplete="off" onSubmit={(e)=>this.addCity(e)}>
                                <Form.Group controlId="formPlaceName">
                                    <Form.Label>نام مکان (مجموعه ورزشی)</Form.Label>
                                    <Form.Control type="text" placeholder="نام مکان (مجموعه ورزشی)" />
                                    <Form.Text className="text-muted">
                                       از نوشتن هاشه ها (مجموعه ورزشی ، باشگاه ، استادیوم) خودداری کنید
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formState">
                                    <Form.Label>استان</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        options={this.state.states}
                                        onChange={(e)=>this.stateSelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formState">
                                    <Form.Label>شهر</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        options={this.state.cities}
                                        onChange={(e)=>this.citySelectedChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formState">
                                    <Form.Label>ناحیه (منطقه)</Form.Label>
                                    <Select
                                        className={classes.dropdown}
                                        inputId="react-select-single"
                                        TextFieldProps={{
                                            label: 'states',
                                            InputLabelProps: {
                                                htmlFor: 'react-select-single',
                                                shrink: true,
                                            },
                                            placeholder: 'Search a state',
                                        }}
                                        options={this.state.regions}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                                    ثبت
                                </Button>
                            </Form>
                        </Paper>
                            <div className="kt-separator kt-separator--dashed"></div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                                </thead>
                                <tbody>


                                </tbody>
                            </Table>
                    </PortletBody>
                </Portlet>

            </>
        )
    }

    getStates() {
        location_getAllState().then(data=>{
            var statesOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                states: statesOptions
            }));
        })
    }
    stateSelectedChange(e) {
        location_getCities_byState({Id:e.value}).then(data=>{
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
        location_getRegions_byCity({Id:e.value}).then(data=>{
            var RegionOptions = data.data.Data.map(suggestion => ({
                value: suggestion.Id,
                label: suggestion.Name
            }))
            this.setState(() => ({
                regions: RegionOptions
            }));
        })
    }
}
export default withStyles(style)(PlaceManagement);
