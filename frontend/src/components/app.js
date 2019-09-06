import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./nav/navbar_container";
import MainPageContainer from "./main/main_page_container";
import PropertiesContainer from "./properties/properties_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import SellContainer from "./sell/sell_container";
import "./app.css";
import Spinner from "./spinner/spinner";

const App = () => (
  <div className="app">
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <Route exact path="/properties" component={PropertiesContainer} />
      <Route exact path="/saved" component={Spinner} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/sell" component={SellContainer} />
    </Switch>
  </div>
);

export default App;
