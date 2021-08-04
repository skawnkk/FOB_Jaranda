import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "Components/common/Header/Header";
import AuthorityControl from "Utils/auth";
import { AUTH_LEVEL, IS_LOGGED_IN, ROUTES } from "Utils/constants";
import { Admin, Login, Main, SignUp } from "Pages";

function Routes() {
  const { accessible, inaccessible } = IS_LOGGED_IN;
  const { parent, unknown, admin } = AUTH_LEVEL;
  const { HOME, LOGIN, SIGNUP, ADMIN } = ROUTES;

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={`${HOME}`} component={AuthorityControl(Main, accessible, unknown)} />
        <Route exact path={`${LOGIN}`} component={AuthorityControl(Login, inaccessible, unknown)} />
        <Route
          exact
          path={`${SIGNUP}`}
          component={AuthorityControl(SignUp, inaccessible, unknown)}
        />
        <Route exact path={`${ADMIN}`} component={AuthorityControl(Admin, accessible, admin)} />
        {/* <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/logout" render={() => <Redirect to="/" />} /> */}
      </Switch>
    </Router>
  );
}
export default Routes;
