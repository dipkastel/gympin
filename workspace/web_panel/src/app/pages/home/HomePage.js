import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import PlaceManagement from "./place/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import SportManagement from "./sport/SportManagement";
import PlacedetailsManagement from "./place/details/PlaceDetalsManagement";
import UserManagement from "./user/UserManagement";
import MediaManagement from "./media/MediaManagement";
import MediaCategoryManagement from "./media/category/mediaCategoryManagement";
export default function HomePage() {
  return (
          <Suspense fallback={<LayoutSplashScreen />}>
              <Switch>
                  {
                      <Redirect exact from="/" to="/dashboard" />
                  }
                  <Route path="/places" component={PlaceManagement} />
                  <Route path="/locations" component={LocationManagement} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/place/details" component={PlacedetailsManagement} />
                  <Route path="/sports" component={SportManagement} />
                  <Route path="/users" component={UserManagement} />
                  <Route path="/media" component={MediaManagement} />
                  <Route path="/media-category" component={MediaCategoryManagement} />
                  <Redirect to="/error/error" />
              </Switch>
          </Suspense>
  );
}
