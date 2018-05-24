import * as service from '../services/edStorehouseMaintenance.js';
import * as util from '../utils/util.js';
import { message } from 'antd';
import consts from '../config/const.js';
import { validateFetch } from '../services/common.js';

export default {
  namespace: 'edStorehouseMaintenance',
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
    addModalVisible: false,
    modifyStatus: false,
  },
  reducers: {
    modifyStatusReduce(state, { payload }) {
      return { ...state, modifyStatus: payload };
    },
    // addModal
    addModalReduce(state, { payload }) {
      return { ...state, addModalVisible: payload };
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
  },
  effects: {
    // 查询
    * tableData({ payload }, { call, put }) {
      const response = yield call(service.fetchTableData, payload);
      // 验证数据
      const isRequestSuccess = yield call(validateFetch, response);
      if (!isRequestSuccess) return false;
      yield put({
        type: 'query',
        payload: isRequestSuccess.data.data,
      });
    },
    // table数据总计
    * getTableDataSum({ payload }, { call, put }) {
      const response = yield call(service.getTableDataSum, payload);
      // 验证数据
      const isRequestSuccess = yield call(validateFetch, response);
      if (!isRequestSuccess) return false;
      yield put({
        type: 'tableDataSumReduce',
        payload: response.data.data,
      });
    },
    // 新增
    * add({ payload }, { call, put, select }) {
      const { data = {} } = yield call(service.add, payload);
      // 验证数据      
      const { success = false } = data;
      if (success) {
        message.success('新增成功');
        yield put({
          type: 'addModalReduce',
          payload: false,
        });
        // 刷新表格数据，从全局获取查询条件及翻页参数
        const { commonQueryCondition, commonPaginnation } = yield select(state => state.common);
        yield put({
          type: 'tableData',
          payload: Object.assign(commonPaginnation, commonQueryCondition),
        });
      } else {
        message.error('新增失败');
      }
    },
    // 修改
    * modify({ payload }, { call, put, select }) {
      const { data = {} } = yield call(service.modify, payload);
      // 验证数据      
      const { success = false } = data;
      if (success) {
        message.success('修改成功');
        // 刷新表格数据，从全局获取查询条件及翻页参数
        const { commonQueryCondition, commonPaginnation } = yield select(state => state.common);
        yield put({
          type: 'tableData',
          payload: Object.assign(commonPaginnation, commonQueryCondition),
        });
        // 取消编辑状态
        yield put({
          type: 'modifyStatusReduce',
          payload: false,
        });
      } else {
        message.error('修改失败');
      }
    },
    // table数据总计
    * deleteData({ payload }, { call, put }) {
      const { data = {} } = yield call(service.deleteData, payload);
      const { success = false } = data;
      // 刷新表格数据，从全局获取查询条件及翻页参数
      if (success) {
        message.success('修改成功');
        // 刷新表格数据，从全局获取查询条件及翻页参数
        const { commonQueryCondition, commonPaginnation } = yield select(state => state.common);
        yield put({
          type: 'tableData',
          payload: Object.assign(commonPaginnation, commonQueryCondition),
        });
      } else {
        message.error('修改失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        if (pathname === '/baseData/edStorehouseMaintenance') {
          // type:'tableData' 指异步的action        getTableDataSum  
          // dispatch({ type: 'getTableDataSum' });
          dispatch({ type: 'tableData', payload: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } });
        }
      });
    },
  },
};
