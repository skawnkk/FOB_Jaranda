import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin, Login, Main, SignUp } from "./Pages";
import Header from "./Components/common/Header";
import { AUTH_LEVEL, IS_LOGGED_IN, ROUTES } from "./Utils/constants";
import AuthorityControl from "./Utils/auth";

function Routes() {
  const { accessible, inaccessible } = IS_LOGGED_IN;
  const { parent, unknown, admin } = AUTH_LEVEL;
  const { HOME, LOGIN, SIGNUP, ADMIN } = ROUTES;

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={`${HOME}`} component={AuthorityControl(Main, accessible, parent)} />
        <Route exact path={`${LOGIN}`} component={AuthorityControl(Login, inaccessible, unknown)} />
        <Route
          exact
          path={`${SIGNUP}`}
          component={AuthorityControl(SignUp, inaccessible, unknown)}
        />
        <Route exact path={`${ADMIN}`} component={AuthorityControl(Admin, accessible, admin)} />
      </Switch>
    </Router>
  );
}
export default Routes;
