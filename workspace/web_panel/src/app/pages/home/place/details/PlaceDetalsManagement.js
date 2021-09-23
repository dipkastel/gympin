import React, {Component} from "react";
import Notice from "../../../../partials/content/Notice";
import {withStyles} from "@material-ui/styles";
import {location_getPlaceById} from "../../../../api/locations.api";
import PlaceSports from "./placeSport/PlaceSport";
import {style} from "../../../../partials/content/generalStyle";
import PlaceOptions from "./placeOptions/PlaceOptions";
import PlaceClients from "./Clients/PlaceClients";


class PlaceDetalsManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            place:[]
        };

    }

    render() {

        return (
            <>

                <Notice icon="flaticon-warning kt-font-primary">
                    <p>
                        مدیریت مشخصات باشگاه {this.state.place.Name}
                    </p>
                </Notice>

                <PlaceSports place={this.state.place}/>
                <PlaceOptions place={this.state.place}/>
                <PlaceClients place={this.state.place}/>
            </>
        )
    }
    componentDidMount() {
        this.getPlace();
    }

    getPlace() {

        const queryString = require('query-string');

        const parsed = queryString.parse(this.props.location.search);
        location_getPlaceById({"Id": parsed.placeId}).then(result => {
            this.setState(() => ({
                place: result.data.Data
            }));
        })
    }

}

export default withStyles(style)(PlaceDetalsManagement);
