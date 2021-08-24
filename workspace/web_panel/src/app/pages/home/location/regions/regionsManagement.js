import React, {Component} from "react";

import {Button, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {
     location_addRegion,
     location_getRegions_byCity
} from "../../../../api/locations.api";
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
class regionManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            allRegionsArray: []
        };
    }

    render() {
        const { classes } = this.props;
        return <>

            <Portlet>
                <PortletHeader
                    title={"منطقه های "+this.props.city.Name}
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
                                id="standard-name"
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
                        {this.state.allRegionsArray.map(this.renderRegions)}
                        </tbody>
                    </Table>
                </PortletBody>
            </Portlet>

        </>

    };

    componentDidMount() {
        this.getRegionsByCity(this.props.city);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.city.Id !== this.props.city.Id){
            this.getRegionsByCity(this.props.city);
            this.setState(() => ({
                addMode: false
            }));

        }
    }

    toggleAddMode(e){
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
    }

    addRegion(e) {
        e.preventDefault()
        location_addRegion({
            "Name": e.target.region_name.value,
            "City": this.props.city
        }).then(data=>{
            this.getRegionsByCity(this.props.city);
        }).catch(e=>{
            console.log(e);
        })
    }
    getRegionsByCity(city){
        location_getRegions_byCity({"Id":city.Id}).then(data=>{
            this.setState(() => ({
                allRegionsArray: data.data.Data
            }));
        }).catch(e=>{
            console.log("fail "+e)
        })
    };
    deleteRegion(e,region){
        e.preventDefault()

    }

    renderRegions=(region,index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{region.Id}</td>
                <td>{region.Name}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button_edit}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.deleteRegion(e,region)}>
                        حذف
                    </Button>

                </td>
            </tr>
        )
    }
}

export default withStyles(style)(regionManagement);
