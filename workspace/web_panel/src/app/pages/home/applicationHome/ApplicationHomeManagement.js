import React, {Component} from "react";
import Notice from "../../../partials/content/Notice";
import "../applicationHome/ApplicationHomeManagement.css";
import HomeCollections from "./HomeCollections/HomeCollections";
import HomeChild from "./HomeChild/HomeChild";
import {widgetList} from "./widgetList";
import {widgetDestination} from "./widgetDestination";
import HomeItem from "./HomeItem/HomeItem";

class ApplicationHomeManagement extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedHomeCollection:null,
            selectedHomeChild:null,
            selectedHomeItem:null,
        };
    }
  render() {
    return (
      <>
        <Notice icon="flaticon-warning kt-font-primary">
          <p>صفحه جیم پین در اپلیکیشن موبایل از طریق این قسمت چیدمان می شود</p>
          <p>
            میتوان از ویجت های قراردادی برای ساخت صفحه اصلی اپلیکیشن موبایل
            استفاده کرد که در این قسمت آنها را مدیریت میکنیم
          </p>
          <p>
              ویجت های قابل استفاده :
              <br/>
              {widgetList.map(item=>(item+" , "))}
              <br/>
              <br/>
              که میتوانند مقاصد زیر را داشته باشند:
              <br/>
              {widgetDestination.map(item=>(item+" , "))}
           </p>
        </Notice>

        <div className="row">
          <div className="col-xl-4">
              <HomeCollections SetSelectedItem={(item)=>this.setState({selectedHomeCollection:item,selectedHomeItem:null})} />
          </div>
            {this.state.selectedHomeCollection &&
              <div className="col-xl-4">
                  <HomeChild CollectionItem={this.state.selectedHomeCollection} SetSelectedItem={(item)=>this.setState({selectedHomeItem:item})}/>
              </div>
          }
            {this.state.selectedHomeItem &&
            <div className="col-xl-4">
                <HomeItem selectedHomeItem={this.state.selectedHomeItem} selectedHomeChild={(item)=>this.setState({selectedHomeChild:item})}/>
            </div>
            }
        </div>

      </>
    );
  }
}

export default ApplicationHomeManagement;
