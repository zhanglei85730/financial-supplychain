import * as loginServices from '../services/login.js';

export default {
  namespace: 'login',
  state: { isAuthorized: false, username: '' },
  reducers: {
    //  { payload }接受的参数为 yield put({})中的对象action
    Authorized(state, { payload }) {
      if (payload.isAuthorized) {
        sessionStorage.setItem('authorized', JSON.stringify(payload.isAuthorized));
      }
      return { ...state, ...payload };
    },
    logout(state, { payload }) {
      if (sessionStorage.getItem('authorized') != null) {
        sessionStorage.removeItem('authorized');
      }
      return { ...state, isAuthorized: payload };
    },
  },
  effects: {
    *loginRequest({ payload }, { call, put }) {
      const { data } = yield call(loginServices.loginRequest, payload);
      yield put({
        type: 'Authorized',
        payload: { isAuthorized: data.logined },
      });
    },
  },
  subscriptions: {},
};
