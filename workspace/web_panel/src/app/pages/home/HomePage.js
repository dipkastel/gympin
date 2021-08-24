import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import PlaceManagement from "./place/management/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
export default function HomePage() {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/places" component={PlaceManagement} />
        <Route path="/locations" component={LocationManagement} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
