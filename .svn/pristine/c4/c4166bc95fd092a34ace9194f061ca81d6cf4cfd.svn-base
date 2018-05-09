import * as service from '../services/transferReceiptInternal.js';
import { validateFetch } from '../services/common.js';
import * as util from '../utils/util.js';
import consts from '../config/const.js';

export default {
  namespace: 'transferReceiptInternal',
  state: {
    formCollapse: false,
    list: [],
    loading: true,
    selectedRowKeysArr: [],
    selectedRowsArr: [],
    total: 10,
    pushEasModalVisible: false,
    // 导出文件
    exportInputs: {},
    // 总计
    tableDataSum: {},
    // 查询参数
    queryParams: {},
    // 调入部门
    departNameIn: [],
    // 调入仓库
    warehouseNameIn: [],
    // 调出仓库
    warehouseNameOut: [],

  },
  reducers: {
    // 调入部门
    departNameInReduce(state, { payload }) {
      return { ...state, departNameIn: payload };
    },
    // 调入仓库
    warehouseNameInReduce(state, { payload }) {
      return { ...state, warehouseNameIn: payload };
    },
    // 调入仓库
    warehouseNameOutReduce(state, { payload }) {
      return { ...state, warehouseNameOut: payload };
    },
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
      // 计算当前页合计
      const sumPageList = util.sumFields(payload.rows, 'billDate', '本页合计');
      const allSumRow = Object.assign({}, state.tableDataSum, { billDate: '全部合计' });
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
    // 查询参数
    queryParamsReduce(state, { payload }) {
      return { ...state, queryParams: payload };
    },
  },
  effects: {
    // 查询
    *tableData({ payload }, { call, put }) {
      const response = yield call(service.fetchTableData, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'query',
        payload: requestSuccess.data.data,
      });
    },
    // table数据总计
    * getTableDataSum({ payload }, { call, put }) {
      const response = yield call(service.getTableDataSum, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'tableDataSumReduce',
        payload: response.data.data,
      });
    },
    // 调入部门
    * getDepartNameIn({ payload }, { call, put }) {
      const response = yield call(service.getDepartNameIn, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'departNameInReduce',
        payload: response.data.data,
      });
    },
    // 调入仓库
    * getWarehouseNameIn({ payload }, { call, put }) {
      const response = yield call(service.getWarehouseNameIn, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'warehouseNameInReduce',
        payload: response.data.data,
      });
    },
    // 调出仓库
    * getWarehouseNameOut({ payload }, { call, put }) {
      const response = yield call(service.getWarehouseNameOut, payload);
      // 验证数据
      const requestSuccess = yield call(validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'warehouseNameOutReduce',
        payload: response.data.data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/transferReceipt/transferReceiptInternal') {
          dispatch({ type: 'getTableDataSum' });
          dispatch({ type: 'getDepartNameIn' });
          dispatch({ type: 'getWarehouseNameIn' });
          dispatch({ type: 'getWarehouseNameOut' });
          dispatch({ type: 'tableData', payload: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } });
          const username = window.sessionStorage.getItem('username');
          if (username) {
            dispatch({ type: 'globalHeader/usernameChange', payload: username });
          }
        }
      });
    },
  },
};

