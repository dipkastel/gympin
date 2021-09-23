import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import PlaceManagement from "./place/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import SportManagement from "./sport/SportManagement";
import PlacedetailsManagement from "./place/details/PlaceDetalsManagement";
import UserManagement from "./user/UserManagement";
export default function HomePage() {
  return (
          <Suspense fallback={<LayoutSplashScreen />}>
              <Switch>
                  {
                      <Redirect exact from="/" to="/dashboard" />
                  }
                  <Route path="/builder" component={Builder} />
                  <Route path="/places" component={PlaceManagement} />
                  <Route path="/locations" component={LocationManagement} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/place/details" component={PlacedetailsManagement} />
                  <Route path="/sports" component={SportManagement} />
                  <Route path="/users" component={UserManagement} />
                  <Redirect to="/error/error-v1" />
              </Switch>
          </Suspense>
  );
}
