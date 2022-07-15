import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import PlaceManagement from "./place/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import SportManagement from "./sport/SportManagement";
import UserManagement from "./user/UserManagement";
import UserDetailsManagement from "./user/UserDetailsManagement";
import MediaManagement from "./media/MediaManagement";
import MediaCategoryManagement from "./media/category/mediaCategoryManagement";
import EventManagement from "./event/EventManagement";
import ApplicationHomeManagement from "./applicationHome/ApplicationHomeManagement";
import PlaceBaseDataManagement from "./place/baseData/PlaceBaseDataManagement";
import PlaceDetailManagement from "./place/detail/PlaceDetailManagement";
export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <Route path="/places" component={PlaceManagement} />
        <Route path="/locations" component={LocationManagement} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/place/BaseData" component={PlaceBaseDataManagement} />
        <Route path="/place/detail" component={PlaceDetailManagement} />
        <Route path="/sports" component={SportManagement} />
        <Route path="/users" component={UserManagement} />
        <Route path="/usersDetails" component={UserDetailsManagement} />
        <Route path="/media" component={MediaManagement} />
        <Route path="/events" component={EventManagement} />
        <Route path="/homePage" component={ApplicationHomeManagement} />
        <Route path="/media-category" component={MediaCategoryManagement} />
        <Redirect to="/error/error" />
      </Switch>
    </Suspense>
  );
}
