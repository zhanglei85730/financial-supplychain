import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import menuNodes from '../../config/menu.js';

function PageTitle() {  
  const ss = menuNodes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.sidebar}
    />
  ));
  return ss;
};

export default connect()(PageTitle);

