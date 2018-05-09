import * as service from '../services/payee.js';

export default {
  namespace: 'payeemodel',
  state: {
    list: [],
    loading: true,
    selectedRowKeysArr: [],
    selectedRowsArr: [],
    addModalHide: false,
    modifyModalHide: false,
  },
  reducers: {
    // 初始化加载数据
    query(state, { payload }) {
      return { ...state, list: payload, loading: false };
    },
    // 显示、隐藏新增modal
    addModalShow(state, { payload }) {
      return { ...state, addModalHide: payload };
    },
    // 显示、隐藏修改modal
    modifyModalShow(state, { payload }) {
      return { ...state, modifyModalHide: payload };
    },
    // 选择的数据行数
    selectedRowKeys(state, { payload }) {
      return { ...state, selectedRowKeysArr: payload };
    },
    // 选择的数据行
    selectedRows(state, { payload }) {
      return { ...state, selectedRowsArr: payload };
    },
    // 删除
    // remove(state, { payload }) {
    //   return { ...state, selectedRowsArr: payload };
    // },
  },
  effects: {
    // 初始化加载数据
    // playload:{}这里可以传入参数 用于异步请求
    *tableData({ payload }, { call, put }) {
      // 返回的异步数据以{data:[]}这样的形式,下面将结果解构赋值
      // const isLogin = yield select(state => state.table01);
      // console.log('logincheck',isLogin);
      const { data } = yield call(service.fetchTableData);
      yield put({
        type: 'query',
        payload: data.data,
      });
    },
    *tableDataById({ payload: { values } }, { call, put }) {
      // 返回的异步数据以{data:[]}这样的形式,下面将结果解构赋值
      const { data } = yield call(service.fetchTableDataById, values);
      yield put({
        type: 'query',
        payload: { data },
      });
    },
    // 搜索
    *search({ payload }, { call, put }) {
      // 返回的异步数据以{data:[]}这样的形式,下面将结果解构赋值
      const { data } = yield call(service.search, payload);
      yield put({
        type: 'query',
        payload: { data },
      });
    },
    *remove({ payload }, { call, put }) {
      yield call(service.remove, payload);
      yield put({ type: 'tableData' });
      yield put({
        type: 'selectedRowKeys',
        payload: [],
      });
      yield put({
        type: 'selectedRows',
        payload: [],
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname, query }) => {
        if (pathname === '/Payee' || pathname === '/') {
          // type:'tableData' 指异步的action
          dispatch({ type: 'tableData', payload: query });
          const username = window.sessionStorage.getItem('username');
          if (username) {
            dispatch({ type: 'globalHeader/usernameChange', payload: username });
          }
        }
      });
    },
  },
};
