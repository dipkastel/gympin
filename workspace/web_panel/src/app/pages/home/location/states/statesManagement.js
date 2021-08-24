import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {location_addState, location_getAllState} from "../../../../api/locations.api";
import CitiesManagement from "../cities/citiesManagement";
import {Table} from "react-bootstrap";

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
class StatesManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            selectedState: null,
            allStatesArray: [],
        };
    }

    render() {
        const { classes } = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title="استان ها"
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

                        <form className={classes.container} noValidate autoComplete="off" onSubmit={(e)=>this.addState(e)}>
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
                            {this.state.allStatesArray.map(this.renderStates)}
                            </tbody>
                        </Table>
                </PortletBody>
            </Portlet>
            {this.state.selectedState&&
            <CitiesManagement state={this.state.selectedState} />
            }


        </>

    };

    componentDidMount() {
        this.getAllStates();
    }


    toggleAddMode(e){
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
    }

    getAllStates(){
        location_getAllState().then(data=>{

            this.setState(() => ({
                allStatesArray: data.data.Data
            }));
        }).catch(e=>{
            console.log(e);
        })
    };
    selectState(e,state) {
        e.preventDefault()
         this.setState(() => ({
            selectedState: state
        }));
    }
    deleteState(e,state) {
        e.preventDefault()
        console.log("delete"+state)
    }

    addState(e) {
        e.preventDefault()
         location_addState({
             "name": e.target.state_name.value
         }).then(data=>{
             this.getAllStates();
             console.log(data);
         }).catch(e=>{
            console.log(e);
         })
    }

    renderStates=(state,index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{state.Id}</td>
                <td>{state.Name}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button} onClick={(e)=>this.selectState(e,state)}>
                        مشاهده شهر ها
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_edit} >
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.deleteState(e,state)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }

}

export default withStyles(style)(StatesManagement);
