import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './components/AppliedRoute';
import Home from "./components/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Compare from "./containers/Compare";
import CompareAll from "./containers/CompareAll";
import CompareSingle from "./containers/CompareSingle";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" component={Login} props={childProps}/>
        <AppliedRoute path="/signup" component={Signup} props={childProps}/>
        <AppliedRoute path="/compare" exact component={Compare} props={childProps}/>
        <AppliedRoute path="/compare/all" exact component={CompareAll} props={childProps}/>
        <AppliedRoute path="/compare/single" exact component={CompareSingle} props={childProps}/>
        <Route component={NotFound} />
    </Switch>;