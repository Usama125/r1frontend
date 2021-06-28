/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// core components
import Admin from "layouts/Admin.js";
import Public from "layouts/Public.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "views/Login";
import ForgetPassword from "views/ForgetPassword";
import RootContext from './context';

const hist = createBrowserHistory();

ReactDOM.render(
  <RootContext>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login}>
          <Public>
            <Login />
          </Public>
        </Route>
        <Route path="/forget-password">
          <Public>
            <ForgetPassword />
          </Public>
        </Route>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/packages" />
      </Switch>
    </Router>
    <ToastContainer />
  </RootContext>
    ,
  document.getElementById("root")
);
