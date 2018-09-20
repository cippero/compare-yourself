import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './components/AppliedRoute';
import Home from "./components/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" component={Login} props={childProps}/>
        <AppliedRoute path="/signup" component={Signup} props={childProps}/>
        <Route component={NotFound} />
    </Switch>;