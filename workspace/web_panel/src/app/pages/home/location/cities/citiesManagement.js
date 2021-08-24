import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {
    location_addCity,
    location_getCities_byState
} from "../../../../api/locations.api";
import {Table} from "react-bootstrap";
import RegionsManagement from "../regions/regionsManagement";

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
    }
})
class citiesManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedCity: null,
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
                                id="standard-name"
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
                        {this.state.allCitiesArray.map(this.renderCities)}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>
            {this.state.selectedCity&&
            <RegionsManagement city={this.state.selectedCity} />}

        </>

    };

    componentDidMount() {
        this.getCitiesByState(this.props.state);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.state.Id !== this.props.state.Id){
            this.getCitiesByState(this.props.state);
            this.setState(() => ({
                addMode: false,
                selectedCity: null,
            }));

        }
    }

    toggleAddMode(e){
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
    }

    addCity(e) {
        e.preventDefault()
        location_addCity({
            "Name": e.target.city_name.value,
            "State": this.props.state
        }).then(data=>{
            this.getCitiesByState(this.props.state);
        }).catch(e=>{
            console.log(e);
        })
    }
    getCitiesByState(state){
        console.log(state)
        location_getCities_byState(state).then(data=>{
            this.setState(() => ({
                allCitiesArray: data.data.Data
            }));
        }).catch(e=>{
            console.log("fail "+e)
        })
    };
    selectCity(e,city){
        e.preventDefault()
        this.setState(() => ({
            selectedCity: city
        }));
    }
    deleteCity(e,city){
        e.preventDefault()

    }

    renderCities=(city,index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{city.Id}</td>
                <td>{city.Name}</td>
                <td>

                    <Button variant="contained" color="primary" className={classes.button} onClick={(e)=>this.selectCity(e,city)}>
                        مشاهده محله ها
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_edit}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.deleteCity(e,city)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }
}

export default withStyles(style)(citiesManagement);
