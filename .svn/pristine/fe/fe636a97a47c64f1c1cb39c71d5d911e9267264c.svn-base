import React from 'react';
import { Router } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MainLayoutWrapped from './components/Layouts/MainLayoutWrapped.js';

const RouterProtect = ({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <MainLayoutWrapped />
    </Router>
  </LocaleProvider>
);

export default RouterProtect;
