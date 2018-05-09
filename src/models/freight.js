import { message } from 'antd';
import * as service from '../services/freight.js';
import * as util from '../utils/util.js';
import { pushEas, validateFetch } from '../services/common.js';
import consts from '../config/const.js';

export default {
  namespace: 'freight',
  state: {
    formCollapse: false,
    list: [],
    loading: true,
    selectedRowKeysArr: [],
    selectedRowsArr: [],
    total: 10,
    pushEasModalVisible: false,
    // 推送金蝶
    pushEasResponse: [{ allTotal: 100, total: 10, type: "CONNECT_SUCCESS", code: null, msg: '当前推送' }],
    // 导出文件
    exportInputs: {},
    cancelBillType: {},
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
    // 推送到金蝶modal
    pushEasModalRedece(state, { payload }) {
      return { ...state, pushEasModalVisible: payload };
    },
    // 推送到金蝶modal
    pushEasResponseRedece(state, { payload }) {
      return { ...state, pushEasResponse: state.pushEasResponse.concat([payload]) };
    },
    //  清除上次websock 相应messages
    pushEasClearResponseRedece(state, { payload }) {
      return { ...state, pushEasResponse: [] };
    },
    // 导出form,动态生成input,用于form提交
    exportInputsReduce(state, { payload }) {
      return { ...state, exportInputs: payload };
    },
    // 导出form,动态生成input,用于form提交
    cancelBillTypeReduce(state, { payload }) {
      return { ...state, cancelBillType: payload };
    },
    // 总计
    tableDataSumReduce(state, { payload }) {
      return { ...state, tableDataSum: payload };
    },
  },
  effects: {
    // 查询
    *tableData({ payload }, { call, put }) {
      const fetchData = yield call(service.fetchTableData, payload);
      // 验证连接请求是否成功,失败中断执行
      const isRequestSuccess = yield call(validateFetch, fetchData);
      if (!isRequestSuccess) return false;
      const { data } = fetchData;
      // 验证通过继续执行
      yield put({
        type: 'query',
        payload: data.data,
      });
    },
    // table数据总计
    * getTableDataSum({ payload }, { call, put }) {
      const fetchData = yield call(service.getTableDataSum, payload);
      // 验证连接请求是否成功,失败中断执行
      const isRequestSuccess = yield call(validateFetch, fetchData);
      if (!isRequestSuccess) return false;
      const { data } = fetchData;
      // 验证通过继续执行
      yield put({
        type: 'tableDataSumReduce',
        payload: data.data,
      });
    },
    // 推送到金蝶
    * pushEas({ payload }, { call, put }) {
      yield call(pushEas, payload);
    },
    // 单据类型下拉框数据
    *getCancelBillType({ payload }, { call, put }) {
      const { data } = yield call(service.getAllCancelBillType, payload);
      yield put({
        type: 'cancelBillTypeReduce',
        payload: data.data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/freight') {
          // type:'tableData' 指异步的action
          dispatch({ type: 'getTableDataSum' });
          // dispatch({ type: 'getCancelBillType' });
          dispatch({ type: 'tableData', payload: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } });
        }
      });
    },
  },
};

