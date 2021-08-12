import React, { lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history, isLoggedIn }) => (
  <BrowserRouter>
    <>
      <Route
        exact
        path="/"
        component={lazy(() => import('./containers/Page/signin'))}
      />
      <RestrictedRoute
        path="/dashboard"
        component={App}
        isLoggedIn={isLoggedIn}
      />
    </>
  </BrowserRouter>
);

function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.idToken !== null,
  };
}
export default connect(mapStateToProps)(PublicRoutes);
