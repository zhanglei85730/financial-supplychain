import * as service from '../services/destroyReport.js';
import { message } from 'antd';
import consts from '../config/const.js';
import { validateFetch } from '../services/common.js';

export default {
  namespace: 'destroyReport',
  state: {
    formCollapse: false,
    list: [],
    loading: true,
    total: 10,
    selectedRowKeysArr: [],
    selectedRowsArr: [],
    // 导出文件
    exportInputs: {},
    // 总计
    tableDataSum: {},
    getAccounts: [],
    getDepts: [],
    getSites: [],
  },
  reducers: {
    // form收起按钮
    formCollapseReduce(state, { payload }) {
      return { ...state, formCollapse: payload };
    },
    tableLoadingReduce(state, { payload }) {
      return { ...state, loading: payload };
    },
    // 初始化加载数据
    query(state, { payload }) {
      if (!payload || !(payload.hasOwnProperty('rows') && Array.isArray(payload.rows) && payload.rows.length !== 0)) {
        return { ...state, list: [], total: 0, loading: false };
      }
      return { ...state, list: payload.rows, total: payload.total, loading: false };
    },
    // 选择的数据行数
    selectedRowKeys(state, { payload }) {
      return { ...state, selectedRowKeysArr: payload };
    },
    // 选择的数据行
    selectedRows(state, { payload }) {
      return { ...state, selectedRowsArr: payload };
    },
    // 导出form,动态生成input,用于form提交
    exportInputsReduce(state, { payload }) {
      return { ...state, exportInputs: payload };
    },
    // 总计
    tableDataSumReduce(state, { payload }) {
      return { ...state, tableDataSum: payload };
    },
    // 账号
    getAccountsReduce(state, { payload }) {
      return { ...state, getAccounts: payload };
    },
    // 部门
    getDeptsReduce(state, { payload }) {
      return { ...state, getDepts: payload };
    },
    // 大区
    getSitesReduce(state, { payload }) {
      return { ...state, getSites: payload };
    },
  },
  effects: {
    // 查询 无参数默认为添加翻页参数
    * tableData({ payload = { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } }, { call, put }) {
      const response = yield call(service.fetchTableData, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'query',
        payload: requestSuccess.data.data,
      });
    },
    // 账号下拉框
    * getAccounts({ payload }, { call, put }) {
      const response = yield call(service.getAccounts, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAccountsReduce',
        payload: response.data.data,
      });
    },
    // 部门下拉框
    * getDepts({ payload }, { call, put }) {
      const response = yield call(service.getDepts, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getDeptsReduce',
        payload: response.data.data,
      });
    },
    // 部门下拉框
    * getSites({ payload }, { call, put }) {
      const response = yield call(service.getSites, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getSitesReduce',
        payload: response.data.data,
      });
    },
    // 审核生成数据
    * audit({ payload }, { call, put }) {
      const { data } = yield call(service.getSites, payload);
      if (data.hasOwnProperty('success') && data.success) {
        message.success('审核生成数据成功');
        yield put({ type: 'tableData' });
      } else {
        message.error('审核生成数据失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/destroyReport' || pathname === '/') {
          dispatch({ type: 'getAccounts' });
          dispatch({ type: 'getDepts' });
          dispatch({ type: 'getSites' });
          dispatch({ type: 'tableData', payload: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } });
        }
      });
    },
  },
};

