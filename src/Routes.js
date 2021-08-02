import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin, Login, Main, SignUp } from "Pages";
import Header from "Components/common/Header";

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default Routes;
