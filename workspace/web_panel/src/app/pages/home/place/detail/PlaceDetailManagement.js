import React, { Component } from "react";
import Notice from "../../../../partials/content/Notice";
import { withStyles } from "@mui/styles";
import { location_getPlaceById } from "../../../../api/locations.api";
import { style } from "../../../../partials/content/generalStyle";
import GateEnter from "./GateEnter/GateEnter";
import GateTransActions from "./GateTransActions/GateTransActions";
import Wallet from "./walet/Wallet";

class PlaceDetailManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      place: null,
    };
  }

  render() {
    return (
      <>
        <Notice icon="flaticon-warning kt-font-primary">
          {this.state.place && (
            <p>مدیریت مشخصات باشگاه {this.state.place.Name}</p>
          )}
        </Notice>
        <div className="row">
          <div className="col-md-6">
            {this.state.place && <GateEnter place={this.state.place} />}
          </div>
          <div className="col-md-6">
            {this.state.place && <GateTransActions place={this.state.place} />}
          </div>
          <div className="col-md-6">
            {this.state.place && <Wallet place={this.state.place} />}
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.getPlace();
  }

  getPlace() {
    const queryString = require("query-string");

    const parsed = queryString.parse(this.props.location.search);
    location_getPlaceById({ id: parsed.placeId }).then((result) => {
      console.log(result.data.Data);
      this.setState(() => ({
        place: result.data.Data,
      }));
    });
  }
}

export default withStyles(style)(PlaceDetailManagement);
