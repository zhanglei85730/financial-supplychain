import { message } from 'antd';
import * as service from '../services/purchaseRefunds.js';
import * as util from '../utils/util.js';
import { pushEas } from '../services/common.js';
import consts from '../config/const.js';

export default {
  namespace: 'purchaseRefunds',
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
    // 全部合计
    tableDataSum: {},
  },
  reducers: {
    // form收起按钮
    formCollapseReduce(state, { payload }) {
      return { ...state, formCollapse: payload };
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
    tableLoadingReduce(state, { payload }) {
      return { ...state, loading: payload };
    },
    // 选择的数据行数
    selectedRowKeys(state, { payload }) {
      return { ...state, selectedRowKeysArr: payload };
    },
    // 选择的数据行
    selectedRows(state, { payload }) {
      return { ...state, selectedRowsArr: payload };
    },
    //  清除上次websock 相应messages
    pushEasClearResponseRedece(state, { payload }) {
      return { ...state, pushEasResponse: [] };
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
    *tableData({ payload }, { call, put }) {
      const { data } = yield call(service.fetchTableData, payload);
      yield put({
        type: 'query',
        payload: data.data,
      });
    },
    // table数据总计
    * getTableDataSum({ payload }, { call, put }) {
      const { data } = yield call(service.getTableDataSum, payload);
      yield put({
        type: 'tableDataSumReduce',
        payload: data.data,
      });
    },
    // 导出
    *exportFile({ payload }, { call }) {
      const { data } = yield call(service.exportFile, payload);
      if (util.hasProperty(data, 'succeed') && data.succeed) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/purchaseRefunds') {
          // type:'tableData' 指异步的action
          dispatch({ type: 'getTableDataSum' });
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

