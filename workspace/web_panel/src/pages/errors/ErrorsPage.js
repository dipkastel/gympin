import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ErrorPage404 } from "./ErrorPage404";

export default function ErrorsPage() {
  return (
    <Switch>
      <Redirect from="/error" exact={true} to="/error/error" />
      <Route path="/error/error" component={ErrorPage404} />
    </Switch>
  );
}
