
import * as service from '../services/salesOutboundCount.js';
import * as util from '../utils/util.js';
import consts from '../config/const.js';
import { validateFetch } from '../services/common.js';

export default {
  namespace: 'salesOutboundCount',
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
    // 单据状态
    billStatus: {},
    // 站点
    site: {},
    // 单据状态
    customer: {},
    getOrg: {},
    getCostCenter: {},
  },
  reducers: {
    // form收起按钮
    formCollapseReduce(state, { payload }) {
      return { ...state, formCollapse: payload };
    },
    tableLoadingReduce(state, { payload }) {
      return { ...state, loading: payload };
    },
    billStatusReduce(state, { payload }) {
      return { ...state, billStatus: payload };
    },
    siteReduce(state, { payload }) {
      return { ...state, site: payload };
    },
    customerReduce(state, { payload }) {
      return { ...state, customer: payload };
    },
    getOrgReduce(state, { payload }) {
      return { ...state, getOrg: payload };
    },
    getCostCenterReduce(state, { payload }) {
      return { ...state, getCostCenter: payload };
    },
    // 初始化加载数据
    query(state, { payload }) {
      if (!payload || !(payload.hasOwnProperty('rows') && Array.isArray(payload.rows) && payload.rows.length !== 0)) {
        return { ...state, list: [], total: 0, loading: false };
      }
      const sumPageList = util.sumFields(payload.rows, 'billTime', '本页合计');
      const allSumRow = Object.assign({}, state.tableDataSum, { billTime: '全部合计' });
      return { ...state, list: [...sumPageList, allSumRow], total: payload.total, loading: false };
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
  },
  effects: {
    // 查询
    * tableData({ payload }, { call, put }) {
      const { data = consts.defaultTableData } = yield call(service.fetchTableData, payload);
      // 验证数据
      // const requestSuccess = yield call(validateFetch, response);
      // if (!requestSuccess) return false;
      yield put({
        type: 'query',
        payload: data.data,
      });
    },
    // table数据总计
    * getTableDataSum({ payload }, { call, put }) {
      const response = yield call(service.getTableDataSum, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'tableDataSumReduce',
        payload: response.data.data,
      });
    },
    // 查询单据状态
    * getBillStatus({ payload }, { call, put }) {
      const response = yield call(service.getBillStatus, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'billStatusReduce',
        payload: response.data.data,
      });
    },
    // 查询站点
    * getSite({ payload }, { call, put }) {
      const response = yield call(service.getSite, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'siteReduce',
        payload: response.data.data,
      });
    },
    // 查询客服
    * getCustomer({ payload }, { call, put }) {
      const response = yield call(service.getCustomer, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'customerReduce',
        payload: response.data.data,
      });
    },
    // 查询客服
    * getOrg({ payload }, { call, put }) {
      const response = yield call(service.getOrg, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getOrgReduce',
        payload: response.data.data,
      });
    }, // 查询客服
    * getCostCenter({ payload }, { call, put }) {
      const response = yield call(service.getCostCenter, payload);
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getCostCenterReduce',
        payload: response.data.data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/salesOutboundCount' || pathname === '/') {
          // type:'tableData' 指异步的action 
          dispatch({ type: 'getBillStatus' });
          dispatch({ type: 'getSite' });
          dispatch({ type: 'getCustomer' });
          dispatch({ type: 'getOrg' });
          dispatch({ type: 'getCostCenter' });
          dispatch({ type: 'getTableDataSum', payload: { billTime: '2018-01' } });
          dispatch({
            type: 'tableData',
            payload: {
              offset: 0,
              limit: consts.defaultPageSize - consts.extraPageSize,
              // billTime: '2018-01',
            },
          });
          const username = window.sessionStorage.getItem('username');
          if (username) {
            dispatch({ type: 'globalHeader/usernameChange', payload: username });
          }
        }
      });
    },
  },
};
