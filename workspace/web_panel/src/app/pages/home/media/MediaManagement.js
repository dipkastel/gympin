import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@material-ui/icons/Add";
import {Modal} from "react-bootstrap";
import {
    Portlet,
    PortletBody,
    PortletHeader,
    PortletHeaderToolbar
} from "../../../partials/content/Portlet";
import {
    Button, Tab, Tabs
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {user_getAll} from "../../../api/user.api";
import 'leaflet/dist/leaflet.css';
import {style} from "../../../partials/content/generalStyle";


class MediaManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagesToUpload:[],
            addMode: false,
            tab:0
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <>

                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        مدیریت رسانه ها
                    </p>
                </Notice>

                {this.state.addMode &&
                <Portlet>
                    <PortletHeader
                        toolbar={
                            <PortletHeaderToolbar>
                                <Tabs
                                    component="div"
                                    className="builder-tabs"
                                    value={this.state.tab}
                                    onChange={(_, nextTab) => {
                                        this.setState(() => ({
                                                tab : nextTab
                                            }
                                        ));
                                    }}
                                >
                                    <Tab label="image"/>
                                    <Tab label="video"/>
                                    <Tab label="sound"/>
                                </Tabs>
                            </PortletHeaderToolbar>
                        }
                    />

                    {this.state.tab === 0 && (
                        <PortletBody>
                            <div className="kt-section kt-margin-t-30">
                                <div className="kt-section__body">
                                    <div id="images_to_upload">
                                        {this.state.imagesToUpload.map(e=>this.RenderImageForUpload(e))}
                                    </div>
                                    <input type="file" id="file_input" onChange={(event)=> this.inputChange(event)}  accept="image/*" multiple/>
                                    <Button type={"submit"} variant="contained" color="primary" className={classes.button}>
                                        ثبت
                                    </Button>
                                </div>
                            </div>
                        </PortletBody>
                    )}

                    {this.state.tab === 1 && (
                        <PortletBody>
                            <div className="kt-section kt-margin-t-30">
                                <div className="kt-section__body">
                                    2
                                </div>
                            </div>
                        </PortletBody>
                    )}

                    {this.state.tab === 2 && (
                        <PortletBody>
                            <div className="kt-section kt-margin-t-30">
                                <div className="kt-section__body">
                                    3
                                </div>
                            </div>
                        </PortletBody>
                    )}
                </Portlet>}


                <Portlet>
                    <PortletHeader
                        title="رسانه ها"
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


                        ax ha
                    </PortletBody>
                </Portlet>
            </>
        )
    }

    handleSubmit() {

    }

    componentDidMount() {
        // this.getMedias();
    }

    toggleAddMode(e) {
        e.preventDefault()
        this.setState(() => ({
            addMode: !this.state.addMode,
            selectedUserToEdit: null,
            adminMode: false
        }));
    }

    openModalDelete = (e, user) => {
        this.setState(() => ({
            selectedUserToDelete: user
        }));
    };

    getMedias() {

        user_getAll().then(data => {
            console.log(data.data.Data);
            this.setState(() => ({
                allUsersArray: data.data.Data
            }));

        }).catch(e => {
            console.log(e);
        })
    }

    closeModalDelete = () => {
        this.setState(() => ({
            selectedUserToDelete: null
        }));
    };

    renderModalDelete = (classes, UserToDelete) => {
        console.log(this.state.selectedAccess)
        return (<>
                <Modal show={UserToDelete} onHide={this.closeModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>حذف {UserToDelete && UserToDelete.username}</Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.button_edit} onClick={this.closeModalDelete}>
                            خیر
                        </Button>
                        <Button className={classes.button_danger} onClick={(e) => this.deleteUser(e, UserToDelete)}>
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    inputChange(e) {
        this.setState(() => ({
            imagesToUpload:Object.values(e.target.files)
        }));
    }


    RenderImageForUpload(e) {

        return(
            <>
                <div className="MuiGrid-root MuiGrid-item">
                    <div className="MuiPaper-root makeStyles-paper-344 MuiPaper-elevation1 MuiPaper-rounded">
                        <img src={URL.createObjectURL(e)} width="100"/>
                        <label for={"title"}>title</label>
                        <input id={"title"} type={"text"}/>
                        <label for={"description"}>description</label>
                        <input id={"description"} type={"text"}/>
                    </div>
                </div>
            </>
        )
    }
}

export default withStyles(style)(MediaManagement);
