import { message } from 'antd';
import * as service from '../services/fbaTransferSum.js';
import { validateFetch } from '../services/common.js';
import * as util from '../utils/util.js';
import consts from '../config/const.js';

export default {
  namespace: 'fbaTransferSum',
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
      // 计算当前页合计
      const sumPageList = util.sumFields(payload.rows, 'createDate', '本页合计');
      // 列合并
      // const columnsMerge = util.rowColFormatData(sumPageList, 'purchaseOrderId');
      // console.log(JSON.stringify(columnsMerge))
      const allSumRow = Object.assign({}, state.tableDataSum, { createDate: '全部合计' });
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
      yield put({
        type: 'tableDataSumReduce',
        payload: response.data.data,
      });
    },
    // FBA调拨汇总核销接口
    * submitCertification({ payload }, { call, put }) {
      const { data = {} } = yield call(service.submitCertification, payload);
      const { success = false } = data;
      // 验证数据
      if (success) {
        message.success('核销成功');
      } else {
        message.error('核销失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/FBATransfer/sum' || pathname === '/') {
          // type:'tableData' 指异步的action        getTableDataSum  
          // dispatch({ type: 'getTableDataSum' });
          dispatch({ type: 'tableData', payload: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } });
        }
      });
    },
  },
};

