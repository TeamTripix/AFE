import React, { Component, lazy, Suspense } from 'react';
import Route from '../../components/utility/customRoute';
import customRoutes from '../../customApp/router';
import Loader from '../../components/utility/Loader/';
const routes = [
  {
    path: 'enquiry-management',
    component: lazy(() => import('../Tables/MaterialUiTables')),
  },
  {
    path: '',
    component: lazy(() => import('../Page/Welcome')),
  },
  ...customRoutes,
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <Suspense fallback={<Loader />}>
        <div style={style}>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                {...otherProps}
              />
            );
          })}
        </div>
      </Suspense>
    );
  }
}

export default AppRouter;
