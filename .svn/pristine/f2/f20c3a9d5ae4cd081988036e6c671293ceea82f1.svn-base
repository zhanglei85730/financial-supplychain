import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch, withRouter } from 'dva/router';
import MainLayout from './MainLayout.js';
import Login from '../../routes/Login/Login';
import menuNodes from '../../config/router.js';
import * as util from '../../utils/util.js';
import consts from '../../config/const.js';

const LoginWrapped = () => {
  return (
    <div>
      {window.location.href = 'http://www.aukeyit.com/login'}
      {/* <Switch>
        <Route path="/login" component={Login} />
      </Switch>
      {window.location.pathname !== '/' ? <Redirect to="/http://www.aukeyit.com/login" /> : ''} */}
    </div>
  );
};

function MainLayoutWrapped({ location }) {

  const SecurityHeader = util.getSecurityHeaderFromUrl();
  // const SecurityHeaderFormSession = getSecurityHeaderFormLocal()
  const SecurityHeaderFormSession = window.sessionStorage.getItem('authorized');
  const isAuthorized = SecurityHeader || SecurityHeaderFormSession;
  // 跳转链接时去掉url登录信息
  if (util.getSearchParams('JSESSIONID') || util.getSearchParams('username')) {
    window.location.href = "/";
  }
  // window.location.origin = `${consts.thisDomain}`;
  //const authorized = sessionStorage.getItem('authorized');  
  const MainLayoutAgen = (
    <MainLayout>
      <Switch>
        {menuNodes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        {/* <Redirect from="/index" to="/" /> */}
      </Switch>
      {/* 首页配置 登录后跳转到这里 */}
      {location.pathname === '/' ? <Redirect to="/purchaseOrders" /> : ''}
    </MainLayout>
  );
  return (
    isAuthorized ? MainLayoutAgen : <LoginWrapped />
  );
}

const mapStateToProps = ({ login }) => {
  return login;
};

export default withRouter(connect(mapStateToProps)(MainLayoutWrapped));

