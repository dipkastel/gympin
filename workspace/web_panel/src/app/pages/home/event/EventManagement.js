import React, { Component } from "react";
import Notice from "../../../partials/content/Notice";
import AddIcon from "@mui/icons-material/Add";
import { Table } from "react-bootstrap";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../../partials/content/Portlet";

class EventManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEventsArray: [],
    };
  }
  render() {
    return (
      <>
        <Notice icon="flaticon-warning kt-font-primary">
          <p>رویداد به معنای قرار ورزشی میباشد</p>
          <p>
            این ایونت ها وابسته به نوعی ورزش میباشند که اطلاعات دریافتی از کاربر
            بر اساس آن ورزش ممکن است متفاوت باشد
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
                >
                  <AddIcon />
                </button>
              </PortletHeaderToolbar>
            }
          />

          <PortletBody>
            <div className="kt-separator kt-separator--dashed" />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>sport Name</th>
                  <th>image</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allEventsArray.map(this.renderEventRow)}
              </tbody>
            </Table>
          </PortletBody>
        </Portlet>
      </>
    );
  }
  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents() {}
  renderEventRow() {}
}

export default EventManagement;
