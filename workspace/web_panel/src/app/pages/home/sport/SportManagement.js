import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Form, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {sport_addSport,sport_deleteSport,sport_getAllSport,sport_getSportById,sport_updateSport
} from "../../../api/sport.api";
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
        },
        color: "#fff"
    },
    button_edit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#227aaa",
        "&:hover": {
            backgroundColor: "#124a88",
        },
        color: "#fff"
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

class SportManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            allSportsArray:[],
            selectedSportToEdit:null,
            selectedSportToDelete:null
        };
    }
    render() {
        const {classes} = this.props;


        return (
            <>

                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        موجودیت ورزش به معنای فعالیت بدنی است که موجب سلامت و تن درستی است
                    </p>
                    <p>
                        این ورزش ها میتواند نیازمند وسیله یا بی نیاز از وسایل ورزشی باشد
                    </p>
                </Notice>


                <Portlet>
                    <PortletHeader
                        title="ورزش ها"
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
                                  onSubmit={(e) => this.addSport(e)}>
                                <Form.Group controlId="formSportName">
                                    <Form.Label>نام ورزش (فعالیت فیزیکی)</Form.Label>
                                    <Form.Control name="formName" type="text" placeholder="نام ورزش (فعالیت فیزیکی)"/>
                                    <Form.Text className="text-muted">
                                        از نوشتن هاشیه ها (ورزش،...) خودداری کنید
                                    </Form.Text>
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
                                <th>sport Name</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allSportsArray.map(this.renderSportRow)}
                            </tbody>
                        </Table>
                    </PortletBody>
                </Portlet>

                {this.renderModalDelete(classes,this.state.selectedSportToDelete)}
            </>
        )
    }
    componentDidMount() {
        this.getSports();
    }
    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode
        }));
        this.clearForm()
    }
    openAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: true
        }));
    }
    addSport(e) {
        e.preventDefault()
        if(this.state.selectedSportToEdit){
            sport_updateSport({
                "Id":this.state.selectedSportToEdit.Id,
                "Name": e.target.formName.value
            }).then(data=>{
                this.getSports();
                this.toggleAddMode(e)
            }).catch(e=>{
                console.log(e);
            })
        }
        else {
            sport_addSport({
                "Name": e.target.formName.value
            }).then(data=>{
                this.getSports();
                this.toggleAddMode(e)
            }).catch(e=>{
                console.log(e);
            })
        }
    }
    getSports() {
        sport_getAllSport().then(data => {
            this.setState(() => ({
                allSportsArray: data.data.Data
            }));
        })
    }
    deleteSport(e,sport) {
        e.preventDefault()
        sport_deleteSport({
            Id:sport.Id
        })
            .then(data => {
                this.getSports()
                this.closeModalDelete()
                this.clearForm()
            }).catch(e => {
            console.log(e)
        })
    }
    renderSportRow=(sport, index)=>{
        const { classes } = this.props;
        return (
            <tr key={index}>
                <td>{sport.Id}</td>
                <td>{sport.Name}</td>
                <td>
                    <Button variant="contained" color="primary" className={classes.button_edit} onClick={e=>this.prepareEditSport(e,sport)}>
                        ویرایش
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button_danger} onClick={(e)=>this.openModalDelete(e,sport)}>
                        حذف
                    </Button>
                </td>
            </tr>
        )
    }
    renderModalDelete = (classes,sportToDelete)=>{
        return(<>
                <Modal show={sportToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {sportToDelete&&sportToDelete.Name}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteSport(e, sportToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    prepareEditSport=(e,sport)=>{
        e.preventDefault()
        this.openAddMode(e)
        document.querySelector('[name="formName"]').value = sport.Name
        this.setState(() => ({
            selectedSportToEdit: sport
        }));
    }
    openModalDelete =(e,sport)=>{
        this.setState(() => ({
            selectedSportToDelete: sport
        }));
    };
    closeModalDelete = ()=> {
        this.setState(() => ({
            selectedSportToDelete: null
        }));
    };
    clearForm(){
        document.querySelector('[name="formName"]').value = null
        this.setState(() => ({
            selectedPlaceToEdit: null
        }));

    }

}

export default withStyles(style)(SportManagement);
