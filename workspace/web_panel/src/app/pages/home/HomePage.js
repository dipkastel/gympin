import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import PlaceManagement from "./place/management/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import openStreetMap from "../../../_metronic/layout/map/openStreet/openStreetMap";
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
                  <Route path="/o" component={openStreetMap} />
                  <Redirect to="/error/error-v1" />
              </Switch>
          </Suspense>
  );
}
