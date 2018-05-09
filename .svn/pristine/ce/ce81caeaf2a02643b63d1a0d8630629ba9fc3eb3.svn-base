import { message } from 'antd';
import { browserHistory } from 'dva/router';
import request from '../utils/request';

const AUTH_API = '/api/auth';

export function getCurrentUser() {
  let sessionStorage = window.sessionStorage;
  if (sessionStorage['userInfo']) {
    return JSON.parse(sessionStorage['userInfo']);
  }
  return {};
}

export async function fetchIsAuth(callback) {
  return request(`${AUTH_API}?authToken=${getCurrentUser()['authToken']}`)
    .then(data => callback(data.data.isAuth))
    .catch(e => console.log(e));
}

export function redirect() {
  message.error('请登录！');
  browserHistory.push('/');
  return null;
}
